import { redirectToAuthenticate } from '@/shared/utils/common';
import { IRootState } from '@/store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Auth = ({ children }) => {
  const isAuthenticated = useSelector((state: IRootState) => state.auth.isAuthenticated);
  const isAdmin = false;
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      redirectToAuthenticate();
    }

    return () => {};
  }, [isAuthenticated]);

  const View = <span aria-label="Loading ..."></span>;

  return isAuthenticated ? View : null;
};

export default Auth;
