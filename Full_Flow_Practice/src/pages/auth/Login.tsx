// Login.tsx

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextField from '../../components/common/TextField';
import './Login.css';
import useAuthStore from '../../store/authStore';
import Button from '../../components/common/Button';
import { FaUser, FaLock, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';

/**
 * 로그인 컴포넌트
 * 
 * 사용자로부터 아이디와 비밀번호를 입력받아 로그인 시도
 * 로그인 실패 시 오류 메시지를 애니메이션과 함께 표시
 * 로그인 성공 시 팡 터지는 애니메이션 상자와 체크 마크를 표시 후 사라짐
 */
export default function Login() {
  // Zustand를 사용하여 전역 인증 상태에서 필요한 값과 함수를 가져옴
  const { username, password, setUsername, setPassword } = useAuthStore();

  // 로컬 상태: 오류 메시지, 로그인 성공 상태, 애니메이션 표시 상태를 관리
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 성공 상태
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false); // 애니메이션 표시 상태

  // 오류 메시지 요소에 대한 ref (접근성 개선용)
  const errorRef = useRef<HTMLDivElement>(null);

  /**
   * 로그인 핸들러 함수
   * 
   * 아이디와 비밀번호가 올바른지 확인하고, 
   * 성공 시 애니메이션 표시 및 오류 메시지 초기화
   * 실패 시 오류 메시지 설정
   */
  const handleLogin = () => {
    if (username === 'admin' && password === '1234') {
      console.log('로그인 성공');
      setErrorMessage(''); // 로그인 성공 시 오류 메시지 제거
      setIsLoggedIn(true);  // 로그인 성공 상태 설정
      setShowSuccessAnimation(true); // 애니메이션 표시 상태 설정

      // 애니메이션을 3초 동안 표시 후 숨김
      setTimeout(() => {
        setShowSuccessAnimation(false); // 애니메이션 숨김
        setIsLoggedIn(false); // 로그인 상태 초기화 (필요 시)
        setUsername(''); // 아이디 초기화
        setPassword(''); // 비밀번호 초기화
      }, 3000); // 3초 후 실행
    } else {
      console.log('로그인 실패');
      setErrorMessage('아이디 또는 비밀번호가 일치하지 않습니다.');
      setIsLoggedIn(false); // 로그인 실패 시 로그인 상태 초기화
    }
  };

  /**
   * 오류 메시지가 변경될 때 포커스를 오류 메시지로 이동시킴 (접근성 개선)
   */
  useEffect(() => {
    if (errorMessage && errorRef.current) {
      errorRef.current.focus();
    }
  }, [errorMessage]);

  return (
    <div className="login-container">
      {/* 로그인 헤더 */}
      <div className="login-header">
        <h1>로그인</h1>
      </div>

      {/* 로그인 폼 */}
      <form className='Login' onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        {/* 로그인 실패 시 오류 메시지 표시 */}
        <AnimatePresence>
          {!isLoggedIn && (
            <motion.div 
              className="login-form"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* 아이디 입력 필드 */}
              <TextField
                id="username"
                label="아이디"
                required
                icon={<FaUser />} // 사용자 아이콘
                placeholder="아이디를 입력해주세요"
                value={username}
                onChange={setUsername}
              />

              {/* 비밀번호 입력 필드 */}
              <TextField
                id="password"
                label="비밀번호"
                required
                icon={<FaLock />} // 잠금 아이콘
                type="password" // 비밀번호 입력 필드
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChange={setPassword}
              />

              {/* 오류 메시지 표시 */}
              <AnimatePresence>
                {errorMessage && (
                  <motion.div
                    className="error-message" // CSS 클래스로 스타일링
                    initial={{ opacity: 0, y: -20 }} // 초기 상태: 투명하고 위로 이동
                    animate={{ opacity: 1, y: 0 }} // 애니메이션 상태: 불투명하고 원래 위치
                    exit={{ opacity: 0, y: -20 }} // 퇴장 시 상태: 다시 투명하고 위로 이동
                    transition={{ duration: 0.3 }} // 애니메이션 지속 시간 (초 단위)
                    role="alert" // ARIA 속성 추가 (접근성 개선)
                    tabIndex={-1} // 포커스 가능하게 설정 (접근성 개선)
                    ref={errorRef} // ref 할당 (접근성 개선)
                  >
                    <FaExclamationCircle className="error-icon" /> {/* 오류 아이콘 */}
                    {errorMessage} {/* 오류 메시지 텍스트 */}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 로그인 성공 시 애니메이션 상자 표시 */}
        <AnimatePresence>
          {showSuccessAnimation && (
            <motion.div
            className="success-message" // CSS 클래스로 스타일링
            initial={{ opacity: 0, scale: 0.8 }} // 초기 상태: 투명하고 작게 시작
            animate={{ opacity: 1, scale: 1 }} // 애니메이션 상태: 불투명하고 원래 크기
            exit={{ opacity: 0, scale: 0.8 }} // 퇴장 시 상태: 다시 투명하고 작게
            transition={{ duration: 0.5  }} // 애니메이션 지속 시간 (초 단위)
            >
                <FaCheckCircle className="success-icon" /> {/* 성공 아이콘 */}
                로그인에 성공했습니다!
            </motion.div>
          )}
        </AnimatePresence>

        {/* 로그인 버튼 */}
        <div className="login-button-container">
          <Button 
            type="submit" // 폼 제출 타입 설정
            label="로그인" // 버튼 라벨
            className="login-button" // CSS 클래스로 스타일링
            disabled={showSuccessAnimation} // 애니메이션 중에는 버튼 비활성화
          />
        </div>
      </form>
    </div>
  );
}
