import { deviceState } from '@/atoms/device-atom';
import { userState } from '@/atoms/user-atom';
import useSpotify from '@/hook/useSpotify';
import { fetchAvailableDevices, fetchUser, spotifyApi } from '@/lib/spotify';
import { createContext, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const spotifyApi = useSpotify();
  const [user, setUser] = useRecoilState(userState);
  const [device, setDevice] = useRecoilState(deviceState);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const user = await fetchUser();
      const device = await fetchAvailableDevices();
      setUser(user?.body);
      setDevice(device?.body.devices);
    } catch (error) {
      console.log('Something went wrong: ', error);
      setError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [spotifyApi]);

  return (
    <UserContext.Provider value={{ user, device, error }}>
      {children}
    </UserContext.Provider>
  );
}
