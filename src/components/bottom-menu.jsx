import { userState } from '@/atoms/user-atom';
import { useRecoilValue } from 'recoil';
import { BottomNavbar, Player } from '.';

export default function BottomMenu() {
  const user = useRecoilValue(userState);

  return (
    <div>
      {user?.body?.product === 'premium' ? <Player /> : <BottomNavbar />}
    </div>
  );
}
