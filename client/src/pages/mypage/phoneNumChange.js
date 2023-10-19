import React from 'react';
import Header from '../../component/header';
import { useState } from 'react';

function PhoneNumChange() {

    const [phoneNum,setPhoneNum] = useState("");

    const onPhoneNumHandler = (event) => {
        setPhoneNum(event.currentTarget.value);
      };

    // 전화번호 유효성 검사 함수
  const validatePhoneNum = (phoneNumber) => {
    const phoneNumberPattern = /^010-\d{4}-\d{4}$/

    if (phoneNumberPattern.test(phoneNumber)) {
      return true
    } else {
      return false
    }

  };

  const clearInput = (inputFieldName) => {
    switch (inputFieldName) {
      case 'phoneNum':
        setPhoneNum('');
        break;
      default:
        break;
    }
  };

  const confirmButtonValid = () => {
    return (
      validatePhoneNum(phoneNum)
    );
  };

  const changePhoneNumSubmit = () => {
    // 여기에 서버로 데이터 보내는 코드 작성 
    // 폰넘버 변경 
    
  }
    

    return (
        <>
        <Header/>
            <div class="phoneNumChange-container">
                

                <div class="signup-subtitle">휴대폰 번호</div>
                <div class="input-with-clear">
                    <input
                        className={`${phoneNum && !validatePhoneNum(phoneNum) ? 'signup-input-error' : 'signup-input'}`}
                        id="phoneInput"
                        value={phoneNum}
                        onChange={onPhoneNumHandler} />
                    {phoneNum && (
                        <img alt="" src="/assets/signup_init.png" class="signup-clear-input" onClick={() => clearInput('phoneNum')}>
                        </img>
                    )}
                    {phoneNum && !validatePhoneNum(phoneNum) ? (
                        <div class="signup-input-errorMessage">ex) 010-1234-5678</div>
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