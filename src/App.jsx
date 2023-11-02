import { useEffect, useState } from 'react'
import './App.css'
import Results from './assets/components/Results'
import FormContent from './assets/components/FormContent'
import { getAllRecords, oneRecord } from './helper';
import { Link } from 'react-router-dom';





function App() {
  const [data, setData] = useState([]);
  

  useEffect(() => {
    setData(getAllRecords());
  }, []);

  // function appendData(newEntry) {
  //   setData([...data, newEntry]);
  //   localStorage.setItem('data', JSON.stringify([...data, newEntry]))
  // }
  
 

  return (
    <>
    <div className='container'>
      {/* <div className='myForm'>
        <h1>Form</h1>
          <FormContent  data={data} setData={setData} />
      </div> */}
      <div className='result'>
          <Results data={data} setData={setData} />
      </div>
    </div>
  
    </>
  )
}

export default App
