import classes from './css/List.module.css';
import { Tasks } from './Tasks';

export const List = ({ tasks }) => {
  return (
    <ul className={classes.list}>
      <Tasks tasks={tasks} />
    </ul>
  );
};
