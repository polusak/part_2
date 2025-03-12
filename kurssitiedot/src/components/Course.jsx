const Header = (props) => {
    return (
      <div>
        <h1>{props.course.name}</h1>
      </div>
    )
}
  
const Part = (props) => {
    return (
        <p>
            {props.part} {props.ex}
        </p>
    )
}

const Content = (props) => {
    const parts = props.course.parts

    return (
        <div>
        {parts.map(
            part => 
                <Part 
                    key={part.id} 
                    part={part.name} 
                    ex={part.exercises}
                />
            )
        }
        </div>
    )
}

const Total = (props) => {
    const parts = props.course.parts
    let total = 0
    parts.forEach(part => {
        total = total + part.exercises
    })

    return (
        <div>
        <p><b>total of {total} exercises</b></p>
        </div>
    )
}

const Course = ({course}) => {

    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

export default Course