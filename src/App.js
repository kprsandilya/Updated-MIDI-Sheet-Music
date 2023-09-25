import logo from './logo.svg';
import './App.css';
import "./input.css";
import { useState } from 'react';

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <link href="/dist/output.css" rel="stylesheet"></link>
        <p class="text-blue-600">
          Yay! Test Worked!
        </p>
          Started learning React.
        < MyButton />
      </header>
    </div>
  );
}

export default App;
