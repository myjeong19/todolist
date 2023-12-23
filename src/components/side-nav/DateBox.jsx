import classes from './css/DateBox.module.css';

export const DateBox = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return (
    <div className={classes.dateBox}>
      <strong>
        {year}.{month}.{day}
      </strong>
    </div>
  );
};
