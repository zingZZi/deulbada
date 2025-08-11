/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from 'react';

export function useScrollObserver() {
  const [isBottom, setIsBottom] = useState(false);
  const endLineRef = useRef(null);

  useEffect(() => {
    // endLine 요소 생성 및 스타일 설정
    const endLine = document.createElement('div');
    endLine.style.height = '1px';
    //endLine.style.background = 'red'; // 디버깅용 - 나중에 제거
    endLine.style.width = '100%';
    document.body.appendChild(endLine);
    endLineRef.current = endLine;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const isIntersecting = entry.isIntersecting;

        // 콘텐츠 높이 체크
        const documentHeight = Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight
        );
        const viewportHeight = window.innerHeight;
        const hasScrollableContent = documentHeight > viewportHeight;

        // 스크롤 가능한 콘텐츠가 있고, endLine이 화면에 보일 때만 true
        if (isIntersecting && hasScrollableContent) {
          setIsBottom(true);
        } else {
          setIsBottom(false);
        }
      },
      {
        root: null, // viewport를 root로 사용
        threshold: 0.1, // threshold를 조금 낮춰봄
        rootMargin: '100px', // rootMargin도 줄여봄
      }
    );

    // Observer 시작 전에 잠깐 대기
    const timer = setTimeout(() => {
      if (endLineRef.current) {
        observer.observe(endLineRef.current);

        // 초기 상태 확인
        const rect = endLineRef.current.getBoundingClientRect();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      if (endLineRef.current) {
        observer.unobserve(endLineRef.current);
        if (document.body.contains(endLineRef.current)) {
          document.body.removeChild(endLineRef.current);
        }
      }
      observer.disconnect();
    };
  }, []);

  return isBottom;
}
