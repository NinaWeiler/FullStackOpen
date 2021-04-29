import React, { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};


const ReviewsAverage = (props) => {
  if (props.value.length > 0) {
    let average = props.value.reduce((a, b) => a + b, 0) / props.value.length;
    return (
      <table>
        <tbody>
          <tr>
            <td width="60px">
            {props.text}
            </td>
            <td>
            {average}
            </td>
          </tr>
        </tbody>
      </table>
      
    );
  }
  return <p>{props.text} 0</p>;
};

const PositiveReviews = (props) => {
  if (props.value.length > 0) {
    let positives = props.value.filter((value) => value === 1);
    let percentage = (positives.length * 100) / props.value.length;
    return (
      <table>
        <tbody>
          <tr>
            <td width="60px">
            {props.text}
            </td>
            <td>
            {percentage}%
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
  return <p>{props.text} 0%</p>;
};

const Statistic = ({text, value}) => {
  return (
    <table>
      <tbody>
     <tr>
      <td width="60px">
      {text}
      </td>
      <td>
      {value}
      </td>
      </tr>  
      </tbody> 
    </table>
   
  );
}

const Statistics = (props) => {
  if (props.allReviews.length > 0) {
    return (
      <div>
        <h1>statistics</h1>
        <Statistic value={props.good} text="good" />
        <Statistic value={props.neutral} text="neutral" />
        <Statistic value={props.bad} text="bad" />
        <Statistic value={props.allReviews.length} text="all" />
        <ReviewsAverage value={props.allReviews} text="average" />
        <PositiveReviews value={props.allReviews} text="positive" />
      </div>
    );
  }
  return (
    <div>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allReviews, setAllReviews] = useState([]);

  const goodReview = () => {
    setAllReviews(allReviews.concat(1));
    setGood(good + 1);
  };

  const neutralReview = () => {
    setAllReviews(allReviews.concat(0));
    setNeutral(neutral + 1);
    
  };
  const badReview = () => {
    setAllReviews(allReviews.concat(-1));
    setBad(bad + 1)
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={goodReview} text="good" />
      <Button handleClick={neutralReview} text="neutral" />
      <Button handleClick={badReview} text="bad" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        allReviews={allReviews}
      />

      <p></p>
    </div>
  );
};

export default App;
