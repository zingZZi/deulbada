import { ArrowIcon } from '../../icon/Icons';

const DefaultHeader = () => {
  return (
    <>
      <button onClick={() => window.history.back()}>
        <ArrowIcon />
      </button>
    </>
  );
};

export default DefaultHeader;
