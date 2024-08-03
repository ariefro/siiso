import '../../styles/output.css';
import { getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import { HeadMeta, Loading } from '@/components';
import Link from 'next/link';

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
            <div className='absolute z-50 bg-zinc-600 top-0 bottom-0 left-0 right-0 bg-opacity-60 flex items-center justify-center'>
              <div className='fixed text-sm z-50 top-1/4 text-zinc-100 bg-zinc-700 shadow-lg shadow-zinc-900 rounded-xl mx-10 max-w-2xl flex flex-col items-center justify-between p-12 md:text-base'>
                <div>
                  <p>
                    This app uses the Spotify Web API. Spotify may use quotas
                    and place use restrictions to ensure that the Spotify
                    Platform is accessed and used as intended and in accordance
                    with the Developer Agreement. Only authorized Spotify users
                    have access to this app.{' '}
                    <span>
                      <Link className='text-green-400' href='/contact'>
                        Contact us
                      </Link>
                    </span>{' '}
                    if you would like to access this app with your Spotify
                    account, or you can sign in to Spotify using the following
                    credentials:
                  </p>
                  <br />
                  <div>
                    <div className='flex'>
                      <p className='w-20'>Email</p>
                      <p>: siiso.app@gmail.com</p>
                    </div>
                    <div className='flex'>
                      <p className='w-20'>Password</p>
                      <p>: !supersecret</p>
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
