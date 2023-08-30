import Head from 'next/head';

function HeadMeta() {
  return (
    <Head>
      <title>Siiso</title>
      <meta
        name='description'
        content='A web app for visualizing personalized Spotify data'
      />
    </Head>
  );
}

export default HeadMeta;
