import { useState } from "react";

const SectionHeading = ({ name }) => {
  return <h2>{name}</h2>;
};

const FeedbackButton = ({ name, onClick }) => {
  return <button onClick={onClick}>{name}</button>;
};

const StatisticLine = ({ name, value }) => {
  return (
    <>
      <td>{name}</td>
      <td>{value}</td>
    </>
  );
};

const Statistics = ({ good, neutral, bad, all }) => {
  // Computed values
  const average =
    all > 0 ? ((good * 1 + neutral * 0 + bad * -1) / all).toFixed(2) : "0.00";
  const positive = all > 0 ? ((good / all) * 100).toFixed(2) + "%" : "0.00";

  return (
    <table>
      <tbody>
        <tr>
          <StatisticLine name="Good" value={good} />
        </tr>
        <tr>
          <StatisticLine name="Neutral" value={neutral} />
        </tr>
        <tr>
          <StatisticLine name="Bad" value={bad} />
        </tr>
        <tr>
          <StatisticLine name="All" value={all} />
        </tr>
        <tr>
          <StatisticLine name="Average" value={average} />
        </tr>
        <tr>
          <StatisticLine name="Positive" value={positive} />
        </tr>
      </tbody>
    </table>
  );
};

/* MAIN COMPONENT */

const App = ({ values }) => {
  // Save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Computed values
  const all = good + neutral + bad;

  const handleGoodClick = () => {
    const newGoodCount = good + 1;
    setGood(newGoodCount);
  };
  const handleNeutralClick = () => {
    const newNeutralCount = neutral + 1;
    setNeutral(newNeutralCount);
  };
  const handleBadClick = () => {
    const newBadCount = bad + 1;
    setBad(newBadCount);
  };

  return (
    <div>
      <SectionHeading name="Give feedback" />
      <FeedbackButton name="Good" onClick={handleGoodClick} />
      <FeedbackButton name="Neutral" onClick={handleNeutralClick} />
      <FeedbackButton name="Bad" onClick={handleBadClick} />
      <SectionHeading name="Statistics" />
      {all > 0 ? (
        <Statistics good={good} neutral={neutral} bad={bad} all={all} />
      ) : (
        "No feedback given."
      )}
    </div>
  );
};

export default App;
