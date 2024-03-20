import { useRef } from 'react';
import {
  getAllRecords,
  InsertRecords,
  oneRecord,
  UpdateRecords,
} from '../helper';
import '../App.css';
import { useLoaderData, useNavigate } from 'react-router-dom';

export async function formLoader({ params }) {
  return oneRecord(params.id);
}

export default function FormContent() {
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
    if (data.find((x) => x.phone == Object.fromEntries(formData).phone)) {
      alert('Bu telefon numarasına sahip bir kaydınız bulunmaktadır');
      return;
    }
    if (
      Object.fromEntries(formData).phone.length > 11 ||
      Object.fromEntries(formData).phone.length < 11
    ) {
      alert('Numaranız 11 haneden fazla veya eksik olamaz');
      return;
    }
    if (
      Object.fromEntries(formData).name == '' ||
      Object.fromEntries(formData).email == '' ||
      Object.fromEntries(formData).gender == '' ||
      Object.fromEntries(formData).phone == ''
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
      <form
        onSubmit={handleClick}
        autoComplete='on'
        ref={myForm}
        noValidate
        className='myForm'
      >
        <div className='formElement'>
          <p>İsim Soyisim</p>
          <input
            type='text'
            placeholder='İsim Soyisim Girin'
            required
            name='name'
            defaultValue={loaderData?.name}
          />
        </div>
        <div className='formElement'>
          <p>Email</p>
          <input
            type='email'
            placeholder='E-posta Girin'
            required
            name='email'
            defaultValue={loaderData?.email}
          />
        </div>
        <div className='formElement'>
          <p>Telefon Numarası</p>
          <input
            type='number'
            placeholder='Telefon Numarası Girin'
            required
            name='phone'
            defaultValue={loaderData?.phone}
          />
        </div>
        <div className='formElement'>
          <p>Cinsiyet</p>
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
          <button type='button' className='add' onClick={() => navigate(-1)}>
            Geri
          </button>
        </div>
      </form>
    </div>
  );
}
