import s from './ModuleTest.module.scss';
import {useParams} from 'react-router-dom';
import {useModule} from '../../api/modules.ts';
import {useCookies} from 'react-cookie';
import {Form, Input, Radio, Upload} from 'antd';
import Button from '../UI/Button/Button.tsx';
import {Fragment} from 'react';

export default function ModuleTest() {
  const {id} = useParams();
  const [cookies] = useCookies(['auth-data']);
  const [form] = Form.useForm();

  const {data, isFetching} = useModule({token: cookies['auth-data'], id: id});

  const onFinish = async (formValues) => {
    console.log('formValues:', formValues);
  };

  return (
    <div className={s.wrapper}>
      <h1>Тестирование</h1>
      <Form
        onFinish={onFinish}
        form={form}
        scrollToFirstError
        layout='vertical'
        // initialValues={{results: [{title: '', variants: ['var1', 'var2', 'var3', 'var4']}, '', '', '']}}
        autoComplete='off'
        className={s.form}
      >
        {data?.testing.map((item, index) => {
          return (
            <div className={s.outerWrapper}>
              <div className={s.titleContainer}>
                <span className={s.questionNumber}>{index + 1}</span>
                <p className={s.title}>{item.question}</p>
                <div className={s.imageWrapper}>

                </div>
              </div>
              <div className={s.variantsWrapper}>
                <Form.Item
                  name={`answer${index + 1}`}
                  className={s.formItem}
                  rules={[{required: true, message: 'Выберите вариант ответа'}]}
                >
                  <Radio.Group onChange={(e) => console.log('e:', e)} className={s.radioGroup}>
                    <Radio className={s.radioItem} value={1}>
                      <div className={s.test}>
                        {item.variant1}{item.variant1}
                      </div>
                    </Radio>
                    <Radio className={s.radioItem} value={2}>{item.variant2}</Radio>
                    <Radio className={s.radioItem} value={3}>{item.variant3}</Radio>
                    <Radio className={s.radioItem} value={4}>{item.variant4}</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>
          )
        })}
        <div className={s.submitButton}>
          <Button
            onClick={() => {
              form.submit();
            }}
          >
            Сохранить
          </Button>
        </div>
      </Form>
    </div>
  );
}
