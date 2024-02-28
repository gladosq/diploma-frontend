import {Outlet, Navigate} from 'react-router-dom';
import {RoleEnum} from './src/const/enum.ts';
import {useQuery} from '@tanstack/react-query';

const PrivateRoutes = () => {
  const {data: dataProfile, isSuccess, isFetching} = useQuery<{role: string}>({ queryKey: ['my-profile']});

  if (isFetching) {
    return <h1>Loading...</h1>
  }

  if (isSuccess && dataProfile?.role !== RoleEnum.Moderator) {
    return <Navigate to='/'/>
  }

  return (
    <Outlet/>
  )
};

export default PrivateRoutes;
