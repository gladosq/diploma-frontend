import {Cookies} from 'react-cookie';
import {useQuery} from '@tanstack/react-query';

export const getUsersFetcher = async ({token}: { token: Cookies }): Promise<any[]> => {
  const res = await fetch(
    // @ts-ignore
    `${__APP_BASE_URL__}/profile/all-users`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${token}`
      }
    });

  if (!res.ok) {
    const err = new Error();
    err.message = await res.json();
    throw err.message;
  }

  return res.json();
};

export function useAllUsers({token}: { token: Cookies }) {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => getUsersFetcher({token})
  })
}
