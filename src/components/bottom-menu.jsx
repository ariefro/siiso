import { userState } from '@/atoms/user-atom';
import { useRecoilValue } from 'recoil';
import { Player } from '.';

export default function BottomMenu() {
  const user = useRecoilValue(userState);

  return <div>{user?.product === 'premium' && <Player />}</div>;
}
