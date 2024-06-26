import s from './UsersList.module.scss';
import Button from '../UI/Button/Button.tsx';
import {Form, Input, Modal} from 'antd';
import {useState} from 'react';
import {useCookies} from 'react-cookie';
import {useAllUsers} from '../../api/profile.ts';
import {jobMapper} from '../../utils/mappers.ts';
import {JobTitleEnum} from '../../const/enum.ts';

export default function UsersList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cookies] = useCookies(['auth-data']);


  const {data, isFetching, refetch} = useAllUsers({token: cookies['auth-data']});

  const [form] = Form.useForm();

  const onFinish = async (formValues) => {

  };

  return (
    <div className={s.wrapper}>
      <h1>Список участников</h1>
      <div className={s.users}>
        {data?.map((item) => {
          return (
            <div className={s.item} id={item.id}>
              <h2 className={s.itemName}>{item.name}</h2>
              <span>{jobMapper[item.jobTitle as keyof typeof JobTitleEnum]}</span>
              <p>Ставка: {item.grade}</p>
            </div>
          )
        })}
        <div className={s.item}>
          <h2 className={s.itemName}>Шишкин Никита Юрьевич</h2>
          <span>Frontend-разработчик</span>
          <p>Ставка: 0.88</p>
        </div>
      </div>
      <Button
        className={s.button}
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Добавить нового пользователя
      </Button>
      <Modal
        title='Новый участник'
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        width='400px'
        footer={false}
        destroyOnClose={true}
      >
        <Form
          onFinish={onFinish}
          form={form}
          className={s.form}
          scrollToFirstError
          layout='vertical'
          autoComplete='off'
        >
          <div className={s.formInner}>
            <Form.Item
              name='name'
              className={s.formItem}
              rules={[{required: true, message: 'Введите ФИО'}]}
            >
              <Input
                className={s.input}
                placeholder='ФИО'
                size='large'
              />
            </Form.Item>
            <Form.Item
              name='post'
              className={s.formItem}
              rules={[{required: true, message: 'Введите должность'}]}
            >
              <Input
                className={s.input}
                placeholder='Должность'
                size='large'
              />
            </Form.Item>
            <Form.Item
              name='stage'
              className={s.formItem}
            >
              <Input
                className={s.input}
                placeholder='Ставка'
                size='large'
              />
            </Form.Item>
          </div>
          <div className={s.buttonWrapper}>
            <Button>
              Создать
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
