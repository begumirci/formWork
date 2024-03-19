import { useState, useRef } from 'react';
import {
  commitRecord,
  getAllRecords,
  InsertRecords,
  oneRecord,
  UpdateRecords,
} from '../helper';
import '../App.css';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export async function formLoader({ params }) {
  return oneRecord(params.id);
}

export default function FormContent() {
  const [submit, setSubmit] = useState(false);
  const myForm = useRef();
  const navigate = useNavigate();

  const loaderData = useLoaderData();

  function handleClick(e) {
    e.preventDefault();
    const formData = new FormData(myForm.current);

    const data = getAllRecords();

    if (data.find((x) => x.email == Object.fromEntries(formData).email)) {
      alert('Bu mail adresiyle verimiz bulunmaktadır');
      return;
    }
    if (
      Object.fromEntries(formData).name == '' ||
      Object.fromEntries(formData).email == '' ||
      Object.fromEntries(formData).gender == ''
    ) {
      alert('Bilgileriniz Eksik');
      return;
    }

    if (loaderData) {
      UpdateRecords(Object.fromEntries(formData));
      alert('Veriniz Başarıyla Güncellendi!');
    } else {
      InsertRecords(Object.fromEntries(formData));
    }

    navigate('/');
  }

  return (
    <div className='all'>
      <div className='container'>
        <div className='myForm'>
          <form
            onSubmit={handleClick}
            autoComplete='on'
            ref={myForm}
            noValidate
            className={submit ? 'submit' : ''}
          >
            <div className='formElement'>
              <input
                type='text'
                placeholder='İsim Soyisim Girin'
                required
                name='name'
                defaultValue={loaderData?.name}
              />
              <p>Lütfen isim girin</p>
            </div>
            <div className='formElement'>
              <input
                type='email'
                placeholder='E-posta Girin'
                required
                name='email'
                defaultValue={loaderData?.email}
              />
              <p>Lütfen email girin</p>
            </div>
            <div className='formElement'>
              <select name='gender' required defaultValue={loaderData?.gender}>
                <option value=''>Cinsiyet</option>
                <option value='Kadın'>Kadın</option>
                <option value='Erkek'>Erkek</option>
              </select>
            </div>
            {loaderData?.id && (
              <input type='hidden' name='id' defaultValue={loaderData?.id} />
            )}
            <div className='btns'>
              <button className='add'>
                {loaderData?.id ? 'Güncelle' : 'Ekle'}
              </button>
              <button
                type='button'
                className='add'
                onClick={() => navigate(-1)}
              >
                Geri
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
