import Head from 'next/head';
import { FC, ReactNode } from 'react';

interface IProps {
  title?: string;
  keepMetaData?: boolean;
  children?: ReactNode;
}

const defaultSiteTitle = 'Cookies';

/**
 * Usage note
 *
 * If `children` existed, should add `keepMetaData` to make the default meta is
 * present.
 */
const HtmlHeader: FC<IProps> = ({ title, children, keepMetaData }) => {
  const MetaData = (
    <>
      <meta name="description" content="Cookies" />
      <meta name="keywords" content="Cookies" />
      <meta property="og:title" content={title || defaultSiteTitle} />
      <meta property="og:url" content="https://cookies.com.vn/" />
      <meta property="og:description" content="Cookies" />
      <meta property="og:type" content="website" />
      <link rel="icon" href="/icons/cookies-active.svg" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      ></link>
    </>
  );

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="author" content="Cookies" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
      />

      <title>{title || defaultSiteTitle}</title>

      {MetaData}

      {/* {!isEmpty(children) && children}

      {isEmpty(children) && MetaData} */}
    </Head>
  );
};

export default HtmlHeader;
