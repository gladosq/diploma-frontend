'use strict';

import s from './ModuleTest.module.scss';
import {useParams} from 'react-router-dom';
import {useModule} from '../../api/modules.ts';
import {useCookies} from 'react-cookie';
import {Form, message, Radio} from 'antd';
import Button from '../UI/Button/Button.tsx';
import {createResultFetcher, CreateResultPayload} from '../../api/results.ts';
import {useMutation} from '@tanstack/react-query';

export default function ModuleTest() {
  const {id} = useParams();
  const [cookies] = useCookies(['auth-data']);
  const [form] = Form.useForm();

  const {data} = useModule({token: cookies['auth-data'], id: id});

  const {mutate} = useMutation({
    mutationFn: ({result, moduleId, token}: CreateResultPayload) => {
      return createResultFetcher({result, moduleId, token});
    }
  });

  const onFinish = async (formValues) => {

    mutate(
      {result: Object.values(formValues), moduleId: id!, token: cookies['auth-data']},
      {
        onSuccess: (res) => {
          message.info('Тест пройден');
          // setCookie('auth-data', res.accessToken);
          // history('/');
        },
        onError: (err: any) => {
          message.info(err.message.message);
        }
      }
    );

  };

  return (
    <div className={s.wrapper}>
      <h1>Тестирование</h1>
      <Form
        onFinish={onFinish}
        form={form}
        // scrollToFirstError
        layout='vertical'
        // initialValues={{results: [{title: '', variants: ['var1', 'var2', 'var3', 'var4']}, '', '', '']}}
        autoComplete='off'
        className={s.form}
      >
        {data?.testing.map((item, index) => {
          return (
            <div key={index} className={s.outerWrapper}>
              <div className={s.innerWrapper}>
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
                    <Radio.Group className={s.radioGroup}>
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
            </div>
          )
        })}
        <div className={s.submitButton}>
          <Button
            type={'submit'}
            // onClick={() => {
            //   form.submit();
            // }}
          >
            Отправить результаты
          </Button>
        </div>
      </Form>
    </div>
  );
}
