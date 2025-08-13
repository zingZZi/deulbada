import * as Styled from './OptionBottomSheet.style';

const OptionsBottomSheet = ({ options = [], onClose }) => {
  return (
    <>
      <Styled.Overlay onClick={onClose} />
      <Styled.BottomSheet>
        <Styled.HandleBar />
        {options.map((opt, idx) => (
          <button key={idx} onClick={opt.onClick}>
            {opt.label}
          </button>
        ))}
        <Styled.CancelButton onClick={onClose}>취소</Styled.CancelButton>
      </Styled.BottomSheet>
    </>
  );
};

export default OptionsBottomSheet;