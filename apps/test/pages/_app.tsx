import 'tailwindcss/tailwind.css';
import { AuthProvider } from '../util/auth-provider';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
