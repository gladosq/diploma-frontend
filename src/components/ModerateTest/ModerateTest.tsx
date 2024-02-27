import s from './ModerateTest.module.scss';
import {Form, Input, Radio} from 'antd';
import Button from '../UI/Button/Button.tsx';

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

export default function ModerateTest() {
  const [form] = Form.useForm();

  const onFinish = async (formValues: FormType) => {
    console.log('formValues:', formValues);

    const withFormattedRadio = formValues.questions.map((item) => {
      if (!item.correctAnswer) {
        item.correctAnswer = "1";
      }
      return;
    });

    console.log('withFormattedRadio:', withFormattedRadio);
  };

  return (
    <div className={s.wrapper}>
      <h1>Редактирование теста</h1>
      <div className={s.form}>
        <Form
          onFinish={onFinish}
          form={form}
          scrollToFirstError
          layout='vertical'
          initialValues={{questions: ['']}}
          autoComplete='off'
        >
          <Form.List name='questions'>
            {(fields, {add, remove}) => (
              <>
                {fields.map(({key, name, ...restField}) => (
                  <div key={key}>
                    <div className={s.questionTitleWrapper}>
                      {/*<h3>Вопрос №{key + 1}</h3>*/}

                    </div>
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
                            <TextArea
                              placeholder='Текст вопроса'
                              style={{resize: 'none'}}
                            />
                          </Form.Item>
                        </div>
                        <div className={s.container}>
                          <div className={s.shuffleContainer}>
                            <div className={s.variantContainer}>
                              <Form.Item
                                {...restField}
                                name={[name, 'variant1']}
                                className={s.formItemVariant}
                                rules={[{required: false}]}
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
                                rules={[{required: false}]}
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
                                rules={[{required: false}]}
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
                                rules={[{required: false}]}
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
                              <span className={s.radioCorrectTitle}>Правильный ответ:</span>
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
                            </div>
                            <Button
                              onClick={() => remove(name)}
                              viewType={'red'}
                            >
                              Удалить
                            </Button>
                            <div className={s.uploadImageContainer}>
                              <Button
                                viewType={'secondary'}
                              >
                                Прикрепить изображение
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className={s.formItemAddButton}>
                  <Button
                    onClick={() => {
                      form.submit();
                    }}
                  >
                    Сохранить
                  </Button>
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
