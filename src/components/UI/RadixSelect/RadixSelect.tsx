import * as Select from '@radix-ui/react-select';
import {ClassValue, clsx} from 'clsx';
import {CheckIcon, ChevronDownIcon, ChevronUpIcon} from '@radix-ui/react-icons';
import s from './RadixSelect.module.scss';
import React, {ReactNode} from 'react';
import useSettingsStore from '../../AsciiCanvas/store/settings.ts';

type SelectItemType = {
  children: ReactNode;
  value: string;
  className?: ClassValue;
};

type RadixSelectProps = {
  formKey: string;
  label: string;
  options: { title: string, value: string }[];
  defaultValue: string;
  disabled?: boolean;
};

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemType>((
  {children, className, ...rest}: SelectItemType, forwardedRef) => {
  return (
    <Select.Item
      className={clsx(s.selectItem, className)}
      {...rest}
      ref={forwardedRef}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className={s.selectItemIndicator}>
        <CheckIcon/>
      </Select.ItemIndicator>
    </Select.Item>
  );
});

export const RadixSelect = ({formKey, options, label}: RadixSelectProps) => {
  const {settings, setSettings, setActiveSetting} = useSettingsStore();

  return (
    <div className={s.wrapper}>
      <p className={s.label}>{label}</p>
      <Select.Root
        onValueChange={(e) => {
          setActiveSetting(formKey);
          if (settings) {
            setSettings({...settings, [formKey]: e});
          }
        }}
        value={String(settings?.[formKey as keyof typeof settings])}
      >
        <Select.Trigger className={s.selectTrigger}>
          <Select.Value/>
          <Select.Icon className={s.selectIcon}>
            <ChevronDownIcon width={24} height={24}/>
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className={s.selectContent}>
            <Select.ScrollUpButton className={s.selectScrollButton}>
              <ChevronUpIcon width={24} height={24}/>
            </Select.ScrollUpButton>
            <Select.Viewport className={s.selectViewport}>
              {options.map((item) => {
                return (
                  <SelectItem key={item.title} value={item.value}>{item.title}</SelectItem>
                );
              })}
            </Select.Viewport>
            <Select.ScrollDownButton className={s.selectScrollButton}>
              <ChevronDownIcon width={24} height={24}/>
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};
