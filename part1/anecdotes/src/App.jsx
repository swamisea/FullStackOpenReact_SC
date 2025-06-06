import { useState } from 'react'

const Heading = ({heading}) =>{
  return(
    <div>
      <h1>{heading}</h1>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  let votes_begin = {}
  for( let i = 0; i<anecdotes.length; i++){
    votes_begin[i] = 0
  }
  const[votes, setVotes] = useState(votes_begin)
  const[maxVotes,setMaxVotes] = useState(0)
  const[maxVotesIndex,setMaxVotesIndex] = useState(0)

  

  const handleNextClick = () => {
    const length = anecdotes.length
    let random_number = Math.floor(Math.random()*length);
    setSelected(random_number)
  }

  const handleVote = () => {
    let updated_votes = {...votes}
    let updatedMaxVotes = maxVotes
    let updatedMaxIndex = maxVotesIndex

    updated_votes[selected] += 1
    setVotes(updated_votes)
    
    for(let i=0;i<anecdotes.length;i++){
      if (updated_votes[i] > updatedMaxVotes){
        updatedMaxVotes = updated_votes[i]
        updatedMaxIndex = i
      }
    }
    setMaxVotes(updatedMaxVotes)
    setMaxVotesIndex(updatedMaxIndex)
  }

  return (
    <div>
      <Heading heading="Anecdote of the day"/>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNextClick}>next anecdote</button>
      <Heading heading="Anecdote with most votes"/>
      <p>{anecdotes[maxVotesIndex]}</p>
    </div>
  )
}

export default App