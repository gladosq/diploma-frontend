import clsx, {ClassValue} from 'clsx';
import s from './Button.module.scss';
import {ReactNode} from 'react';
import {ButtonHTMLType} from 'antd/es/button';

type ButtonType = 'primary' | 'secondary' | 'red';

type ButtonProps = {
  children?: ReactNode;
  viewType?: ButtonType;
  onClick?: () => void;
  isDisabled?: boolean;
  className?: ClassValue;
  type?: ButtonHTMLType;
  isLoading?: boolean;
};

export default function Button(
  {children, isDisabled = false, onClick, viewType = 'primary', className, type, isLoading}: ButtonProps
) {
  const buttonClasses = clsx(s.button, {
    [s.buttonPrimary]: viewType === 'primary',
    [s.buttonSecondary]: viewType === 'secondary',
    [s.buttonRed]: viewType === 'red',
    [s.buttonDisabled]: isDisabled,
    [s.isLoading]: isLoading,
  }, className ?? undefined);

  return (
    <button
      className={clsx(s.button, buttonClasses, className)}
      onClick={onClick}
      type={type}
    >
      {isLoading && <div className={s.preloader}></div>}
      {children}
    </button>
  );
};
