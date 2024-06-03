import s from './ModerateTest.module.scss';
import {Form, Input, message, Radio, Upload, UploadProps} from 'antd';
import Button from '../UI/Button/Button.tsx';
import {useMutation} from '@tanstack/react-query';
import {
  updateModuleFetcher,
  UpdateModulePayload,
  useModule
} from '../../api/modules.ts';
import {useCookies} from 'react-cookie';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {encodeImageFileAsURL, getBase64} from '../../utils/image.ts';

const {TextArea} = Input;

type QuestionType = {
  question: string;
  variant1: string;
  variant2: string;
  variant3: string;
  variant4: string;
  correctAnswer: string;
}

type FormType = {
  questions: QuestionType[];
}

const props: UploadProps = {
  name: 'file',
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  // beforeUpload(file) {
  //   return new Promise((resolve) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       const img = document.createElement('img');
  //       img.src = reader.result as string;
  //       img.onload = () => {
  //         const canvas = document.createElement('canvas');
  //         canvas.width = img.naturalWidth;
  //         canvas.height = img.naturalHeight;
  //         const ctx = canvas.getContext('2d')!;
  //         ctx.drawImage(img, 0, 0);
  //         ctx.fillStyle = 'red';
  //         ctx.textBaseline = 'middle';
  //         ctx.font = '33px Arial';
  //         ctx.fillText('Ant Design', 20, 20);
  //         canvas.toBlob((result) => resolve(result as any));
  //       };
  //     };
  //
  //     return 'pepega';
  //   });
  // },
};

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function ModerateTest() {
  const [form] = Form.useForm();
  const [cookies] = useCookies(['auth-data']);
  const {moduleId} = useParams();

  const {data, isSuccess} = useModule({token: cookies['auth-data'], id: moduleId});

  const {mutate} = useMutation({
    mutationFn: ({data, token, id}: UpdateModulePayload) => {
      return updateModuleFetcher({data, token, id});
    }});

  const onFinish = async (formValues: FormType) => {

    // const updatedTesting = formValues.questions.reduce((acc, current) => {
    //   let itemValue = {...current};
    //
    //   if (current.picture) {
    //     let idCardBase64 = '';
    //     getBase64(current.picture[0].originFileObj, (result) => {
    //       idCardBase64 = result;
    //     });
    //   } else {
    //     itemValue = {...itemValue, picture: null};
    //   }
    //
    //   acc.push(itemValue);
    //   return acc;
    // }, []);


    // let itemsTesting = [];
    //
    // await getBase64(formValues.questions[0].picture[0].originFileObj) // `file` your img file
    //   .then(res => {
    //     console.log('res:', res);
    //     itemsTesting.push(res);
    //   }) // `res` base64 of img file
    //   .catch(err => console.log(err))
    //
    // console.log('itemsTesting:', itemsTesting);

    // console.log('updatedTesting:', updatedTesting);


    const updatedModule = {...data, testing: formValues.questions};


    mutate(
      {data: updatedModule as UpdateModulePayload['data'], token: cookies['auth-data'], id: moduleId!},
      {
        onSuccess: () => {
          message.info('Тест успешно сохранен');
        },
        onError: (err: any) => {
          message.info(err.message.message);
        }
      }
    );
  };

  useEffect(() => {
    if (isSuccess) {
      form.setFieldsValue({questions: data.testing.length ? data.testing : ['']});
    }
  }, [form, isSuccess])

  return (
    <div className={s.wrapper}>
      <h1>Редактирование теста</h1>
      <div className={s.form}>
        <Form
          onFinish={onFinish}
          form={form}
          scrollToFirstError
          layout='vertical'
          initialValues={{questions: []}}
          autoComplete='off'
        >
          <Form.List name='questions'>
            {(fields, {add, remove}) => (
              <>
                {fields.map(({key, name, ...restField}) => (
                  <div key={key}>
                    <div className={s.formRowContainer}>
                      <div className={s.innerWrapper}>
                        <div className={s.questionContainer}>
                          <span className={s.questionNumber}>{key + 1}</span>
                          <Form.Item
                            {...restField}
                            name={[name, 'question']}
                            className={s.formItemQuestion}
                            rules={[{required: true, message: 'Введите текст вопроса'}]}
                          >
                            <TextArea placeholder='Текст вопроса' style={{resize: 'none'}}/>
                          </Form.Item>
                        </div>
                        <div className={s.container}>
                          <div className={s.shuffleContainer}>
                            <div className={s.variantContainer}>
                              <Form.Item
                                {...restField}
                                name={[name, 'variant1']}
                                className={s.formItemVariant}
                                rules={[{required: true, message: 'Заполните поле'}]}
                              >
                                <Input
                                  className={s.input}
                                  placeholder='Введите ответ'
                                  size='large'
                                />
                              </Form.Item>
                              <span className={s.variantCaption}>1</span>
                            </div>
                            <div className={s.variantContainer}>
                              <Form.Item
                                {...restField}
                                name={[name, 'variant2']}
                                className={s.formItemVariant}
                                rules={[{required: true, message: 'Заполните поле'}]}
                              >
                                <Input
                                  className={s.input}
                                  placeholder='Введите ответ'
                                  size='large'
                                />
                              </Form.Item>
                              <span className={s.variantCaption}>2</span>
                            </div>
                            <div className={s.variantContainer}>
                              <Form.Item
                                {...restField}
                                name={[name, 'variant3']}
                                className={s.formItemVariant}
                                rules={[{required: true, message: 'Заполните поле'}]}
                              >
                                <Input
                                  className={s.input}
                                  placeholder='Введите ответ'
                                  size='large'
                                />
                              </Form.Item>
                              <span className={s.variantCaption}>3</span>
                            </div>

                            <div className={s.variantContainer}>
                              <Form.Item
                                {...restField}
                                name={[name, 'variant4']}
                                className={s.formItemVariant}
                                rules={[{required: true, message: 'Заполните поле'}]}
                              >
                                <Input
                                  className={s.input}
                                  placeholder='Введите ответ'
                                  size='large'
                                />
                              </Form.Item>
                              <span className={s.variantCaption}>4</span>
                            </div>
                          </div>
                          <div className={s.buttonsWrapper}>
                            <div className={s.radioWrapper}>
                              <Form.Item
                                {...restField}
                                name={[name, 'correctAnswer']}
                                valuePropName="value"
                                className={s.formItemSelect}
                              >
                                <Radio.Group defaultValue={"1"} value={"1"}>
                                  <Radio.Button value="1">1</Radio.Button>
                                  <Radio.Button value="2">2</Radio.Button>
                                  <Radio.Button value="3">3</Radio.Button>
                                  <Radio.Button value="4">4</Radio.Button>
                                </Radio.Group>
                              </Form.Item>
                              <span className={s.radioCorrectTitle}>Правильный ответ</span>
                            </div>
                            <Button onClick={() => remove(name)} viewType={'red'}>
                              Удалить
                            </Button>
                            <div className={s.uploadImageContainer}>
                              <Form.Item
                                {...restField}
                                name={[name, 'picture']}
                                className={s.formItemSelect}
                                valuePropName='fileList'
                                getValueFromEvent={normFile}
                              >
                                <Upload
                                  maxCount={1}
                                  customRequest={({onSuccess}) =>
                                    setTimeout(() => {
                                      // @ts-ignore
                                      onSuccess('ok', null);
                                    }, 0)
                                  }
                                  // beforeUpload={() => false}
                                >
                                  <Button type={'button'} viewType={'secondary'} className={s.addPicture}>
                                    Прикрепить изображение
                                  </Button>
                                </Upload>
                              </Form.Item>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className={s.formItemAddButton}>
                  <Button type={'submit'}>Сохранить</Button>
                  <Button
                    type='button'
                    className={s.addButton}
                    viewType={'secondary'}
                    onClick={() => add()}
                  >
                    Добавить вопрос
                  </Button>
                </div>
              </>
            )}
          </Form.List>
        </Form>
      </div>
    </div>
  );
}
