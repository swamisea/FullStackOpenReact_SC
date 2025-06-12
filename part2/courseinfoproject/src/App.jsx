const Header = ({name}) => <h2>{name}</h2>

const Part = ({name, exercises}) => {
  return(
    <div>
      <p>{name} {exercises}</p>
    </div>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} {...part}/>)}
      <Total parts={parts}/>
    </div>
    
  )
}

const Total = ({parts}) => {
  var total = parts.reduce(
    (sum, ex_val) =>  sum + (ex_val.exercises),
    0
  )
  return(
    <div>
      <strong>total of {total} exercises</strong>
    </div>
  )
}

const Course = (props) => {
  return(    
    <div>
      {props.course.map(course => {
        return (
          <div key={course.id}>
            <Header key={course.id} name={course.name}/>
            <Content key={course.id + 1} parts = {course.parts}/>
          </div>
        )
      })}
    </div>
    )
}

const App = () => {
  const course = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      <Course course={course} />
    </div>
  )
}

export default App