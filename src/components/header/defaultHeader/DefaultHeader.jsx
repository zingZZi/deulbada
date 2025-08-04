import { BasicBtn, NolineIconBtn } from '../../../styles/Button.style';
import { ArrowIcon } from '../../icon/Icons';
import { EllipsisVerticalIcon } from '../../icon/Icons';
import { defaultHeaderMap } from './headerConfigs';

const DefaultHeader = ({ location }) => {
  const config = defaultHeaderMap[location.pathname] || {};
  const { leftText, rightButton } = config;
  console.log(leftText, rightButton);
  return (
    <>
      <div>
        <NolineIconBtn onClick={() => window.history.back()}>
          <ArrowIcon />
        </NolineIconBtn>
        {leftText ? leftText : null}
      </div>

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
