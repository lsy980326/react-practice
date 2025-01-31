// Popup.tsx

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // framer-motion에서 애니메이션 관련 컴포넌트 임포트
import styles from "./Popup.module.css"; // CSS 모듈을 사용하여 스타일링
import { usePopup } from "../../context/PopupContext"; // 커스텀 훅을 통해 팝업 상태 관리

// 팝업 애니메이션의 지속 시간 설정 (초 단위)
const duration = 0.3; // seconds

// 오버레이(배경) 애니메이션의 변형 정의
const overlayVariants = {
  hidden: { opacity: 0 }, // 초기 상태: 투명
  visible: { opacity: 1 }, // 애니메이션 상태: 불투명
  exit: { opacity: 0 },    // 퇴장 시: 다시 투명
};

// 팝업 자체의 애니메이션 변형 정의
const popupVariants = {
  hidden: { opacity: 0, scale: 0.9 }, // 초기 상태: 약간 작고 투명
  visible: { opacity: 1, scale: 1 },  // 애니메이션 상태: 원래 크기와 불투명
  exit: { opacity: 0, scale: 0.9 },    // 퇴장 시: 다시 작고 투명
};

const Popup: React.FC = () => {
  // usePopup 훅을 통해 팝업 스택과 관련 함수들을 가져옴
  const { popupStack, closePopup, removePopup } = usePopup();

  // 팝업 스택이 비어있으면 아무것도 렌더링하지 않음
  if (popupStack.length === 0) return null;

  // 오버레이(팝업 바깥 영역)를 클릭했을 때 팝업을 닫는 함수
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 클릭한 대상이 오버레이 자체인 경우에만 팝업을 닫음
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  return (
    <>
      {/* AnimatePresence는 조건부 렌더링되는 컴포넌트의 진입 및 퇴장 애니메이션을 관리 */}
      {popupStack.map((popup, index) => (
        // AnimatePresence는 key를 기반으로 애니메이션을 제어하므로 key는 popup.id로 설정
        <AnimatePresence key={popup.id}>
          {/* 팝업이 열려 있는지 확인하고, 열려 있으면 motion.div를 렌더링 */}
          {popup.isOpen && (
            // 오버레이(배경) div에 애니메이션 적용
            <motion.div
              className={styles.overlay} // CSS 모듈을 통한 스타일 적용
              style={{ zIndex: 1000 + index }} // 여러 팝업이 겹칠 경우, z-index를 통해 순서 조정
              variants={overlayVariants} // 애니메이션 변형 정의 적용
              initial="hidden" // 초기 상태 설정
              animate="visible" // 애니메이션 상태 설정
              exit="exit" // 퇴장 애니메이션 상태 설정
              transition={{ duration }} // 애니메이션 지속 시간 설정
              onClick={handleOverlayClick} // 오버레이 클릭 시 팝업 닫기 함수 호출
            >
              {/* 실제 팝업 컨텐츠 div에 애니메이션 적용 */}
              <motion.div
                className={styles.popup} // CSS 모듈을 통한 스타일 적용
                variants={popupVariants} // 애니메이션 변형 정의 적용
                initial="hidden" // 초기 상태 설정
                animate="visible" // 애니메이션 상태 설정
                exit="exit" // 퇴장 애니메이션 상태 설정
                transition={{ duration }} // 애니메이션 지속 시간 설정
              >
                {/* 팝업을 닫는 버튼 */}
                <button
                  className={styles.closeButton} // CSS 모듈을 통한 스타일 적용
                  onClick={() => closePopup(true)} // 버튼 클릭 시 팝업 닫기 함수 호출 (true는 onClose 콜백 실행을 의미)
                >
                  X {/* 닫기 버튼의 텍스트 */}
                </button>
                {/* 팝업의 실제 컨텐츠 */}
                {popup.content}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      ))}
    </>
  );
};

export default Popup;
