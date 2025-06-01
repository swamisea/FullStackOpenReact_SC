const Header = (props) =>{
  return(
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) =>{
  return (
    <div>
      <p>{props.part} {props.exercise}</p>
    </div>
  )
}

const Content = (props) =>{
  return(
  <div>
    <Part part = {props.content_info[0].name} exercise = {props.content_info[0].exercises} />
    <Part part = {props.content_info[1].name} exercise = {props.content_info[1].exercises} />
    <Part part = {props.content_info[2].name} exercise = {props.content_info[2].exercises} />
  </div>
  )
}

const Total = (props) =>{
  return(
    <div>
       <p>Number of exercises {props.content_info[0].exercises + props.content_info[1].exercises + props.content_info[2].exercises}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course}/>
      <Content content_info={parts}/>
      <Total content_info={parts}/>
    </div>
  )
}

export default App