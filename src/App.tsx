import { useEffect, useState } from 'react'
import axios from 'axios'

interface Weather {
  name: string,
  weather: {
    main: string
  }[],
  main: {
    temp: number
  }
}

function App(): JSX.Element {

  const [data, setData] = useState<Weather | any>({});
  const [loc, setLoc] = useState<string>('Philippines')

  const locationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetchData()
  }

  const fetchData = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=e3a2b3a42907b47ba37d46b9666339c4`
    axios.get(url).then(response => {
      setData(response.data)
    })
    setLoc('')
  }

  useEffect(()=>fetchData(),[])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchData()
    }
  }

  return (

    <>
      <main className=' flex flex-col py-5 bg-gradient-to-br from-teal-300 via-amber-300 to-lime-200 h-[100vh] w-full'>

        <div className='search w-[18rem] mx-auto '>
          <input className=' relative px-4 py-2 rounded-l-md ' type="text" placeholder='Enter location' onKeyDown={handleKeyDown} value={loc} onChange={event => { setLoc(event.target.value) }} />
          <button className='absolute bg-blue-500 py-2 px-2 rounded-r-md text-white ' onClick={locationSubmit}>Submit</button>
        </div>

        <div className="forecast mt-5 flex justify-around">
          <div className=' max-w-[100px] mx-9'>{data.name}</div>
          {data.weather && (
            <div className="main-weather    max-w-[100px] mx-9">{data.weather[0].main}</div>
          )}
          {data.weather && (
            <div className=" max-w-[120px] mx-9">{(data.main.temp - 273.15).toFixed(2)}° Celsius</div>
          )}
        </div>
      </main>
    </>

  )
}
export default App



