import s from './ModuleDetails.module.scss';
import Button from '../UI/Button/Button.tsx';
import {useNavigate, useParams} from 'react-router-dom';
import {
  fetchDeleteModule, ModulesResponseType,
  updateModuleFetcher,
  UpdateModulePayload,
  useModule
} from '../../api/modules.ts';
import {Cookies, useCookies} from 'react-cookie';
import {DifficultyEnum, RoleEnum} from '../../const/enum.ts';
import {useEffect, useMemo, useState} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {clsx} from 'clsx';
import {Form, Input, message, Modal, Popover, Select} from 'antd';
import dayjs from 'dayjs';

const requiredFormRule = {required: true, message: 'Заполните поле'};
const {TextArea} = Input;

export default function ModuleDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenPopover, setIsOpenPopover] = useState(false);

  const history = useNavigate();
  const [cookies] = useCookies(['auth-data']);
  const {moduleId} = useParams();
  const [form] = Form.useForm();

  const {data: dataProfile, isSuccess} = useQuery<{ role: string }>({queryKey: ['my-profile']});
  const {data, isSuccess: isSuccessModule, isFetching: isFetchingModule, isError, error, refetch} = useModule({
    token: cookies['auth-data'],
    id: moduleId
  });

  useEffect(() => {
    if (isError) {
      message.error(error.message);
      history('/');
    }
  }, [isError]);

  const {refetch: refetchModules} = useQuery<{ role: string }>({queryKey: ['modules']});

  const isModerator = useMemo(() => dataProfile?.role === RoleEnum.Moderator, [isSuccess]);

  const {mutate} = useMutation({
    mutationFn: ({data, token, id}: UpdateModulePayload) => {
      return updateModuleFetcher({data, token, id});
    }
  });

  const {mutate: mutateDelete} = useMutation({
    mutationFn: ({token, id}: { token: Cookies, id: string }) => {
      return fetchDeleteModule({token, id});
    }
  });

  const onFinish = async (formValues: any) => {
    const updatedModule = {...data, ...formValues};

    mutate(
      {data: updatedModule, token: cookies['auth-data'], id: moduleId!},
      {
        onSuccess: () => {
          message.info('Модуль обновлен');
          refetch();
          setIsModalOpen(false);
        },
        onError: (err: any) => {
          message.info(err.message.message);
        }
      }
    );
  };

  useEffect(() => {
    if (isSuccessModule) {
      form.setFieldsValue({
        title: data?.title,
        description: data?.description,
        theme: data?.theme,
        difficulty: data?.difficulty
      });
    }
  }, [form, isSuccess, isFetchingModule]);

  const popoverContent = () => {
    return (
      <div className={s.popoverButtons}>
        <Button viewType={'red'} onClick={deleteModuleHandler}>ОК</Button>
        <Button viewType={'secondary'} onClick={() => setIsOpenPopover(false)}>Отмена</Button>
      </div>
    );
  };

  const deleteModuleHandler = () => {
    mutateDelete(
      {token: cookies['auth-data'], id: moduleId!},
      {
        onSuccess: () => {
          message.success('Модуль удален');
          refetchModules();
          history('/moderate');
          setIsOpenPopover(false);
        },
        onError: (err: any) => {
          message.info(err.message.message);
        }
      }
    );
  };

  return (
    <div className={s.wrapper}>
      {dataProfile?.role === RoleEnum.Moderator && (
        <div className={s.moderateWrapper}>
          <h2>{data?.title}</h2>
          <h3 className={s.description}>{data?.description}</h3>
          <h3 className={s.theme}>{data?.theme}</h3>
          <span className={clsx(s.status, data?.isPublished && s.statusPublished)}>
            {data?.isPublished ? 'Опубликовано' : 'Снято с публикации'}
          </span>
          <div className={s.moderateInner}>
            <Button
              className={s.publishButton}
              viewType={data?.isPublished ? 'red' : 'primary'}
              onClick={() => {
                if (data) {
                  const updatedData: ModulesResponseType = {...data, isPublished: !data?.isPublished};

                  mutate(
                    {data: updatedData, token: cookies['auth-data'], id: moduleId!},
                    {
                      onSuccess: () => {
                        message.info('Модуль обновлен');
                        refetch();
                        setIsModalOpen(false);
                      },
                      onError: (err: any) => {
                        message.info(err.message.message);
                      }
                    }
                  );
                }
              }}
            >
              {!data?.isPublished ? 'Опубликовать' : 'Снять с публикации'}
            </Button>
            <Button viewType={'secondary'} className={s.publishButton} onClick={() => setIsModalOpen(true)}>
              Редактировать
            </Button>
            <Popover
              content={popoverContent}
              title='Удалить модуль?'
              trigger='click'
              open={isOpenPopover}
            >
              <Button viewType={'red'} onClick={() => setIsOpenPopover(true)}>
                Удалить
              </Button>
            </Popover>
            <div className={s.info}>
              <p>Создано: {dayjs(data?.updatedAt).format('DD.MM.YY')}</p>
              <p>Отредактировано: {dayjs(data?.createdAt).format('DD.MM.YY')}</p>
            </div>
          </div>
        </div>
      )}
      <div className={s.container}>
        <h2 className={s.title}>Материал</h2>
        <div className={s.content}>
          {!!data?.article.length ? data.article : (<span className={s.emptyData}>не заполнено</span>)}
        </div>
        <Button
          className={s.button}
          onClick={() => history(!isModerator ? `/module/${moduleId}/article` : '/moderate/1/article')}
        >
          {isModerator ? 'Редактировать статью' : 'Изучить материал'}
        </Button>
      </div>
      <div className={s.container}>
        <h2 className={s.title}>Тестирование</h2>
        <div className={s.content}>
          Сложность теста: средняя<br/>
          Вопросов: 12<br/>
        </div>
        <Button
          className={s.button}
          onClick={() => history(!isModerator ? `/module/${moduleId}/test` : `/moderate/${moduleId}/test`)}
        >
          {isModerator ? 'Редактировать тест' : 'Пройти тестирование'}
        </Button>
      </div>
      <Modal
        title='Редактировать модуль'
        width='550px'
        footer={false}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        closeIcon={false}
        centered={true}
        destroyOnClose
        forceRender
      >
        <Form
          onFinish={onFinish}
          form={form}
          className={s.form}
          scrollToFirstError
          layout='vertical'
          autoComplete='off'
        >
          <Form.Item name='title' className={s.formItem} rules={[requiredFormRule]}>
            <Input className={s.input} placeholder='Название модуля' size='large'/>
          </Form.Item>
          <Form.Item name='description' className={s.formItem} rules={[requiredFormRule]}>
            <TextArea
              className={s.input}
              placeholder='Описание модуля'
              size='large'
              autoSize={{minRows: 4, maxRows: 4.8}}
            />
          </Form.Item>
          <Form.Item name='theme' className={s.formItem} rules={[requiredFormRule]}>
            <Input className={s.input} placeholder='Раздел' size='large'/>
          </Form.Item>
          <Form.Item name='difficulty' className={s.formItem}>
            <Select
              options={[
                {value: DifficultyEnum.Hard, label: 'Высокая'},
                {value: DifficultyEnum.Medium, label: 'Средняя'},
                {value: DifficultyEnum.Easy, label: 'Легкая'}
              ]}
            />
          </Form.Item>
          <div className={s.modalButtons}>
            <Button type={'submit'}>Сохранить</Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
