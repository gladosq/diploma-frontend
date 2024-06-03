import s from './ModerateArticle.module.scss';
import Editor from '../../libs/Editor/Editor.tsx';
import Button from '../UI/Button/Button.tsx';
import {useMutation} from '@tanstack/react-query';
import {updateModuleFetcher, UpdateModulePayload, useModule} from '../../api/modules.ts';
import {useParams} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import {message} from 'antd';
import {useState} from 'react';

const EMPTY_CONTENT = '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

export default function ModerateArticle() {
  const [editorNodes, setEditorNodes] = useState();
  const changeEditorHandler = (e) => {
    setEditorNodes(e);
  };

  const [cookies] = useCookies(['auth-data']);
  const {moduleId} = useParams();

  const {data, isSuccess} = useModule({token: cookies['auth-data'], id: moduleId});

  const {mutate} = useMutation({
    mutationFn: ({data, token, id}: UpdateModulePayload) => {
      return updateModuleFetcher({data, token, id});
    }
  });

  return (
    <div className={s.wrapper}>
      <h1>Редактирование статьи «{data?.title}»</h1>
      <div className={s.rte}>
        <Editor onChangeEditor={changeEditorHandler} initialData={ Array.isArray(data?.article) ? EMPTY_CONTENT : data?.article}/>
      </div>
      <Button
        className={s.button}
        onClick={() => {
          const updatedModule = {
            ...data,
            article: editorNodes
          };

          mutate(
            {
              data: updatedModule as UpdateModulePayload['data'],
              token: cookies['auth-data'],
              id: moduleId!
            },
            {
              onSuccess: () => {
                message.info('Тест успешно сохранен');
              },
              onError: (err: any) => {
                message.info(err.message.message);
              }
            }
          );
        }}
      >
        Сохранить
      </Button>
    </div>
  );
}
