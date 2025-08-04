import { BasicBtn, NolineIconBtn } from '../../../styles/Button.style';
import { ArrowIcon } from '../../icon/Icons';
import { EllipsisVerticalIcon } from '../../icon/Icons';
import { defaultHeaderMap } from './headerConfigs';
import * as Styled from './DefaultHeader.style';

const DefaultHeader = ({ location }) => {
  const config = defaultHeaderMap[location.pathname] || {};
  const { leftText, rightButton } = config;
  console.log(leftText, rightButton);
  return (
    <>
      <Styled.headerNav>
        <h1 className="text-ir">들바다</h1>
        <NolineIconBtn onClick={() => window.history.back()}>
          <ArrowIcon />
        </NolineIconBtn>
        {leftText ? <Styled.headerTitle>{leftText}</Styled.headerTitle> : null}
      </Styled.headerNav>

      {rightButton && (
        <>
          {rightButton.type === 'icon' ? (
            <NolineIconBtn onClick={rightButton.action}>
              <EllipsisVerticalIcon />
              <span className="text-ir">{rightButton.text}</span>
            </NolineIconBtn>
          ) : (
            <BasicBtn onClick={rightButton.action}>{rightButton.text}</BasicBtn>
          )}
        </>
      )}
    </>
  );
};

export default DefaultHeader;
