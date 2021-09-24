import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleVote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch()


  const vote = (id) => {
    console.log("vote", id);
    dispatch(toggleVote(id));
  };
  const orderedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);

  return (
    <div>
      {orderedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
