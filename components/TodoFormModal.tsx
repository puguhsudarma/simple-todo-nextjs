import { Formik } from 'formik';
import React from 'react';
import Modal from 'react-modal';
import * as yup from 'yup';
import { TodoBody } from '../types/todo.model';
import Button from './Button';
import Input from './Form';

export interface ModalOnSubmitProps {
  values: Pick<TodoBody, 'title' | 'description' | 'image'>;
  id?: string;
  cb: () => void;
}

interface Props {
  onSubmit(props: ModalOnSubmitProps): void;
}

interface States {
  visible: boolean;
  title: string;
  data?: Pick<TodoBody, 'title' | 'description'>;
  id?: string;
  loading: boolean;
}

class TodoFormModal extends React.PureComponent<Props, States> {
  constructor(props: Props) {
    super(props);

    this.state = {
      visible: false,
      title: 'Todo Form',
      loading: false,
    };

    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  public show(title: string, data?: Pick<TodoBody, 'title' | 'description'>, id?: string) {
    this.setState({
      visible: true,
      title,
      data,
      id,
    });
  }

  public close() {
    this.setState({
      visible: false,
      loading: false,
    });
  }

  _onSubmit(values: Pick<TodoBody, 'title' | 'description' | 'image'>) {
    const { id } = this.state;
    this.setState({ loading: true });
    this.props.onSubmit({ values, id, cb: this.close });
  }

  render() {
    const { visible, loading, title, data } = this.state;

    return (
      <Modal
        isOpen={visible}
        onRequestClose={this.close}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.75)',
          },
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderWidth: 0,
            padding: 0,
            borderRadius: 0,
            backgroundColor: 'transparent',
            overflow: 'hidden',
          },
        }}
      >
        <div className="bg-gray-100 shadow rounded-md p-10">
          <h1 className="text-2xl mb-8">{title}</h1>
          <Formik
            initialValues={{
              title: data?.title || '',
              description: data?.description || '',
              image: null as File | null,
            }}
            validationSchema={yup.object().shape({
              title: yup.string().required('Title todo is required.'),
              description: yup.string().required('Description todo is required.'),
            })}
            onSubmit={this._onSubmit}
          >
            {({ values, handleChange, handleSubmit, setFieldValue, errors }) => (
              <form onSubmit={handleSubmit} method="POST">
                <Input
                  label="Title"
                  type="text"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  error={errors.title as any}
                />
                <div className="h-4" />
                <Input
                  label="Description"
                  type="text"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  error={errors.description as any}
                />
                <div className="h-4" />
                <Input
                  label="Image"
                  type="file"
                  name="image"
                  onChange={(e) => setFieldValue('image', e.target.files[0])}
                  accept="image/png, image/jpeg, image/jpg"
                  className="appearance-none focus:outline-none shadow-md border p-2 w-full font-light text-sm bg-white"
                />
                <Button label="Submit" type="submit" loading={loading} className="mt-10" />
              </form>
            )}
          </Formik>
        </div>
      </Modal>
    );
  }
}

export default TodoFormModal;
