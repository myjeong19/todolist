import { useState } from 'react';
import { supabase } from '../../supabaseClient';
import Swal from 'sweetalert2';
import { MdDelete } from 'react-icons/md';
import classes from './css/Tasks.module.css';

const handleSortList = (prev, next) => {
  const prevDate = prev.date;
  const nextDate = next.date;
  if (prevDate < nextDate) return 1;
  if (prevDate > nextDate) return -1;
  return 0;
};

export const Tasks = ({ tasks }) => {
  const [status, setStatus] = useState(false);

  const elementTasks = tasks.sort(handleSortList).map(todo => {
    const handleDeleteTasks = async () => {
      Swal.fire({
        title: '정말 삭제하시겠습니까?',
        text: '삭제하면 다시 복구할 수 없습니다.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelmButtonText: '취소',
        confirmButtonText: '네 삭제하겠습니다!',
      }).then(async result => {
        if (result.isConfirmed) {
          Swal.fire({
            title: '삭제 완료!',
            text: '정말 삭제하시겠습니까?',
            icon: 'success',
          });
          await supabase.from('todos').delete().eq('id', todo.id);
          setTimeout(() => location.reload(), 1000);
        }
      });
    };

    const updateTaskStatus = async () => {
      if (todo.status === 'Todo') {
        await supabase
          .from('todos')
          .update({ status: 'Doing' })
          .eq('id', todo.id, 'status', 'Todo')
          .select();
        setTimeout(() => location.reload(), 100);
      } else if (todo.status === 'Doing') {
        await supabase
          .from('todos')
          .update({ status: 'Done' })
          .eq('id', todo.id, 'status', 'Doing')
          .select();
        setTimeout(() => location.reload(), 100);
      }
    };

    return (
      <li className={classes.card} key={todo.id}>
        <div>
          <span>{todo.date}</span>
          <h3>{todo.title}</h3>
        </div>

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
