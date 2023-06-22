import Loading from '@/components/loading';
import '../../styles/output.css';
import { getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';

function Login({ providers }) {
  const [loading, setLoading] = useState(false);

  const handleLogin = (providerId) => {
    signIn(providerId, { callbackUrl: '/' });
    setLoading(true);
  };

  return (
    <div className='bg-zinc-900 h-screen flex items-center justify-center'>
      {loading ? (
        <Loading />
      ) : (
        <div>
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
