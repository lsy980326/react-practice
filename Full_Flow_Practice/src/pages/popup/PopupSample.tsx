// PopupSample.tsx
import React from 'react';

const PopupSample = () => {
  return (
    <div style={styles.popupContainer}>
      {/* 팝업 헤더 영역 */}
      <div style={styles.header}>
        <h2 style={{ margin: 0 }}>팝업 제목</h2>
      </div>

      {/* 팝업 콘텐츠 영역 */}
      <div style={styles.content}>
        <p>팝업 내용을 입력해주세요.</p>
      </div>
    </div>
  );
};

export default PopupSample;

// 간단한 인라인 스타일 예시
const styles: { [key: string]: React.CSSProperties } = {
  popupContainer: {
    width: '400px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    background: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    overflow: 'hidden',
  },
  header: {
    background: '#f5f5f5',
    padding: '16px',
    borderBottom: '1px solid #ccc',
  },
  content: {
    padding: '16px',
  },
};
