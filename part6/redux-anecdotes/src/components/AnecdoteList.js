import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleVote } from "../reducers/anecdoteReducer";
import { showNotificationWithTimeOut } from "../reducers/notificationReducer";


const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch()


  const vote = (id, content) => {
    console.log("vote", id);
    dispatch(toggleVote(id));
    dispatch(showNotificationWithTimeOut(`You voted for "${content}"`, 5))
  };

  const orderedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);
  const filteredAnecdotes = orderedAnecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  
  return (
    <div>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
