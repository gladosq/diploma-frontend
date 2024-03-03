import {Cookies} from 'react-cookie';
import {useQuery} from '@tanstack/react-query';

export type CreateResultPayload = {
  result: string[];
  moduleId: string;
  token: Cookies;
}

export const createResultFetcher = async ({result, moduleId, token}: CreateResultPayload): Promise<any> => {
  const res = await fetch(
    // @ts-ignore
    `${__APP_BASE_URL__}/result/create`,
    {
      method: 'POST',
      body: JSON.stringify({result, moduleId}),
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

export const getResultsFetcher = async ({id, token}: { id?: string, token: Cookies }) => {
  const res = await fetch(
    // @ts-ignore
    `${__APP_BASE_URL__}/result/user/${id}`,
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

export function useAllResults({id, token}: { id: string | undefined, token: Cookies }) {
  return useQuery({
    queryKey: ['results'],
    queryFn: () => getResultsFetcher({id, token}),
    enabled: !!(id && token),
    staleTime: 0
  })
}
