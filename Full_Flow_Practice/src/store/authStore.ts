import { create } from 'zustand';

interface AuthState {
  username: string;
  password: string;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
}

// Zustand로 상태 관리
const useAuthStore = create<AuthState>((set) => ({
  username: '', // 초기 username 상태
  password: '', // 초기 password 상태
  setUsername: (username) => set({ username }), // username 업데이트 함수
  setPassword: (password) => set({ password }), // password 업데이트 함수
}));

export default useAuthStore;
