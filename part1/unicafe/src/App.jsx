import { useState } from "react";

const Heading = ({ heading }) => {
  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Heading heading="give feedback" />
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Heading heading="statistics" />
      <p>
        good {good}
        <br />
        neutral {neutral}
        <br />
        bad {bad}
      </p>
    </div>
  );
};

export default App;
