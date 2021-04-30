import React, { useState } from "react";

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const handleRandomAnecdote = () => {
    setSelected(Math.floor(Math.random() * (anecdotes.length - 1)));
  };

  const handleVote = () => {
    const votelist = [...votes];
    votelist[selected] += 1;
    setVotes(votelist);
  };

  const mostVotes = () => {
    return votes.indexOf(Math.max(...votes));
  };

  if (votes[mostVotes()] === 0) {
    return (
      <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
        <br />
        <Button onClick={handleVote} text="vote" />
        <Button onClick={handleRandomAnecdote} text="next anecdote" />

        <h1>Anecdote with most votes</h1>
        <p>no votes given</p>
      </div>
    );
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <br />
      <Button onClick={handleVote} text="vote" />
      <Button onClick={handleRandomAnecdote} text="next anecdote" />

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVotes()]}</p>
      <p>has {votes[mostVotes()]} votes</p>
    </div>
  );
};

export default App;
