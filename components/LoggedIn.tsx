import LogoutButton from '../components/LogoutButton';

export default function LoggedInComponent({ data, userData }: { data: any, userData: any }) {
  const [activeUser] = userData;

    return (
        <>
          <div style={{ display: 'contents' }}>
            <span>Hey, {activeUser?.email}! &nbsp;&nbsp;</span>
            <LogoutButton />
          </div>
        </>
    );
}