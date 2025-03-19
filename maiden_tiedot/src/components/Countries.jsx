import countryService from '../services/countries'
import Country from './Country'
import { useState } from 'react'

const Countries = ({filter, countries}) => {
    const init = {
        name: '',
        capital: '',
        area: '',
        languages: [''],
        flag: null

    }
    
    const [countryObject, setCountry] = useState(init)
    const [show, setShow] = useState(true)

    const handleClick = (name) => {
        countryService
            .get(name)
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
        setShow(false)
    }

    console.log(show === false)

    if (show === false) {
        return (
            <div>
                <Country country={countryObject} />
            </div>
        )
    }
    if (filter.length < 1) {
        return (
            <></>
        )
    } else if (countries.length > 10) {
        console.log(countries)
        return (
            <>
                <br />
                Too many matches, specify another filter
            </>
        )
    } else if (countries.length > 1) {
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

export default Countries