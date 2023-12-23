import { supabase } from '../../supabaseClient';
import classes from './css/Tasks.module.css';
import { MdDelete } from 'react-icons/md';

export const Tasks = ({ tasks }) => {
  const elementTasks = tasks.map(todo => {
    const handleDeleteTasks = async () =>
      await supabase.from('todos').delete().eq('id', todo.id);
    const updateTaskStatus = async () => {
      if (todo.status === 'Todo') {
        await supabase
          .from('todos')
          .update({ status: 'Doing' })
          .eq('id', todo.id, 'status', 'Todo')
          .select();
        return;
      } else if (todo.status === 'Doing') {
        await supabase
          .from('todos')
          .update({ status: 'Done' })
          .eq('id', todo.id, 'status', 'Doing')
          .select();
        return;
      }
    };

    return (
      <li className={classes.card} key={todo.id}>
        <h3>{todo.title}</h3>

        <div>
          <button onClick={updateTaskStatus}>{todo.status}</button>
          <button onClick={handleDeleteTasks}>
            <MdDelete />
          </button>
        </div>
      </li>
    );
  });

  return <>{elementTasks}</>;
};
