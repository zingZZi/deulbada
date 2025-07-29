import Login from '../../pages/login/Login';

function Content({ page }) {
  switch (page) {
    case 'login':
      return <Login />;
  }
}

const LoginLayout = ({ page }) => {
  return (
    <>
      <Content page={page} />
    </>
  );
};

export default LoginLayout;
