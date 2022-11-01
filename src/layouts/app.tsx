import { IRootState } from '@/store';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { AdminLayout } from './AdminLayout';
import { UserLayout } from './UserLayout';

export interface IAppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout(props: IAppLayoutProps) {
  const isAdmin = false;
  const { children } = props;
  const router = useRouter();

  return (
    <>
      {isAdmin ? (
        <AdminLayout>{children}</AdminLayout>
      ) : (
        <UserLayout>{children}</UserLayout>
      )}
    </>
  );
}
