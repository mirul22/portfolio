import { CursorLayout } from 'components/CursorLayout';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

const IndexPage = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('headTitle')}</title>
      </Head>
      <CursorLayout />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default IndexPage;
