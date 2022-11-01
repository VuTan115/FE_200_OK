import PostDetailModule from '@/modules/Posts/pages/Detail';
import { IRootState } from '@/store';
import type { NextPage } from 'next';
import { useSelector } from 'react-redux';

const Home: NextPage = () => {
  const { id } = useSelector((state: IRootState) => state.auth.me);
  const isAdmin = false;

  return <>{isAdmin ? 'admin' : <PostDetailModule />}</>;
};

export default Home;
