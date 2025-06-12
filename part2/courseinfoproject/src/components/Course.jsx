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

export default Course