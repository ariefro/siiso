import Loading from "@/components/loading";
import "../../styles/output.css";
import { getProviders, signIn } from "next-auth/react"
import Image from "next/image";
import { useState } from "react";

function Login({ providers }) {
  const [loading, setLoading] = useState(false)

  const handleLogin = (providerId) => {
    signIn(providerId, {callbackUrl: "/"})
    setLoading(true)
  }

  return (
    <div className="bg-zinc-800 flex flex-col items-center min-h-screen justify-center">
      {loading && 
        <div className="h-screen flex justify-center items-center">
          <Loading />
        </div>
      }
      <Image src={"https://i.ibb.co/2Kh5rp9/spotify-logo.png"} priority width={100} height={100} alt="spotify logo" className="mb-10 md:w-36 md:h-36"></Image>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button className="group relative h-10 w-36 rounded-lg overflow-hidden bg-white shadow md:h-12 md:w-48"
            onClick={() => handleLogin(provider.id)}
          >
            <div className="absolute inset-0 w-0 bg-[#18D860] transition-all duration-300 ease-out group-hover:w-full"></div>
            <span className="relative text-sm md:text-lg text-black group-hover:text-white">Login with {provider.name}</span>
          </button>
        </div>
      ))}
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    }
  }
}
