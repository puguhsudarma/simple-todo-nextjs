import { format } from 'date-fns';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button';
import CardTodo from '../components/cardTodo';
import TodoFormModal, { ModalOnSubmitProps } from '../components/TodoFormModal';
import {
  createTodoLogic,
  deleteTodoLogic,
  getTodosLogic,
  markAsDoneLogic,
  updateTodoLogic,
} from '../store/todo/todoLogic';
import { AppState, TodoBody } from '../types/todo.model';

type OrderByType = 'title' | 'user_name' | 'created_date';

const Main = () => {
  const dispatch = useDispatch();
  const modalRef = useRef<TodoFormModal>(null);
  const [orderBy, setOrderBy] = useState<OrderByType>('title');
  const [name, setName] = useState('Your Name');
  const todos = useSelector((state: AppState) => state.todo.todos);
  const [loadingMarkAsDone, setLoadingMarkAsDone] = useState(null); // loading selected item

  useEffect(() => {
    setName(localStorage.getItem('name') || 'Your Name');
  }, []);

  useEffect(() => {
    let unsubscribe: () => void | null = null;

    // listen to todo
    dispatch(
      getTodosLogic({
        orderBy,
        unsubscribe(ref) {
          unsubscribe = ref;
        },
      })
    );

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [orderBy]);

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
    (id: string, item: Pick<TodoBody, 'title' | 'description'>) => {
      modalRef.current.show('Update Todo', item, id);
    },
    [modalRef]
  );

  const onDeleteClick = useCallback(async (id: string) => {
    const confirmed = confirm('Are you sure to delete this todo?');
    if (confirmed) {
      setLoadingMarkAsDone(id);
      await dispatch(deleteTodoLogic(id));
      setLoadingMarkAsDone(null);
    }
  }, []);

  const onMarkDoneClick = useCallback(async (id: string) => {
    setLoadingMarkAsDone(id);
    await dispatch(markAsDoneLogic(id));
    setLoadingMarkAsDone(null);
  }, []);

  const onSubmitFormTodo = useCallback(
    async ({ values, id, cb }: ModalOnSubmitProps) => {
      // create todo
      if (!id) {
        await dispatch(
          createTodoLogic({
            title: values.title,
            description: values.description,
            userId: localStorage.getItem('uid'),
            userName: localStorage.getItem('name'),
            image: values.image,
          })
        );

        if (cb) {
          cb();
        }

        return 0;
      }

      // update todo
      await dispatch(
        updateTodoLogic({
          id: id,
          title: values.title,
          description: values.description,
          image: values.image,
        })
      );

      if (cb) {
        cb();
      }
    },
    [dispatch]
  );

  return (
    <div className="bg-gray-200 flex w-screen h-screen">
      <div className="container mx-auto px-4 md:px-0">
        <h1 className="text-4xl mt-10">{`Hi, ${name}`}</h1>

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
              <option value="user_name">Author</option>
              <option value="created_date">Time created</option>
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
          {todos.map((item) => {
            return (
              <CardTodo
                key={item.id}
                id={item.id}
                image={item.image}
                title={item.title}
                description={item.description}
                createdAt={format(new Date(), 'dd MMMM yyyy, hh:mm aa')}
                author={item.user_name}
                isDone={item.done}
                loading={item.id === loadingMarkAsDone}
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
