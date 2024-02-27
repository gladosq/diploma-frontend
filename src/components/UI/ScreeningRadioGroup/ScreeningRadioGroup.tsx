import s from './ScreeningRadioGroup.module.scss';
import {Radio, Space} from 'antd';
import {useState} from 'react';
import {clsx} from 'clsx';

type PayloadHandler = {
  taskNumber: number;
  value: string;
};

type ScreeningRadioGroupProps = {
  data: string[];
  taskNumber: number;
  onChangeRadio: (value: PayloadHandler) => void;
};

export default function ScreeningRadioGroup({data, taskNumber, onChangeRadio}: ScreeningRadioGroupProps) {
  const [value, setValue] = useState();

  return (
    <Radio.Group name={'radioGroup'} value={value}>
      <Space size={0} direction='vertical'>
        {data.map((item, index) => {
          return (
            <Radio value={item} onChange={(e) => {
              setValue(e.target.value);
              onChangeRadio({taskNumber: Number(taskNumber), value: e.target.value});
            }}>
              <span
                className={clsx(
                  s.radioContent, value && data.indexOf(value) === index && s.radioChecked
                )}
              >
                {item}
              </span>
            </Radio>
          )
        })}
      </Space>
    </Radio.Group>
  );
}