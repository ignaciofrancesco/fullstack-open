import { useState } from "react";

const Display = ({ counter }) => {
  return <div>{counter}</div>;
};

const Button = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

const History = ({ allClicks }) => {
  return allClicks.length === 0 ? (
    <p>To start, press the buttons.</p>
  ) : (
    <p>History: {allClicks.join(" ")}</p>
  );
};

/// MAIN COMPONENT

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAllClicks] = useState([]);
  debugger;
  const handleClickLeft = () => {
    setLeft(left + 1);
    setAllClicks(allClicks.concat("L"));
  };
  const handleClickRight = () => {
    setRight(right + 1);
    setAllClicks(allClicks.concat("R"));
  };

  return (
    <>
      {left}
      <Button label="Left" onClick={handleClickLeft} />
      <Button label="Right" onClick={handleClickRight} />
      {right}
      <History allClicks={allClicks} />
    </>
  );
};

export default App;
