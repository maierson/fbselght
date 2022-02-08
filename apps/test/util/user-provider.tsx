import { useAuthContext } from './auth-context';
import { UserContext } from './user-context';

export const UserProvider: React.FC = ({ children }) => {
  const { authUser } = useAuthContext();
  // const { data: user, loading } = useGetFirestoreDoc<User | null>(
  //   "users",
  //   authUser?.uid,
  // );
  const user = null;
  const loading = false;
  // todo - replace Maybe<Person> here with a required person
  // this will eliminate all of the conditional checks lower in the
  // tree - if the person failed to load, it should be handled
  // explicitly in a different path
  return (
    <UserContext.Provider value={{ user, isLoading: loading }}>
      {children}
    </UserContext.Provider>
  );
};
