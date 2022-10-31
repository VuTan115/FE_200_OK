export interface IAppLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout(props: IAppLayoutProps) {
  const { children } = props;

  return (
    <>
      <main id="__main" className="main_admin">
        {children}
      </main>
    </>
  );
}
