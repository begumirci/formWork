import { useEffect, useState } from 'react'
import './App.css'
import Results from './components/Results'
import FormContent from './components/FormContent'
import { getAllRecords, oneRecord } from './helper';
import { Link } from 'react-router-dom';





function App() {
  const [data, setData] = useState([]);


  useEffect(() => {
    setData(getAllRecords());
  }, []);


  return (
    <>
      <div className='container'> 
        <div className='result'>
          <Results data={data} setData={setData} />
        </div>
      </div>

    </>
  )
}

export default App
