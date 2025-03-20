import countryService from '../services/countries'
import Country from './Country'
import Renderer from './Renderer'
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
    const [filterLength, setFilterLength] = useState(1)

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

    if (filter.length < filterLength || filter.length > filterLength) {
        if (show === false) {
            setShow(true)
        }
        if (filter.length < 1) {
            return (
                <></>
            )
        } else {
            return (
                <div>
                    <Renderer
                        filter={filter}
                        countries={countries}
                        filterLength={filterLength}
                        countryObject={countryObject}
                        setFilterLength={setFilterLength}
                        setCountry={setCountry}
                        handleClick={handleClick}
                    />
                </div>
            )
        }
        
    } else if (show === false) {
        return (
            <div>
                <Country country={countryObject} />
            </div>
        )
    }
    
    return (
        <div>
            <Renderer
                filter={filter}
                countries={countries}
                filterLength={filterLength}
                countryObject={countryObject}
                setFilterLength={setFilterLength}
                setCountry={setCountry}
                handleClick={handleClick}
            />
        </div>
    )
} 

export default Countries