import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import Swal from 'sweetalert2';
import classes from './css/Form.module.css';

export const Form = () => {
  const [userValue, setUserValue] = useState('');
  const [userDate, setUserDate] = useState('');
  const handleUserValue = event => setUserValue(event.target.value);
  const handleUserDate = event => setUserDate(event.target.value);

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    setUserDate(`${year}-${month}-${day}`);
  }, []);

  const handleSubmit = async event => {
    if (userValue === '') {
      event.preventDefault();
      Swal.fire({
        icon: 'error',
        title: '입력 값이 비어있습니다.',
        text: '할 일을 입력해주세요.',
      });
    } else if (userDate === '') {
      event.preventDefault();
      Swal.fire({
        icon: 'error',
        title: '입력 값이 비어있습니다.',
        text: '날짜를 입력해주세요.',
      });
    } else {
      await supabase
        .from('todos')
        .insert([
          {
            title: userValue,
            status: 'Todo',
            date: userDate,
          },
        ])
        .select();
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <input
        type='text'
        name='title'
        onChange={handleUserValue}
        value={userValue}
        placeholder='할 일을 입력해주세요.'
        autoFocus
      />
      <input
        type='date'
        name='date'
        value={userDate}
        onChange={handleUserDate}
      />
      <button type='submit'>Add</button>
    </form>
  );
};
