import {Cookies} from 'react-cookie';
import {useQuery} from '@tanstack/react-query';
import {DifficultyEnum} from '../const/enum.ts';

export type TestingResponseType = {
  correctAnswer: string;
  question: string;
  variant1: string;
  variant2: string;
  variant3: string;
  variant4: string;
}

export type ModulesResponseType = {
  createdAt: string;
  id: string;
  article: [];
  testing: TestingResponseType[];
  isPublished: boolean;
  theme: string;
  title: string;
  description: string;
  updatedAt: string;
  difficulty: DifficultyEnum;
}

export type CreateModulePayload = {
  data: {
    title: string;
    description: string;
    theme: string;
    difficulty: DifficultyEnum
  },
  token: Cookies;
}

export type UpdateModulePayload = {
  data: ModulesResponseType,
  token: Cookies;
  id: string;
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
    // useAuthorize(err.message);
    throw err.message;
  }

  return res.json();
};

export const fetchSingleModule = async ({token, id}: { token: Cookies, id?: string }): Promise<ModulesResponseType> => {
  const res = await fetch(
    // @ts-ignore
    `${__APP_BASE_URL__}/education-modules/${id}`,
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

export const fetchDeleteModule = async ({token, id}: { token: Cookies, id?: string }) => {
  const res = await fetch(
    // @ts-ignore
    `${__APP_BASE_URL__}/education-modules/${id}/delete`,
    {
      method: 'DELETE',
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

export const fetchCreateModule = async ({data, token}: CreateModulePayload): Promise<{ title: string }> => {
  const res = await fetch(
    // @ts-ignore
    `${__APP_BASE_URL__}/education-modules/create`,
    {
      method: 'POST',
      body: JSON.stringify(data),
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

export const updateModuleFetcher = async ({data, token, id}: UpdateModulePayload): Promise<{
  title: string
}> => {
  const res = await fetch(
    // @ts-ignore
    `${__APP_BASE_URL__}/education-modules/${id}/update`,
    {
      method: 'PUT',
      body: JSON.stringify(data),
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

export function useAllModules({token}: { token: Cookies }) {
  return useQuery({
    queryKey: ['modules'],
    queryFn: () => fetchModules({token}),
    staleTime: 0
  })
}

export function useModule({token, id}: { token: Cookies, id: string | undefined }) {
  return useQuery({
    queryKey: ['module'],
    queryFn: () => fetchSingleModule({token, id}),
    enabled: !!(id && token),
    staleTime: 0,
  })
}
