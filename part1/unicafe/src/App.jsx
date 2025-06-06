import { useState } from "react";

const Heading = ({ heading }) => {
  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
};

const Statistics = ({ total, average, positive }) => {
  return (
    <div>
      all {total}
      <br />
      average {average}
      <br />
      positive {positive} %
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const positive = good / total;
  const average = (good * 1 + bad * -1) / total;

  return (
    <div>
      <Heading heading="give feedback" />
      <button
        onClick={() => {
          setGood(good + 1);
          setTotal(total + 1);
        }}
      >
        good
      </button>
      <button
        onClick={() => {
          setNeutral(neutral + 1);
          setTotal(total + 1);
        }}
      >
        neutral
      </button>
      <button
        onClick={() => {
          setBad(bad + 1);
          setTotal(total + 1);
        }}
      >
        bad
      </button>
      <Heading heading="statistics" />
      <p>
        good {good}
        <br />
        neutral {neutral}
        <br />
        bad {bad}
        <br />
        <Statistics total={total} average={average} positive={positive}/>
      </p>
    </div>
  );
};

export default App;
