import { create } from 'zustand';

// Zustand를 사용하여 상태 관리를 위한 스토어를 생성합니다
const useDiaryStore = create((set) => ({
    // 초기 상태 정의
    data: [], // 일기 데이터 배열
    isLoading: true, // 로딩 상태
    idRef: 0, // 일기 ID 참조 값

    // 일기 데이터를 초기화하는 함수
    init: (parsedData) => set((state) => {
      let maxId = 0;
      // parsedData 배열을 순회하며 최대 ID 값을 찾습니다
      parsedData.forEach((item) => {
        if (item.id > maxId) {
          maxId = item.id;
        }
      });
      // 상태를 업데이트하여 데이터와 ID 참조 값을 설정하고 로딩 상태를 false로 변경합니다
      return {
        data: parsedData,
        idRef: maxId + 1,
        isLoading: false,
      };
    }),

    // 새로운 일기를 생성하는 함수
    createDiary: (createdDate, emotionId, content) => set((state) => {
      // 새로운 일기 데이터를 생성하고 기존 데이터 앞에 추가합니다
      const newData = [{ id: state.idRef++, createdDate, emotionId, content }, ...state.data];
      // 로컬 스토리지에 새로운 일기 데이터를 저장합니다
      localStorage.setItem('diary', JSON.stringify(newData));
      // 상태를 업데이트하여 새로운 데이터를 설정합니다
      return { data: newData };
    }),

    // 기존 일기를 업데이트하는 함수
    updateDiary: (id, createdDate, emotionId, content) => set((state) => {
      // 일기 데이터를 업데이트합니다
      const newData = state.data.map((item) =>
        String(item.id) === String(id) ? { id, createdDate, emotionId, content } : item
      );
      // 로컬 스토리지에 업데이트된 일기 데이터를 저장합니다
      localStorage.setItem('diary', JSON.stringify(newData));
      // 상태를 업데이트하여 새로운 데이터를 설정합니다
      return { data: newData };
    }),

    // 일기를 삭제하는 함수
    deleteDiary: (id) => set((state) => {
      // 일기 데이터를 필터링하여 삭제합니다
      const newData = state.data.filter((item) => String(item.id) !== String(id));
      // 로컬 스토리지에 업데이트된 일기 데이터를 저장합니다
      localStorage.setItem('diary', JSON.stringify(newData));
      // 상태를 업데이트하여 새로운 데이터를 설정합니다
      return { data: newData };
    }),

    // 로딩 상태를 설정하는 함수
    setLoading: (isLoading) => set({ isLoading }),
}));

export default useDiaryStore;