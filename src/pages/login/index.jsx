import '../../styles/output.css';
import { getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import { HeadMeta, Loading } from '@/components';

function Login({ providers }) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const handleLogin = (providerId) => {
    signIn(providerId, { callbackUrl: '/' });
    setLoading(true);
  };

  return (
    <div className='bg-zinc-900 h-screen flex items-center justify-center'>
      <HeadMeta />
      {loading ? (
        <Loading />
      ) : (
        <div className='flex flex-col items-center justify-center'>
          {showModal && (
            <div className='absolute z-50 bg-zinc-300 top-0 bottom-0 left-0 right-0 bg-opacity-60 flex items-center justify-center'>
              <div className='fixed text-sm z-50 top-24 text-zinc-100 bg-zinc-700 shadow-lg shadow-zinc-900 rounded-xl mx-10 max-w-2xl flex flex-col items-center justify-between px-10 py-7 md:text-base'>
                <div>
                  <p>
                    This app is currently in development. This app is only
                    available to approved Spotify users. Please sign in to
                    Spotify using the following credentials:
                  </p>
                  <br />
                  <div>
                    <div className='flex'>
                      <p className='w-24'>Email</p>
                      <p>: siiso.app@gmail.com</p>
                    </div>
                    <div className='flex'>
                      <p className='w-24'>Password</p>
                      <p>: dummy999</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className='px-6 py-2 mt-10 rounded-lg bg-zinc-600 border border-zinc-400 hover:bg-zinc-800'
                >
                  OK
                </button>
              </div>
            </div>
          )}
          <Image
            src={'https://i.ibb.co/2Kh5rp9/spotify-logo.png'}
            priority
            width={100}
            height={100}
            alt='spotify logo'
            className='mb-8 mx-auto md:w-36 md:h-36'
          ></Image>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className='group relative h-8 w-32 rounded-lg overflow-hidden bg-white shadow md:h-10 md:w-36'
                onClick={() => handleLogin(provider.id)}
              >
                <div className='absolute inset-0 w-0 bg-[#18D860] transition-all duration-300 ease-out group-hover:w-full'></div>
                <span className='relative text-xs md:text-sm text-black group-hover:text-white'>
                  Login with {provider.name}
                </span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
