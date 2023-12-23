import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

import classes from './css/Main.module.css';

import { Header } from '../header/Header';
import { List } from './List';

export const Main = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All');

  const fetchDate = async () => {
    let { data: tasks } = await supabase.from('todos').select('*');

    if (selectedStatus === 'All') {
      setTasks(tasks);
    } else if (selectedStatus) {
      const statusTasks = tasks.filter(item => item.status === selectedStatus);
      setTasks(statusTasks);
    }
  };

  useEffect(() => {
    fetchDate();
  }, [selectedStatus]);

  return (
    <main className={classes.main}>
      <Header onSelectStatus={setSelectedStatus} />
      <List tasks={tasks} />
    </main>
  );
};
