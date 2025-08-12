import { BasicBtn, NolineIconBtn } from '../../../styles/Button.style';
import { ArrowIcon, EllipsisVerticalIcon } from '../../icon/Icons';
import { defaultHeaderMap } from './headerConfigs';
import * as Styled from './DefaultHeader.style';

const DefaultHeader = ({ location, onAction }) => {
  const config = defaultHeaderMap(location.pathname);
  const { leftText, rightButton } = config;

  const handleClick = () => {
    if (rightButton?.actionKey && typeof onAction === 'function') {
      onAction(rightButton.actionKey);
    }
  };

  return (
    <>
      <Styled.HeaderNav>
        <h1 className="text-ir">들바다</h1>
        <NolineIconBtn onClick={() => window.history.back()}>
          <ArrowIcon />
        </NolineIconBtn>
        {leftText ? <Styled.HeaderTitle>{leftText}</Styled.HeaderTitle> : null}
      </Styled.HeaderNav>

      {rightButton && (
        <>
          {rightButton.type === 'icon' ? (
            <NolineIconBtn onClick={handleClick}>
              <EllipsisVerticalIcon />
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
