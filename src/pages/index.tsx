import { IRootState } from '@/store';
import type { NextPage } from 'next';
import { useSelector } from 'react-redux';

const Home: NextPage = () => {
  const { role_codes } = useSelector((state: IRootState) => state.auth.me);
  const isAdmin = role_codes?.includes('enterprise');

  return <>{isAdmin ? 'admin' : 'home'}</>;
};

export default Home;
