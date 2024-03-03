import s from './ModulesList.module.scss';
import {Link} from 'react-router-dom';
import Button from '../UI/Button/Button.tsx';
import {Form, Input, message, Modal, Select} from 'antd';
import {useState} from 'react';
import {CreateModulePayload, fetchCreateModule, useAllModules} from '../../api/modules.ts';
import {useCookies} from 'react-cookie';
import {DifficultyEnum, RoleEnum} from '../../const/enum.ts';
import {useMutation, useQuery} from '@tanstack/react-query';
import {difficultyMapper} from '../../utils/mappers.ts';
import {SearchProps} from 'antd/es/input';
import {getNumericWord} from '../../utils/common.ts';
import {clsx} from 'clsx';

const {TextArea, Search} = Input;

export default function ModulesList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm<CreateModulePayload['data']>();
  const [cookies] = useCookies(['auth-data']);

  const {data: dataProfile} = useQuery<{ role: string }>({queryKey: ['my-profile']});
  const isModerator = dataProfile?.role === RoleEnum.Moderator;

  const {mutate, isPending} = useMutation({
    mutationFn: ({data, token}: CreateModulePayload) => {
      return fetchCreateModule({data, token});
    }
  });

  const {data, isFetching, refetch} = useAllModules({token: cookies['auth-data']});

  const onFinish = async (formValues: CreateModulePayload['data']) => {
    mutate(
      {
        data: formValues,
        token: cookies['auth-data']
      },
      {
        onSuccess: (res) => {
          message.info(`Модуль ${res.title} успешно создан`);
          setIsModalOpen(false);
          refetch();
        },
        onError: (err: any) => {
          message.info(err.message.message);
        }
      }
    );
  };

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <h1>Выбрать модуль</h1>
        <Search
          placeholder='Введите для поиска'
          allowClear
          onSearch={onSearch}
          style={{width: 304}}
          className={s.searchInput}
        />
      </div>
      <ul className={s.list}>
        {isFetching && <h1>preloader</h1>}
        {data?.map((item) => {
          console.log('item.difficulty:', item.difficulty);
          return (
            <li key={item.id} className={s.item}>
              <Link className={s.logoLink} to={`/module/${item.id}`}>
                <h2>{item.title}</h2>
                <p className={s.description}>{item.description}</p>
                <div
                  className={clsx(
                    s.info,
                    s?.[`info__difficulty_${item.difficulty}`]
                  )}
                >
                  <span className={s.theme}>{item.theme}</span>
                  <div className={s.infoInner}>
                    <div className={s.difficulty}>
                      <span className={s.label}>{difficultyMapper[item.difficulty as DifficultyEnum]}</span></div>
                    <span className={s.count}>
                      {item.testing.length} {getNumericWord(item.testing.length, ['вопрос', 'вопроса', 'вопросов'])}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      {isModerator && (
        <div className={s.moderateWrapper}>
          <Button onClick={() => setIsModalOpen(true)}>
            Создать новый модуль
          </Button>
        </div>
      )}
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
          initialValues={{difficulty: DifficultyEnum.Medium}}
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
                placeholder='Описание модуля'
                size='large'
                autoSize={{minRows: 4, maxRows: 4}}
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
                options={[
                  {value: DifficultyEnum.Hard, label: 'Высокая'},
                  {value: DifficultyEnum.Medium, label: 'Средняя'},
                  {value: DifficultyEnum.Easy, label: 'Легкая'}
                ]}
              />
            </Form.Item>
          </div>
          <div className={s.buttonWrapper}>
            <Button isLoading={isPending}>
              Создать
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
