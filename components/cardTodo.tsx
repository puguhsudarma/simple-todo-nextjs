import { AiFillDelete, AiFillEdit, AiOutlineClockCircle, AiOutlineUser } from 'react-icons/ai';
import { TodoBody } from '../types/todo.model';
import Button from './Button';

interface Props {
  id: string;
  image: string;
  title: string;
  description: string;
  createdAt: string;
  author: string;
  isDone: boolean;
  onMarkDoneClick(id: string): void;
  onEditClick(id: string, item: Pick<TodoBody, 'title' | 'description'>): void;
  onDeleteClick(id: string): void;
  loading?: boolean;
}

const CardTodo = (props: Props) => {
  return (
    <div className="bg-gray-50 px-4 py-4 rounded-md shadow">
      <div className="grid grid-cols-4">
        <div>
          <img src={props.image} alt={props.title} className="w-16 h-16 rounded-full" />
        </div>

        <div className="col-span-2">
          <h1 className="font-bold text-lg">{props.title}</h1>
          <p>{props.description}</p>

          <Button
            label={props.isDone ? 'Done' : 'Mark as done'}
            type="button"
            onClick={() => props.onMarkDoneClick(props.id)}
            disabled={props.isDone}
            className="mt-4"
            loading={props.loading}
          />
        </div>

        <div className="flex justify-end self-start">
          <button
            disabled={props.isDone}
            onClick={() =>
              props.onEditClick(props.id, { title: props.title, description: props.description })
            }
            className="focus:outline-none mr-4"
          >
            <AiFillEdit className="text-green-800 text-2xl" />
          </button>

          <button onClick={() => props.onDeleteClick(props.id)} className="focus:outline-none">
            <AiFillDelete className="text-red-800 text-2xl" />
          </button>
        </div>
      </div>

      <div className="mt-4">
        <div className="space-x-2 text-gray-500">
          <AiOutlineClockCircle className="inline mb-1 text-sm" />
          <p className="inline text-sm font-medium">{props.createdAt}</p>
        </div>
        <div className="space-x-2 text-gray-500">
          <AiOutlineUser className="inline mb-1 text-sm" />
          <p className="inline text-sm font-medium">{props.author}</p>
        </div>
      </div>
    </div>
  );
};

export default CardTodo;
