import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import {forwardRef, ReactNode} from 'react';
import {clsx} from 'clsx';
import './../../styles/radix-custom.scss';
import {Link} from 'react-router-dom';

type ListItemType = {
  children: ReactNode;
  title: string;
  href: string;
  className?: string;
}

export const ListItem = forwardRef(({ className, children, title, href, ...props }: ListItemType, forwardedRef) => (
  <li>
    <NavigationMenu.Link asChild>
      {/*@ts-ignore*/}
      <Link className={clsx('ListItemLink', className)} {...props} ref={forwardedRef} to={href}>
        <div className="ListItemHeading">{title}</div>
        <p className="ListItemText">{children}</p>
      </Link>
    </NavigationMenu.Link>
  </li>
));