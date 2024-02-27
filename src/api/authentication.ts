export interface ILoginPayload {
  email: string;
  password: number;
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
