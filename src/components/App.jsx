import React, {useState, useEffect} from 'react';
import '../index.scss';
import {IMaskInput} from 'react-imask';

const App = () => {

  const [isSexOpen, setIsSexOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [isDataCorrect, setIsDataCorrect] = useState(false);
  const [sendData, setSendData] = useState(false);
  const [fields, setFields] = useState({
    firstName: '',
    secondName: '',
    fatherName: '',
    phone: '',
    bornDate: '',
    email: '',
    address: '',
    workName: '',
    sex: 'Мужской',
  });
  

  const handleSubmitForm = () => {
    setErrors(formValidation(fields));
    setIsDataCorrect(true);
  }

  useEffect(() => {
    if(Object.keys(errors).length === 0 && isDataCorrect) {
      setSendData(true);
    }
  }, [errors])

  useEffect(() => {
    if(sendData) {
      alert('Форма валидна, отправляется запрос');
      setSendData(false); // для многоразового отправления одних и тех же данных без перезагрузки (optional)
    }
  }, [sendData])

  const setSexFunction = (value) => {
    setFields({
      ...fields, sex: value
    });
    setIsSexOpen(false);
  }

  const setPhoneNumber = (value) => {
    setFields({
      ...fields, phone: value
    });
  }

  const formValidation = (fields) => {
    let errors = {}

    if(!fields.secondName) {
      errors.secondName = 'Поле является обязательным';
    }
    if(!fields.firstName) {
      errors.firstName = 'Поле является обязательным';
    }
    if(!fields.bornDate) {
      errors.bornDate = 'Поле является обязательным';
    }
    if(!fields.phone) {
      errors.phone = 'Поле является обязательным';
    }
    if(!validateEmail(fields.email)) {
      errors.email = 'Введен некорректный адрес почты';
    }

    return errors;
  }

  const validateEmail = (email) => {
    if(!email) {
      return true
    } else {
      const ref = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return ref.test(String(email).toLowerCase()); 
    } 
  }

  const handleChange = (e) => {
    setFields({
      ...fields, [e.target.name]: e.target.value
    });
  }

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1>Информация о сотруднике</h1>
        <div className="text-field-wrapper">
          <input 
            className={errors.secondName ? "errorInput" : ""} 
            type="text" 
            value={fields.secondName}
            required
            name="secondName" 
            id="secondName" 
            onChange={handleChange}
          />
          <label for="secondName" title="Фамилия" data-title="Фамилия"></label>
          {errors.secondName ?
          <span>{errors.secondName}</span>
          :
          null
          }
        </div>
        <div className="text-field-wrapper">
          <input 
            className={errors.firstName ? "errorInput" : ""} 
            type="text" 
            value={fields.firstName}
            required
            name="firstName" 
            id="firstName" 
            onChange={handleChange}
          />
          <label for="firstName" title="Имя" data-title="Имя"></label>
          {errors.firstName ?
          <span>{errors.firstName}</span>
          :
          null
          }
        </div>
        <div className="text-field-wrapper">
          <input 
            type="text" 
            value={fields.fatherName}
            required
            name="fatherName" 
            id="fatherName" 
            onChange={handleChange}
          />
          <label for="fatherName" title="Отчество" data-title="Отчество"></label>
        </div>
        <div className="two-columns">
          <div className="column">
            <div className="text-field-wrapper">
              <input style={{cursor:'pointer'}} type="text" value={fields.sex} required id="sex" onClick={() => setIsSexOpen(!isSexOpen)} />
              <label for="sex" title="Пол" data-title="Пол"></label>
              {isSexOpen ? 
              <div className="select-sex-wrapper">
                <div className={fields.sex === 'Мужской' ? "option-active" : "option" } onClick={() => setSexFunction('Мужской')}>Мужской</div>
                <div className={fields.sex === 'Женский' ? "option-active" : "option" } onClick={() => setSexFunction('Женский')}>Женский</div>
              </div>
              :
              null
              }
            </div>
            <div className="text-field-wrapper">
              <IMaskInput
                mask='+7(000)-000-00-00'
                radix="."
                id="phone"
                unmask={false}
                onAccept={(value, mask) => setPhoneNumber(value)}
                placeholder='+7(___)-___-__-__'
              />
              <label for="phone" title="Мобильный телефон" data-title="Мобильный телефон"></label>
              {errors.phone ?
              <span>{errors.phone}</span>
              :
              null
              }
            </div>
          </div>
          <div className="column">
            <div className="text-field-wrapper">
              <input 
                className={errors.bornDate ? "errorInput" : ""} 
                type="date"
                placeholder=""
                value={fields.bornDate}
                required
                name="bornDate" 
                id="dateOfBorn" 
                onChange={handleChange}/>
              <label for="dateOfBorn" title="Дата рождения" data-title="Дата рождения"></label>
              {errors.bornDate ?
              <span>{errors.bornDate}</span>
              :
              null
              }
            </div>
            <div className="text-field-wrapper">
              <input 
                className={errors.email ? "errorInput" : ""} 
                type="text" 
                value={fields.email}
                required
                name="email"
                id="email" 
                onChange={handleChange}/>
              <label for="email" title="email" data-title="Email"></label>
              {errors.email ?
              <span>{errors.email}</span>
              :
              null
              }
            </div>
          </div>
        </div>
        <div className="text-field-wrapper">
          <input 
            type="text" 
            value={fields.address}
            required
            name="address"
            id="address" 
            onChange={handleChange}/>
          <label for="address" title="Адрес постоянной регистрации" data-title="Адрес постоянной регистрации"></label>
        </div>
        <div className="text-field-wrapper">
          <input 
            type="text" 
            value={fields.workName}
            required
            name="workName"
            id="workName" 
            onChange={handleChange}/>
          <label for="workName" title="Название работодателя" data-title="Название работодателя"></label>
        </div>
        <div className="submit-button-wrapper">
          <div className="button" onClick={() => handleSubmitForm()}>
            <span>Сохранить</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
