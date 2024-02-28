import s from './Header.module.scss';
import LogoIcon from '../UI/Icons/LogoIcon.tsx';
import {Link, useNavigate} from 'react-router-dom';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import {CaretDownIcon} from '@radix-ui/react-icons';
import {ListItem} from './ListItemLink.tsx';
import './../../styles/radix-custom.scss';
import {Breadcrumb} from 'antd';
import {useCookies} from 'react-cookie';
import {useProfile} from '../../api/authentication.ts';
import {useMemo} from 'react';
import {RoleEnum} from '../../const/enum.ts';
// import {useCookies} from 'react-cookie/esm';

export default function Header() {
  const history = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['auth-data']);

  const {data: dataProfile} = useProfile({token: cookies['auth-data']});

  const isModerator = dataProfile?.role === RoleEnum.Moderator;

  return (
    <>
      <div className={s.wrapper}>
        <Link className={s.logoLink} to={'/'}>
          <LogoIcon/>
        </Link>
        <div className={s.navigation}>
          <NavigationMenu.Root className='NavigationMenuRoot'>
            <NavigationMenu.List className='NavigationMenuList'>
              <NavigationMenu.Item>
                <NavigationMenu.Trigger className='NavigationMenuTrigger'>
                  Учебник <CaretDownIcon className='CaretDown' aria-hidden/>
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className='NavigationMenuContent'>
                  <ul className='List one'>
                    <ListItem title='JavaScript' href='/primitives/docs/overview/introduction'>
                      <div className='BookContainer'>
                        <div className='BookInner'>
                          <p>Глава 1. Оптимизация ресурсов</p>
                          <p>Глава 2. Оптимизация ресурсов</p>
                        </div>
                      </div>
                    </ListItem>
                    <ListItem title='Node.js' href='/primitives/docs/overview/getting-started'>
                      <div className='BookContainer'>
                        <p>Глава 1. Оптимизация ресурсов</p>
                        <p>Глава 2. Оптимизация ресурсов</p>
                      </div>
                    </ListItem>
                    <ListItem title='PHP' href='/primitives/docs/overview/getting-started'>
                      <div className='BookContainer'>
                        <p>Глава 1. Оптимизация ресурсов</p>
                        <p>Глава 2. Оптимизация ресурсов</p>
                      </div>
                    </ListItem>
                  </ul>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <NavigationMenu.Trigger className='NavigationMenuTrigger'>
                  Профиль <CaretDownIcon className='CaretDown' aria-hidden/>
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className='NavigationMenuContent'>
                  <ul className='List two'>
                    <ListItem title='Модули' href='/'>
                      <span className='caption'>Список всех модулей</span>
                    </ListItem>
                    <ListItem title='Мой профиль' href='/profile'>
                      <span className='caption'>Данные о профиле, информация о текущем статусе, должности и ключевой ставке</span>
                    </ListItem>
                    <ListItem title='Мои тесты' href='/profile/tests'>
                      <span className='caption'>Информация о пройденных тестах</span>
                    </ListItem>
                    {isModerator && (
                      <ListItem title='Модерация' href='/moderate'>
                        <span className='caption'>Добавление, редактирование, удаление пользователей и модулей</span>
                      </ListItem>
                    )}
                  </ul>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <NavigationMenu.Link className='NavigationMenuLink' href='https://github.com/radix-ui'>
                  Gitlab
                </NavigationMenu.Link>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <NavigationMenu.Link className='NavigationMenuLink' href='https://github.com/radix-ui'>
                  Jira
                </NavigationMenu.Link>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <NavigationMenu.Link
                  type={'button'}
                  className='NavigationMenuLink'
                  // href='https://github.com/radix-ui'
                  onClick={(e) => {
                    e.preventDefault();
                    // removeCookie('auth-data', {path: '/'});
                    history('/login');
                  }}
                >
                  Выйти
                </NavigationMenu.Link>
              </NavigationMenu.Item>

              <NavigationMenu.Indicator className='NavigationMenuIndicator'>
                <div className='Arrow'/>
              </NavigationMenu.Indicator>
            </NavigationMenu.List>

            <div className='ViewportPosition'>
              <NavigationMenu.Viewport className='NavigationMenuViewport'/>
            </div>
          </NavigationMenu.Root>
        </div>
      </div>
      <div className={s.breadcrumbs}>
        <Breadcrumb
          separator='>'
          items={[
            {
              // title: 'Главная',
              title: <Link to={'/'}>Главная</Link>
            },
            {
              title: 'Application Center',
              href: '',
            },
            {
              title: 'Application List',
              href: '',
            }
          ]}
        />
      </div>
    </>
  );
}
