import s from './ModulesList.module.scss';
import {Link} from 'react-router-dom';
import Button from '../UI/Button/Button.tsx';
import {Form, Input, message, Modal, Select} from 'antd';
import {useState} from 'react';
import {CreateModulePayload, fetchCreateModule, useAllModules} from '../../api/modules.ts';
import {useCookies} from 'react-cookie';
import {DifficultyType} from '../../const/enum.ts';
import {useMutation} from '@tanstack/react-query';
import {difficultyMapper} from '../../utils/mappers.ts';

const {TextArea} = Input;

export default function ModulesList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies(['auth-data']);

  const [form] = Form.useForm<CreateModulePayload['module']>();

  const onFinish = async (formValues: CreateModulePayload['module']) => {
    console.log('formValues:', formValues);

    mutate(
      {
        module: {
          ...formValues,
          difficulty: formValues.difficulty.value
        },
        token: cookies['auth-data']
        },
      {
        onSuccess: (res) => {
          console.log('res:', res);
          message.info(`Модуль ${res.title} успешно создан`);
          refetch();
          setIsModalOpen(false);
        },
        onError: (err: any) => {
          console.log('err:', err);
          message.info(err.message.message);
        }
      }
    )
  };

  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
  };

  const {data, isFetching, refetch} = useAllModules({token: cookies['auth-data']});

  const {mutate, isPending} = useMutation({
    mutationFn: (values: CreateModulePayload) => {
      return fetchCreateModule(values);
    }
  });

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <h1>Выбрать модуль</h1>
        <input type='text' placeholder='Поиск модуля'/>
      </div>
      <ul className={s.list}>
        {isFetching && <h1>preloader</h1>}
        {data?.map((item) => {
          return (
            <li key={item.id} className={s.item}>
              <Link className={s.logoLink} to={'/module/1'}>
                <h2>{item.title}</h2>
                <p className={s.description}>{item.description}</p>
                <div className={s.info}>
                  <span className={s.theme}>{item.theme}</span>
                  <div className={s.infoInner}>
                    <div className={s.difficulty}>
                      <span>Сложность:</span>
                      <span className={s.label}>{difficultyMapper[item.difficulty as DifficultyType]}</span></div>
                    <span className={s.count}>12 вопросов</span>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className={s.moderateWrapper}>
        <Button
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Создать новый модуль
        </Button>
      </div>
      <Modal
        title='Создание нового модуля'
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        width='500px'
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
              name='title'
              className={s.formItem}
              rules={[{required: true, message: 'Введите название модуля'}]}
            >
              <Input
                className={s.input}
                placeholder='Название модуля'
                size='large'
              />
            </Form.Item>
            <Form.Item
              name='description'
              className={s.formItem}
              rules={[{required: true, message: 'Введите описание модуля'}]}
            >
              <TextArea
                className={s.input}
                placeholder='Название модуля'
                size='large'
                autoSize={{ minRows: 4, maxRows: 4 }}

              />
            </Form.Item>
            <Form.Item
              name='theme'
              className={s.formItem}
              rules={[{required: true, message: 'Укажите раздел'}]}
            >
              <Input
                className={s.input}
                placeholder='Раздел'
                size='large'
              />
            </Form.Item>
            <Form.Item
              name='difficulty'
              className={s.formItem}
            >
              <Select
                labelInValue
                defaultValue={{value: DifficultyType.Medium, label: 'Средняя'}}
                onChange={handleChange}
                options={[
                  {
                    value: DifficultyType.Hard,
                    label: 'Сложная',
                  },
                  {
                    value: DifficultyType.Medium,
                    label: 'Средняя',
                  },
                  {
                    value: DifficultyType.Easy,
                    label: 'Легкая',
                  },
                ]}
              />
            </Form.Item>
          </div>
          <div className={s.buttonWrapper}>
            <Button
              isLoading={isPending}
            >
              Создать
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
