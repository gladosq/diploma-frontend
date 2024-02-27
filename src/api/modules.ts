import {Cookies} from 'react-cookie';
import {useQuery} from '@tanstack/react-query';

type ModulesResponseType = {
  id: string;
  article: [];
  testing: [];
  theme: string;
  title: string;
  description: string;
  updatedAt: string;
  difficulty: string;
}

export type CreateModulePayload = {
  module: {
    title: string;
    theme: string;
    difficulty: any;
    description: string;
  },
  token: Cookies;
}

export const fetchModules = async ({token}: { token: Cookies }): Promise<ModulesResponseType[]> => {
  const res = await fetch(
    // @ts-ignore
    `${__APP_BASE_URL__}/education-modules`,
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

export const fetchCreateModule = async (data: CreateModulePayload): Promise<{title: string}> => {
  const res = await fetch(
    // @ts-ignore
    `${__APP_BASE_URL__}/education-modules/create`,
    {
      method: 'POST',
      body: JSON.stringify(data.module),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${data.token}`
      }
    });

  if (!res.ok) {
    const err = new Error();
    err.message = await res.json();
    throw err;
  }

  return res.json();
};


export function useAllModules({token}: { token: Cookies }) {
  return useQuery({
    queryKey: ['modules'],
    queryFn: () => fetchModules({token})
  })
}
