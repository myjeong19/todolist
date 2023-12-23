import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import Swal from 'sweetalert2';
import classes from './css/Form.module.css';

export const Form = () => {
  const [userValue, setUserValue] = useState('');
  const [userDate, setUserDate] = useState('');
  const handleUserValue = event => setUserValue(event.target.value);
  const handleUserDate = event => setUserDate(event.target.value);

  const handleSubmit = async event => {
    if (userValue.length > 0 && userDate) {
      const { data, error } = await supabase
        .from('todos')
        .insert([
          {
            title: event.target.title.value,
            status: 'Todo',
            date: event.target.date.value,
          },
        ])
        .select();
      setTimeout(() => location.reload(), 1000);
    }
    setUserValue('');
    setUserDate('');
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <input
        type='text'
        name='title'
        onChange={handleUserValue}
        value={userValue}
        placeholder='할 일을 입력해주세요.'
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
