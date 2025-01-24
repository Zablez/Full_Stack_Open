const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      {`Name: ${props.part}`}<br />
      {`No of exercise: ${props.noOfExercise}`}
      <br />
      <br />
    </div>
  )
}

const Content = (props) => {
  return (
    <>
      {props.course.map((item) => (
        <Part key={item.id} part={item.part} noOfExercise={item.noOfExercise} />
      ))}
    </>
  )
}

const Total = (props) => {
  return (
    <div>Total no of course is {props.total}</div>
  )
}


const App = () => {
  const course = {
    name:'Half Stack application development',
    part : [
      {
        id: 1,
        part: 'Fundamentals of React',
        noOfExercise: 10,
      },
      {
        id: 2,
        part: 'Using props to pass data',
        noOfExercise: 7,
      },
      {
        id: 3,
        part: 'State of a component',
        noOfExercise: 14,
      },
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content course={course.part} />
      <Total total={course.part.length} />
    </div>
  )
}

export default App