import { deviceState } from '@/atoms/device-atom';
import { userState } from '@/atoms/user-atom';
import useSpotify from '@/hook/useSpotify';
import { fetchAvailableDevices, fetchUser } from '@/lib/spotify';
import { createContext, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useRecoilState(userState);
  const [device, setDevice] = useRecoilState(deviceState);
  const [error, setError] = useState(false);

  const getUserData = async () => {
    try {
      const user = await fetchUser();
      const device = await fetchAvailableDevices();
      setUser(user);
      setDevice(device);
    } catch (error) {
      console.log('Something went wrong: ', error);
      setError(true);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, device, setDevice, error, setError }}
    >
      {children}
    </UserContext.Provider>
  );
}
