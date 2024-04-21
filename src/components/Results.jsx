import { oneRecord } from '../helper';
import FormContent from './FormContent';
import { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { commitRecord } from '../helper';

export default function Results({ data, setData }) {
  const [search, setSearch] = useState('');
  function delItem(formId) {
    const newData = data.filter((x) => x.id !== formId);
    setData(newData);
    commitRecord(newData);
  }
  let newList = data;

  if (search) {
    newList = newList.filter((user) =>
      user.name.toLocaleLowerCase('tr').includes(search.toLocaleLowerCase('tr'))
    );
  }
  return (
    <div className='results'>
      <h3 className='info'>
        <span>Tüm Veriler</span>
        <div className='flex'>
          <input
            className='search-input'
            type='text'
            placeholder='Search'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Link to='/ekle'>Ekle</Link>
        </div>
      </h3>
      <div className='resultItems'>
        {newList.map((x, i) => (
          <div
            className={`resultItem ${i % 2 === 0 ? 'renkli' : 'renksiz'}`}
            key={i}
          >
            <h4>
              <span>{x.name.toUpperCase()}</span>
              <Link to={x.id + '/duzenle'} data={data}>
                🖌
              </Link>
              <a
                onClick={() => {
                  delItem(x.id);
                }}
              >
                ❌
              </a>
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
}
