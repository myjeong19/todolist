import { Main } from './components/main/Main';
import { Form } from './components/side-nav/Form';
import { DateBox } from './components/side-nav/DateBox';
import classes from './App.module.css';

function App() {
  return (
    <div className={classes.app}>
      <Main />
      <Form />
      <DateBox />
    </div>
  );
}

export default App;
