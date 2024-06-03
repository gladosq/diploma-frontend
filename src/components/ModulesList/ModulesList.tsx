import s from './ModulesList.module.scss';
import {Link} from 'react-router-dom';
import Button from '../UI/Button/Button.tsx';
import {Form, Input, message, Modal, Select} from 'antd';
import {useEffect, useState} from 'react';
import {
  CreateModulePayload,
  fetchCreateModule,
  ModulesResponseType,
  useAllModules
} from '../../api/modules.ts';
import {useCookies} from 'react-cookie';
import {DifficultyEnum, RoleEnum} from '../../const/enum.ts';
import {useMutation, useQuery} from '@tanstack/react-query';
import {difficultyMapper} from '../../utils/mappers.ts';
import {SearchProps} from 'antd/es/input';
import {getNumericWord} from '../../utils/common.ts';
import {clsx} from 'clsx';
import {moduleThemes} from '../../store/moduleThemes.ts';

const {TextArea, Search} = Input;

export default function ModulesList() {
  const [modules, setModules] = useState<ModulesResponseType[]>([]);
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

  const {
    data,
    refetch,
    isSuccess,
    isFetching,
    isRefetching
  } = useAllModules({token: cookies['auth-data']});

  useEffect(() => {
    if (isSuccess) {
      setModules(data);
    }
  }, [isFetching, isRefetching]);

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

  const onSearch: SearchProps['onSearch'] = (value) => {

    if (!value) {
      if (isSuccess) setModules(data);
    } else {
      const filteredModules = modules.filter((item) => {
        return item.title.toLowerCase().includes(value.toLowerCase()) || item.theme.toLowerCase().includes(value.toLowerCase());
      });

      setModules(filteredModules);
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <h1>Выбрать модуль</h1>
        <Search
          placeholder='Введите для поиска'
          allowClear
          onSearch={onSearch}
          style={{width: 384}}
          className={s.searchInput}
        />
      </div>
      <ul className={s.list}>
        {modules?.sort((a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))).map((item) => {
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
                      <span
                        className={s.label}>{difficultyMapper[item.difficulty as DifficultyEnum]}</span>
                    </div>
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
              <Select
                className={s.themeSelect}
                showSearch
                style={{ width: 200 }}
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={moduleThemes}
                notFoundContent={<span style={{color: 'white'}}>Ничего не найдено</span>}
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
