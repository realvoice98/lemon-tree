import React from 'react';
import Header from '../../component/header';
import { useState } from 'react';
import { useUser } from '../../userContext';
import axios from 'axios';

function PhoneNumChange() {

    const [newPhoneNum,setNewPhoneNum] = useState("");
    const { user, setUser }  = useUser();
    const originalPhoneNum = sessionStorage.getItem("phone");
    const userId = sessionStorage.getItem('id');

    const onPhoneNumHandler = (event) => {
      setNewPhoneNum(event.currentTarget.value);
      };

    // 전화번호 유효성 검사 함수
  const validatePhoneNum = (newPhoneNum) => {
    const phoneNumberPattern = /^010\d{4}\d{4}$/

    if (phoneNumberPattern.test(newPhoneNum)) {
      return true
    } else {
      return false
    }

  };

  const clearInput = (inputFieldName) => {
    switch (inputFieldName) {
      case 'phoneNum':
        setNewPhoneNum('');
        break;
      default:
        break;
    }
  };

  const confirmButtonValid = () => {
    return (
      validatePhoneNum(newPhoneNum)
    );
  };

  const changePhoneNumSubmit = async() => {
    // 폰넘버 변경 
    const SERVER_URL = 'http://localhost:8001/phonenumchange'

      await axios.post(SERVER_URL, { originalPhoneNum, newPhoneNum, userId })
      .then(res => {
        alert('변경완료');
        const updatedUser = { ...user, phone: newPhoneNum };    
        setUser(updatedUser);
        sessionStorage.setItem('phone',newPhoneNum);
    })
    .catch(error => console.log(error));
  }

    

    return (
        <>
        <Header/>
            <div class="phoneNumChange-container">
                
                <div class="signup-subtitle">기존 전화번호</div>
                  <input className='signup-input' type='text' value={originalPhoneNum} disabled={true}/>
                <div class="signup-subtitle">변경할 휴대폰 번호</div>
                <div class="input-with-clear">
                    <input
                        className={`${newPhoneNum && !validatePhoneNum(newPhoneNum) ? 'signup-input-error' : 'signup-input'}`}
                        id="phoneInput"
                        value={newPhoneNum}
                        onChange={onPhoneNumHandler} />
                    {newPhoneNum && (
                        <img alt="" src="/assets/signup_init.png" class="signup-clear-input" onClick={() => clearInput('phoneNum')}>
                        </img>
                    )}
                    {newPhoneNum && !validatePhoneNum(newPhoneNum) ? (
                        <div class="signup-input-errorMessage">ex) 01012345678</div>
                    ) : (
                        ''
                    )}
                </div>

                <button
                    className={`${confirmButtonValid() ? 'mypage-confirm-active' : 'mypage-confirm-inactive'}`}
                    disabled={!confirmButtonValid()}
                    onClick={() => changePhoneNumSubmit()}
                >
                    변경하기
                </button>

            </div>

        </>
    );
}

export default PhoneNumChange