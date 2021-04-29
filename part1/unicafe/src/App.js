import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Reviews = (props) => {
  return (
    <div>
      <p>{props.text} {props.state}</p>
    </div>
  )
}


const ReviewsAverage = (props) => {
  if(props.state.length > 0) {
    let average = props.state.reduce((a, b) => a + b, 0) / props.state.length
    return (
      <p>{props.text} {average}</p>
    )
  }
  return <p>{props.text} 0</p>
}


const PositiveReviews = (props) => {
  if(props.state.length > 0){
  let positives = props.state.filter(value => value === 1)
  let percentage = (positives.length * 100)/props.state.length
  return (
    <p>{props.text} {percentage}%</p>
  )}
  return <p>{props.text} 0%</p>
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allReviews, setAllReviews] = useState([])

  const goodReview = () => {
    setAllReviews(allReviews.concat(1))
    setGood(good + 1)
    console.log('added good', allReviews)
  }

  const neutralReview = () => {
    setAllReviews(allReviews.concat(0))
    setNeutral(neutral + 1)
    console.log('added neutral', allReviews)
}
  const badReview = () => {
    setAllReviews(allReviews.concat(-1))  
    setBad(bad + 1)
    console.log('added bad', allReviews)
 }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={goodReview} text="good"/>
      <Button handleClick={neutralReview} text="neutral"/>
      <Button handleClick={badReview} text="bad"/>
      <h1>statistics</h1>
      <Reviews state={good} text="good"/>
      <Reviews state={neutral} text="neutral"/>
      <Reviews state={bad} text="bad"/>
      <Reviews state={allReviews.length} text="all"/>
      <ReviewsAverage state={allReviews} text="average"/>
      <PositiveReviews state={allReviews} text="positive"/>
      <p></p>
    </div>
  )
}

export default App