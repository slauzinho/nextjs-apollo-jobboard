import Link from 'next/link';
import { NextFunctionComponent } from 'next';
import { useLogoutMutation, useMeQuery } from '../generated/apolloComponents';
import { Container } from './styles';

const Nav: NextFunctionComponent = () => {
  const logout = useLogoutMutation();
  const { data, refetch } = useMeQuery({ errorPolicy: 'all' });
  return (
    <Container>
      <div>
        <Link href="/">
          <a>Emprego Dev</a>
        </Link>
      </div>
      {data && data.me ? (
        <button
          onClick={async () => {
            await logout();
            await refetch();
          }}
        >
          Logout
        </button>
      ) : (
        <>
          <Link href="/login">
            <a>Login</a>
          </Link>
          <Link href="/register">
            <a>Create Account</a>
          </Link>
        </>
      )}
    </Container>
  );
};

Nav.getInitialProps = async () => {
  console.log('eii');
};

export default Nav;
