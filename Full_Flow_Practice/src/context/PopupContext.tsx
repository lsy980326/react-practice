// PopupContext.tsx

import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useCallback,
} from "react";

/**
 * 팝업의 상태를 정의하는 인터페이스
 */
interface PopupState {
  id: number; // 고유 식별자 (Timestamp 기반)
  content: ReactNode; // 팝업에 표시될 콘텐츠
  onClose?: () => void; // 팝업이 닫힐 때 실행될 콜백 함수 (옵션)
  closeHandled?: boolean; // onClose 콜백이 이미 실행되었는지 여부
  /**
   * 팝업의 열림/닫힘 상태
   * - true: enter 애니메이션 (팝업 열림)
   * - false: exit 애니메이션 (팝업 닫힘)
   */
  isOpen: boolean;
}

/**
 * 팝업 컨텍스트가 제공하는 속성과 함수들을 정의하는 인터페이스
 */
interface PopupContextProps {
  /** 팝업 스택에 하나라도 팝업이 존재하면 true */
  isPopupOpen: boolean;

  /** 새 팝업을 열기 위한 함수
   * @param content - 팝업에 표시될 React 노드
   * @param onClose - 팝업이 닫힐 때 실행될 콜백 함수 (옵션)
   */
  openPopup: (content: ReactNode, onClose?: () => void) => void;

  /** 가장 최근 팝업을 닫는 함수
   * @param executeCallback - true일 경우 onClose 콜백을 실행
   */
  closePopup: (executeCallback?: boolean) => void;

  /** exit 애니메이션이 완료된 후 실제로 팝업 스택에서 제거하는 함수
   * @param id - 제거할 팝업의 고유 식별자
   */
  removePopup: (id: number) => void;

  /** 현재 팝업 스택 (스택의 마지막 요소가 가장 상단에 위치) */
  popupStack: PopupState[];
}

// 팝업 컨텍스트 생성
const PopupContext = createContext<PopupContextProps | undefined>(undefined);

/**
 * 팝업 컨텍스트를 제공하는 프로바이더 컴포넌트
 * @param children - 컨텍스트를 사용할 자식 컴포넌트들
 */
export const PopupProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // 팝업 스택 상태 관리
  const [popupStack, setPopupStack] = useState<PopupState[]>([]);

  /**
   * 새 팝업을 열기 위한 함수
   * @param content - 팝업에 표시될 React 노드
   * @param onClose - 팝업이 닫힐 때 실행될 콜백 함수 (옵션)
   * 
   * - 팝업을 열 때는 isOpen을 true로 설정하여 enter 애니메이션을 트리거
   * - 고유한 id를 생성하기 위해 현재 시간을 기반으로 설정
   */
  const openPopup = useCallback((content: ReactNode, onClose?: () => void) => {
    setPopupStack((prev) => [
      ...prev,
      {
        id: Date.now(), // 현재 시간을 기반으로 고유 id 생성
        content,        // 팝업에 표시될 콘텐츠
        onClose,        // 팝업이 닫힐 때 실행될 콜백 함수
        closeHandled: false, // onClose가 아직 실행되지 않았음을 표시
        isOpen: true,   // 팝업 열림 상태
      },
    ]);
  }, []);

  /**
   * 가장 최근의 팝업을 닫기 위한 함수
   * @param executeCallback - true일 경우 onClose 콜백을 실행
   * 
   * - isOpen을 false로 설정하여 exit 애니메이션을 트리거
   * - executeCallback이 true이고 onClose 콜백이 존재하며 아직 실행되지 않은 경우,
   *   onClose 콜백을 실행하고 closeHandled를 true로 설정하여 중복 실행 방지
   */
  const closePopup = useCallback((executeCallback = false) => {
    setPopupStack((prev) => {
      if (prev.length === 0) return prev; // 스택이 비어있으면 아무 작업도 하지 않음

      // 팝업 스택의 마지막 요소(가장 상단 팝업)만 닫기
      const updatedStack = [...prev];
      const lastIndex = updatedStack.length - 1;
      const lastPopup = updatedStack[lastIndex];

      // executeCallback이 true이고 onClose 콜백이 존재하며 아직 실행되지 않은 경우
      if (executeCallback && lastPopup.onClose && !lastPopup.closeHandled) {
        lastPopup.onClose();        // onClose 콜백 실행
        lastPopup.closeHandled = true; // 콜백이 실행되었음을 표시
      }

      // 팝업의 isOpen을 false로 설정하여 exit 애니메이션 트리거
      lastPopup.isOpen = false;
      updatedStack[lastIndex] = { ...lastPopup }; // 상태 업데이트

      return updatedStack; // 업데이트된 스택 반환
    });
  }, []);

  /**
   * exit 애니메이션이 완료된 후 팝업을 실제로 스택에서 제거하는 함수
   * @param id - 제거할 팝업의 고유 식별자
   * 
   * - 팝업 컴포넌트에서 onExited 이벤트 핸들러를 통해 호출됨
   * - 해당 id를 가진 팝업을 스택에서 필터링하여 제거
   */
  const removePopup = useCallback((id: number) => {
    setPopupStack((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <PopupContext.Provider
      value={{
        isPopupOpen: popupStack.length > 0, // 팝업 스택에 팝업이 하나라도 있으면 true
        openPopup,    // 팝업 열기 함수 제공
        closePopup,   // 팝업 닫기 함수 제공
        removePopup,  // 팝업 제거 함수 제공
        popupStack,   // 현재 팝업 스택 제공
      }}
    >
      {children} {/* 자식 컴포넌트들에게 컨텍스트 제공 */}
    </PopupContext.Provider>
  );
};

/**
 * 팝업 컨텍스트를 사용하는 커스텀 훅
 * @returns PopupContextProps
 * 
 * - PopupContext가 존재하지 않을 경우 오류를 던짐
 */
export const usePopup = (): PopupContextProps => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("Popup 호출 오류: 관리자에게 문의하세요"); // 컨텍스트가 없을 경우 오류 발생
  }
  return context; // 팝업 컨텍스트 반환
};
