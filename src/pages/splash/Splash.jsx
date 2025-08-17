// Splash.jsx - 원래대로 되돌리기
import * as Styled from './Splash.style';
import splashImg from './../../assets/images/splashImg.svg';
import { useEffect } from 'react';

const Splash = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1500); // App.jsx의 fadeTimer와 같은 시간

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <Styled.SplashScreen>
      <Styled.SplashLogo>
        <img src={splashImg} alt="splash 이미지" />
      </Styled.SplashLogo>
    </Styled.SplashScreen>
  );
};

export default Splash;
