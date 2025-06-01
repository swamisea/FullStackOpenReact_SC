const Header = (props) =>{
  return(
    <div>
      <h1>{props.course.name}</h1>
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
    <Part part = {props.content_info.parts[0].name} exercise = {props.content_info.parts[0].exercises} />
    <Part part = {props.content_info.parts[1].name} exercise = {props.content_info.parts[1].exercises} />
    <Part part = {props.content_info.parts[2].name} exercise = {props.content_info.parts[2].exercises} />
  </div>
  )
}

const Total = (props) =>{
  return(
    <div>
       <p>Number of exercises {props.content_info.parts[0].exercises + props.content_info.parts[1].exercises + props.content_info.parts[2].exercises}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <Header course={course}/>
      <Content content_info={course}/>
      <Total content_info={course}/>
    </div>
  )
}

export default App