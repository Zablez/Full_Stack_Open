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
            {`${props.part} ${props.exercises}`}
            <br />
            <br />
        </div>
    )
}

const Content = (props) => {
    return (
        <>
            {props.parts.map((item) => (
                <Part key={item.id} part={item.name} exercises={item.exercises} />
            ))}
        </>
    )
}

const Total = (props) => {
    return (
        <div>Total no of course is {props.total}</div>
    )
}


const Course = (props) => {
    const total = props.courses.parts.reduce((total, current) => total + current.exercises, 0);

    return (
        <>
            <Header course={props.courses.name} />
            <Content parts={props.courses.parts} />
            <Total total={total} />
        </>
    )
}
export default Course;