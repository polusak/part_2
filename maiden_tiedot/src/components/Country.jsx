const Country = ({country}) => {

    return (
        <div>
            <h1>{country.name}</h1>
            Capital: {country.capital}<br />
            Area: {country.area}
            <h2>Languages</h2>
                {country.languages.map(language =>
                    <li key={language}>{language}</li>
                )}
            <br />
            <img
                src={country.flag}
            />

        </div>
    )
}

export default Country