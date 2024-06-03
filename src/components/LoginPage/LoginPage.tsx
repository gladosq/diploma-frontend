import s from './LoginPage.module.scss';
import {Form, Input, message, Modal} from 'antd';
import Button from '../UI/Button/Button.tsx';
import {fetchLogin, ILoginPayload} from '../../api/authentication.ts';
import {useMutation} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';

export default function LoginPage() {
  const [, setCookie,] = useCookies(['auth-data']);
  const [form] = Form.useForm();
  const history = useNavigate();

  const {mutate, isPending} = useMutation({
    mutationFn: (values: ILoginPayload) => {
      return fetchLogin(values);
    }
  });

  const onFinish = async (formValues: ILoginPayload) => {
    mutate(
      {email: formValues.email, password: formValues.password},
      {
        onSuccess: (res) => {
          message.info('Успешная авторизация');
          setCookie('auth-data', res.accessToken, {path: '/'});
          history('/');
        },
        onError: (err: any) => {
          message.info(err.message.message);
        }
      }
    )
  };

  return (
    <div className={s.wrapper}>
      <Modal
        title='Войти в систему'
        width='400px'
        footer={false}
        open={true}
        closeIcon={false}
        centered={true}
      >
        <Form
          onFinish={onFinish}
          form={form}
          className={s.form}
          scrollToFirstError
          layout='vertical'
          autoComplete='off'
        >
          <Form.Item
            name='email'
            className={s.formItem}
            rules={[{required: true, message: 'Введите email'}]}
          >
            <Input
              className={s.input}
              placeholder='Логин'
              size='large'
            />
          </Form.Item>
          <Form.Item
            name='password'
            className={s.formItem}
            rules={[{required: true, message: 'Введите пароль'}]}
          >
            <Input.Password
              className={s.input}
              placeholder='Пароль'
              size='large'
            />
          </Form.Item>
          <div className={s.buttonWrapper}>
            <Button isLoading={isPending}>
              Войти
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
