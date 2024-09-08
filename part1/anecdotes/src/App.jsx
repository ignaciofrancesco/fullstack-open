import { useState } from "react";

/* COMPONENTS */

const SectionTitle = (props) => {
  return <h2>{props.children}</h2>;
};

const AnecdoteDisplay = ({ anecdote, votes }) => {
  return (
    <>
      <div>"{anecdote}"</div>
      <p>has {votes} votes.</p>
    </>
  );
};

/* MAIN COMPONENT */

const App = () => {
  /* Data */
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
    "Ori es una modelo.",
  ];

  /* State */
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  /* Computed values */
  const maxVotes = Math.max(...votes);
  const winnerAnecdote = votes.indexOf(maxVotes);

  /* Event handlers */
  const handleClickVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  const handleClickNextAnecdote = () => {
    const newSelected = Math.floor(Math.random() * anecdotes.length);
    setSelected(newSelected);
  };

  return (
    <div>
      <SectionTitle>Anecdote of the day</SectionTitle>
      <AnecdoteDisplay anecdote={anecdotes[selected]} votes={votes[selected]} />
      <button onClick={handleClickVote}>vote</button>
      <button onClick={handleClickNextAnecdote}>next anecdote</button>
      <SectionTitle>Anecdote with most votes</SectionTitle>
      <AnecdoteDisplay
        anecdote={anecdotes[winnerAnecdote]}
        votes={votes[winnerAnecdote]}
      />
    </div>
  );
};

export default App;
