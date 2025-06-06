import { useState } from "react";

const Heading = ({ heading }) => {
  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
};

const Statistics = ({ good, neutral, bad, total }) => {
  const positive = (good / total) * 100;
  const average = (good * 1 + bad * -1) / total;

  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <table>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} specialchar="%" />
      </table>
    </div>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, value, specialchar = "" }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}{specialchar}</td>
    </tr>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
    setTotal(total + 1);
  };
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1);
  };
  const handleBadClick = () => {
    setBad(bad + 1);
    setTotal(total + 1);
  };
  return (
    <div>
      <Heading heading="give feedback" />
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <Heading heading="statistics" />
      <p>
        <Statistics good={good} neutral={neutral} bad={bad} total={total} />
      </p>
    </div>
  );
};

export default App;
