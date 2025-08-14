import { BasicBtn, NolineIconBtn } from '../../../styles/Button.style';
import { ArrowIcon, EllipsisVerticalIcon } from '../../icon/Icons';
import { defaultHeaderMap } from './headerConfigs';
import * as Styled from './DefaultHeader.style';
import { MoreVertical } from 'lucide-react';

const DefaultHeader = ({ location, onAction }) => {
  const config = defaultHeaderMap(location.pathname);
  const { leftText, rightButton } = config;
  // ChatRoom에서 navigate('', { state: { headerTitle: '상대닉네임' } })로 넣은 값
  const headerTitleFromState = location?.state?.headerTitle;
  const title = headerTitleFromState ?? leftText;

  const handleClick = () => {
    // 1) 부모 콜백(onAction)로 actionKey 전달
    if (rightButton?.actionKey && typeof onAction === 'function') {
      onAction(rightButton.actionKey);
    }
    // 2) headerConfigs에 action 함수가 직접 온 경우도 지원
    if (typeof rightButton?.action === 'function') {
      rightButton.action();
    }
    // 3) 문서 이벤트도 같이 발행 (ChatRoom에서 리스닝)
    if (rightButton?.actionKey) {
      document.dispatchEvent(new CustomEvent(rightButton.actionKey));
    }
  };

  return (
    <>
      <Styled.HeaderNav>
        <h1 className="text-ir">들바다</h1>
        <NolineIconBtn onClick={() => window.history.back()}>
          <ArrowIcon />
        </NolineIconBtn>
        {/* {leftText ? <Styled.HeaderTitle>{leftText}</Styled.HeaderTitle> : null} */}
        {title ? <Styled.HeaderTitle>{title}</Styled.HeaderTitle> : null}
      </Styled.HeaderNav>

      {rightButton && (
        <>
          {rightButton.type === 'icon' ? (
            <NolineIconBtn onClick={handleClick}>
              {/* /chatRoom 경로일 때는 lucide-react 아이콘 사용 */}
              {String(location?.pathname || '').startsWith('/chatRoom') ? (
                <MoreVertical size={20} />
              ) : (
                <EllipsisVerticalIcon />
              )}
              <span className="text-ir">{rightButton.text}</span>
            </NolineIconBtn>
          ) : (
            <Styled.TextBtn onClick={handleClick}>{rightButton.text}</Styled.TextBtn>
          )}
        </>
      )}
    </>
  );
};

export default DefaultHeader;
