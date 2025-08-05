import React, { useRef, useState } from 'react';
import * as Styled from './ActionSheet.style';

const ActionSheet = ({ list, setIsPopupOpen }) => {
  const sheetRef = useRef(null);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const deltaY = e.touches[0].clientY - startY;
    if (deltaY > 0 && sheetRef.current) {
      setCurrentY(deltaY);
      sheetRef.current.style.transform = `translateY(${deltaY}px)`;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    if (currentY > 100) {
      // 아래로 많이 드래그했으면 닫기
      setIsPopupOpen(false);
    } else {
      // 다시 원래 위치로 복귀
      if (sheetRef.current) {
        sheetRef.current.style.transition = 'transform 0.3s ease';
        sheetRef.current.style.transform = 'translateY(0)';
        setTimeout(() => {
          if (sheetRef.current) {
            sheetRef.current.style.transition = '';
          }
        }, 300);
      }
    }

    setCurrentY(0);
  };

  const handleClick = (e) => {
    if (e.target.dataset.target) {
      setIsPopupOpen(false);
    }
  };

  return (
    <Styled.ActionSheetBg onClick={handleClick} data-target="close">
      <Styled.ActionSheet
        ref={sheetRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Styled.DragIndicator />
        {list.map((e, i) => (
          <Styled.ActionItem key={i} onClick={e.action}>
            {e.label}
          </Styled.ActionItem>
        ))}
      </Styled.ActionSheet>
    </Styled.ActionSheetBg>
  );
};

export default ActionSheet;
