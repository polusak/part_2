import countryService from '../services/countries'
import Country from './Country'

const Renderer = (props) => {
    const filter = props.filter
    const countries = props.countries
    const filterLength = props.filterLength
    const countryObject = props.countryObject
    const setFilterLength = props.setFilterLength
    const setCountry = props.setCountry
    const handleClick = props.handleClick

    console.log(props)

    if (countries.length > 10) {
        if (filter.length !== filterLength) {
            setFilterLength(filter.length)
        }
        return (
            <>
                <br />
                Too many matches, specify another filter
            </>
        )
    } else if (countries.length > 1) {
        if (filter.length !== filterLength) {
            setFilterLength(filter.length)
        }
        return (
            <div>
                {countries.map(
                    nameObject => 
                    <p key={nameObject.common}> 
                        {nameObject.common}
                        <button onClick={() => handleClick(nameObject.common)}>
                            show
                        </button>
                    </p>
                )}
            </div>
            
        )
    } else {
        const nameLeft = countries[0].common
        countryService
            .get(nameLeft)
            .then(result => {
                const infoObject = {
                    name: result.name.common,
                    capital: result.capital,
                    area: result.area,
                    languages: Object.values(result.languages),
                    flag: result.flags.png

                }
                if (JSON.stringify(infoObject) !== JSON.stringify(countryObject)) {
                    setCountry(infoObject)
                }
            })
        return (
            <div>
                <Country country={countryObject} />
            </div>
        )
    }
}

export default Renderer