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

  console.log(userDate);

  const handleSubmit = async event => {
    setUserValue(event.target.title.value);
    setUserDate(event.target.date.value);

    if (userValue === '') {
      alert('할 일이 비어있습니다.');
    }

    if (userDate === '') {
      alert('날씨 값이 비어있습니다.');
    }

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
