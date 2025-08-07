import { useEffect, useState, useRef } from 'react';

export function useScrollObserver() {
  const [isBottom, setIsBottom] = useState();
  const endLineRef = useRef(null);

  console.log('isBottom: ', isBottom);

  useEffect(() => {
    const endLine = document.createElement('div');
    endLine.style.height = '10px';
    document.body.append(endLine);
    endLineRef.current = endLine;

    const observer = new IntersectionObserver(
      (entry) => {
        if (entry[0].isIntersecting) {
          setIsBottom(true);
        } else {
          setIsBottom(false);
        }
      },
      {
        threshold: 1,
        rootMargin: '300px',
      }
    );

    observer.observe(endLineRef.current);

    return () => {
      observer.unobserve(endLineRef.current);
      document.body.removeChild(endLineRef.current);
    };
  }, []);

  return isBottom;
}
