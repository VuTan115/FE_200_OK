import Footer from './Footer';
import Header from './Header';

export interface IAppLayoutProps {
  children: React.ReactNode;
}

export function UserLayout(props: IAppLayoutProps) {
  const { children } = props;
  // router.pathname.includes('/admin') ? ((page) => <AdminLayout children={page} />)
  //     : ((page) => <FrontLayout children={page} />);
  return (
    <>
      <Header />
      <div className="mx-[32px]">
        <main id="__main" className="container">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}
