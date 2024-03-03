import {Route, Routes} from 'react-router-dom';
import '@/styles/global.scss';
import '@/styles/font-family.scss';
import '@/styles/antd-custom.scss';
import '@/styles/utils.scss';
import MainAppLayout from './components/MainAppLayout/MainAppLayout.tsx';
import MainPage from './components/MainPage/MainPage.tsx';
import ModuleDetails from './components/ModuleDetails/ModuleDetails.tsx';
import Profile from './components/Profile/Profile.tsx';
import TestsList from './components/TestsList/TestsList.tsx';
import ModuleArticle from './components/ModuleArticle/ModuleArticle.tsx';
import Moderate from './components/Moderate/Moderate.tsx';
import ModerateArticle from './components/ModerateArticle/ModerateArticle.tsx';
import ModerateTest from './components/ModerateTest/ModerateTest.tsx';
import PrivateRoutes from '../private-routes.tsx';
import LoginPage from './components/LoginPage/LoginPage.tsx';
import ModuleTest from './components/ModuleTest/ModuleTest.tsx';

export default function App() {

  return (
    <Routes location={location}>
      <Route path='/' element={<MainAppLayout/>}>
        <Route element={<PrivateRoutes/>}>
          <Route path='/moderate' element={<Moderate/>}/>
        </Route>
        <Route index path='/' element={<MainPage/>}/>
        <Route path='/module/:moduleId' element={<ModuleDetails/>}/>
        <Route path='/module/:id/article' element={<ModuleArticle/>}/>
        <Route path='/module/:id/test' element={<ModuleTest/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/profile/tests' element={<TestsList/>}/>
        <Route path='/moderate/:id/article' element={<ModerateArticle/>}/>
        <Route path='/moderate/:id/test' element={<ModerateTest/>}/>
      </Route>
      <Route path='/login' element={<LoginPage/>}/>
    </Routes>
  )
}
