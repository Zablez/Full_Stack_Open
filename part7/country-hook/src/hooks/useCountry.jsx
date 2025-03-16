import { useEffect, useState } from "react"

const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    useEffect(() => {
        const fetchCountry = async () => {
            try {

                const res = await fetch(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
                const country = await res.json()
                const obj = {
                    name: country.name.common,
                    capital: country.capital[0],
                    population: country.population,
                    flag: country.flags.png,
                }
                setCountry({
                    data: obj,
                    found: true
                })
            } catch (err) {
                setCountry({
                    found: false
                })
            }
        }
        if (!name) return
        fetchCountry()
    }, [name])

    return country
}

export default useCountry