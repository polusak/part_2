const Persons = (props) => {
    const persons = props.personList
    return (
        persons.map(p => <p key={p.name}> {p.name} {p.number}</p>)
    )
}

export default Persons