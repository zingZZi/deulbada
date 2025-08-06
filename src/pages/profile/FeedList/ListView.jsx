import UserInfo from '../../../components/userInfo/UserInfo';
import PostContent from '../../../components/PostContent/PostContent';
const ListView = () => {
  return (
    <>
      <UserInfo username={'username'} accountId={'account_id'} feedList={true} />
      <PostContent />
    </>
  );
};
export default ListView;
