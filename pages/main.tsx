import { ChangeEvent, useCallback, useRef, useState } from 'react';
import Button from '../components/Button';
import CardTodo from '../components/cardTodo';
import TodoFormModal, { ModalOnSubmitProps } from '../components/TodoFormModal';

type OrderByType = 'title' | 'author' | 'time';

const Main = () => {
  const modalRef = useRef<TodoFormModal>(null);
  const [orderBy, setOrderBy] = useState<OrderByType>('title');

  const onChangeOrderBy = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setOrderBy(e.target.value as OrderByType);
    },
    [orderBy]
  );

  const onCreateTodoClick = useCallback(() => {
    modalRef.current.show('Create Todo');
  }, [modalRef]);

  const onUpdateTodoClick = useCallback(
    (id: string) => {
      modalRef.current.show('Update Todo', {}, id);
    },
    [modalRef]
  );

  const onDeleteClick = useCallback(() => {}, []);

  const onMarkDoneClick = useCallback(() => {}, []);

  const onSubmitFormTodo = useCallback(({ values, id, cb }: ModalOnSubmitProps) => {
    setTimeout(() => {
      values;
      id;
      cb();
    }, 3000);
  }, []);

  return (
    <div className="bg-gray-200 flex w-screen h-screen">
      <div className="container mx-auto px-4 md:px-0">
        <h1 className="text-4xl mt-10">{'Hi, Reroet'}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-4">
          <div>
            <label htmlFor="order_by" className="font-bold mr-4">
              Order by:
            </label>
            <select
              onChange={onChangeOrderBy}
              value={orderBy}
              name="order_by"
              className="px-4 rounded-md w-full mt-1 md:mt-0 md:w-64"
            >
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="time">Time created</option>
            </select>
          </div>

          <div>
            <Button
              className="md:w-1/3 float-right"
              label="Create a Todo"
              type="button"
              onClick={onCreateTodoClick}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
          {[0, 1, 2, 3, 4, 5].map((item) => {
            return (
              <CardTodo
                key={item}
                id={'${item}'}
                image={
                  'https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2021/02/15/1844222189.jpg'
                }
                title={'This is long long text hahah ah ha ahha'}
                description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit'}
                createdAt={'02 March 2020, 02:00 PM'}
                author={'Reroet'}
                isDone={true}
                onMarkDoneClick={onMarkDoneClick}
                onEditClick={onUpdateTodoClick}
                onDeleteClick={onDeleteClick}
              />
            );
          })}
        </div>
      </div>

      <TodoFormModal ref={modalRef} onSubmit={onSubmitFormTodo} />
    </div>
  );
};

export default Main;
