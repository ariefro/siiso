import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Hanken_Grotesk } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import '../styles/output.css';

const hankenGrotest = Hanken_Grotesk({
  subsets: ['latin'],
  display: 'swap',
});

function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <AnimatePresence mode='wait'>
      <motion.div key={router.pathname} className={hankenGrotest.className}>
        <Component {...pageProps} />
      </motion.div>
      <Toaster
        toastOptions={{
          success: {
            duration: 3000,
            icon: '🚀',
          },
          error: {
            duration: 3000,
          },
        }}
      />
    </AnimatePresence>
  );
}

export default App;
