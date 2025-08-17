import { BasicBtn, NolineIconBtn } from '../../../styles/Button.style';
import { ArrowIcon, EllipsisVerticalIcon } from '../../icon/Icons';
import { defaultHeaderMap } from './headerConfigs';
import * as Styled from './DefaultHeader.style';
import { MoreVertical } from 'lucide-react';
import { usePageActions } from '../../../context/PageActionsContext';

const DefaultHeader = ({ location, onAction }) => {
  const config = defaultHeaderMap(location.pathname);
  const { leftText, rightButton } = config;
  const { actions } = usePageActions();
  // ChatRoom에서 navigate('', { state: { headerTitle: '상대닉네임' } })로 넣은 값
  const headerTitleFromState = location?.state?.headerTitle;
  const title = headerTitleFromState ?? leftText;

  const handleClick = () => {
    const rb = rightButton;
    if (!rb) return;
     // 1) actionKey 우선: 한 경로만 실행하고 즉시 return
    if (rb.actionKey) {
       // 1-1) 부모 onAction을 쓰는 화면이면 그걸로 처리
      if (typeof onAction === 'function') return onAction(rb.actionKey);
       // 1-2) 컨텍스트에 등록된 액션이 있으면 그걸로 처리
      const fn = actions?.[rb.actionKey];
      if (typeof fn === 'function') return fn();
       // 1-3) 둘 다 없으면(레거시) 문서 이벤트로 폴백
      document.dispatchEvent(new CustomEvent(rb.actionKey));
      return;
    }
     // 2) action(인라인 함수) 버튼이면 그걸로 처리
    if (typeof rb.action === 'function') {
      return rb.action();
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
