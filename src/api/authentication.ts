import {Cookies} from 'react-cookie';
import {useQuery} from '@tanstack/react-query';
import {JobTitleEnum, RoleEnum} from '../const/enum.ts';

export type ILoginPayload = {
  email: string;
  password: number;
}

export type ProfileResponseType = {
  email: string;
  grade: string;
  id: string;
  jobTitle: JobTitleEnum;
  name: string;
  role: RoleEnum;
}

export const fetchLogin = async ({email, password}: ILoginPayload) => {
  const res = await fetch(
    // @ts-ignore
    `${__APP_BASE_URL__}/user/login`,
    {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });

  if (!res.ok) {
    const err = new Error();
    err.message = await res.json();
    throw err;
  }

  return res.json();
};

export const fetchProfile = async ({token}: {token:Cookies}): Promise<ProfileResponseType> => {
  const res = await fetch(
    // @ts-ignore
    `${__APP_BASE_URL__}/user/profile`,
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
    throw err;
  }

  return res.json();
};

export function useProfile({token}: { token: Cookies }) {
  return useQuery({
    queryKey: ['my-profile'],
    queryFn: () => fetchProfile({token}),
    enabled: !!token,
    staleTime: 0
  });
}
