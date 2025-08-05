import * as Styled from './ModalPopup.style';
const ModalPopUp = ({ modalList, text }) => {
  return (
    <Styled.ModalPopup role="dialog">
      <Styled.Modal>
        <h2 className="text-ir">모달팝업영역입니다.</h2>
        <Styled.Title>{text}하시겠어요?</Styled.Title>
        <Styled.ModalBtns>
          {modalList.map((e, i) => {
            return (
              <Styled.ModalBtnsItem key={i}>
                <Styled.Btn onClick={e.action}>{e.text}</Styled.Btn>
              </Styled.ModalBtnsItem>
            );
          })}
        </Styled.ModalBtns>
      </Styled.Modal>
    </Styled.ModalPopup>
  );
};

export default ModalPopUp;
