import { oneRecord } from '../helper';
import FormContent from './FormContent';
import '../App.css';
import { Link } from 'react-router-dom';
import { commitRecord } from '../helper';

export default function Results({ data, setData }) {
  function delItem(formId) {
    const newData = data.filter((x) => x.id !== formId);
    setData(newData);
    commitRecord(newData);
  }

  return (
    <div className='results'>
      <h3 className='info'>
        <span>Tüm Veriler</span>
        <Link to='/ekle'>Ekle</Link>
      </h3>
      <div className='resultItems'>
        {data.map((x, i) => (
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
