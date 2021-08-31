import { NextPage } from 'next';
import { logoutFirebase } from '../util/firebase-client';
import { useAuthenticatedRoute } from '../util/use-authenticated-route';
import { UserProvider } from '../util/user-provider';

const Main: NextPage = () => {
  const authenticated = useAuthenticatedRoute();
  function onClickLogout() {
    logoutFirebase();
  }

  return (
    <UserProvider>
      <div className="w-screen h-scree p-20  antialiased flex flex-col">
        <label className="text-4xl font-extrabold">Main Page</label>
        <label className="text-base font-normal text-gray-700">
          This page should hang on Lighthouse when deployed to Netlify
        </label>
        <button
          className="bg-blue-400 hover:bg-blue-500 text-white mt-10 py-2 px-5 rounded select-none w-48 font-bold"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </UserProvider>
  );
};

export default Main;
