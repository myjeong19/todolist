import { useState } from 'react';
import classes from './css/Header.module.css';

export const Header = ({ onSelectStatus }) => {
  const [focus, setFocus] = useState('fasle');

  const handleFilter = event => {
    onSelectStatus(event.target.value);
  };

  return (
    <header className={classes.header}>
      <button onClick={handleFilter} value={'All'}>
        All
      </button>
      <button onClick={handleFilter} value={'Todo'}>
        Todo
      </button>
      <button onClick={handleFilter} value={'Doing'}>
        Doing
      </button>
      <button onClick={handleFilter} value={'Done'}>
        Done
      </button>
    </header>
  );
};
