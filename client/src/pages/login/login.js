import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { useUser } from '../../userContext';

function Login() {

  const { setUser } = useUser();

  const [phoneNum, setPhoneNum] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onPhoneNumHandler = (event) => {
    setPhoneNum(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const confirmButtonValid = () =>{
    return (
      phoneNum !== "" &&
      password !== ""
    );
  }

  const loginSubmit = async() => {
    const SERVER_URL = 'http://localhost:8001/login'
    try {
      const response = await axios.post(SERVER_URL, { phoneNum, password });
  
      if (response.data.success) {
        // 로그인 성공
        setUser(response.data.userInfo); // 유저 정보를 전역변수에 저장
        navigate('/main');
        // 토큰을 저장하고 사용자를 다음 화면으로 리디렉션하거나 다른 작업 수행
      } else {
        // 로그인 실패
        this.setState({ message: response.data.message });
      }
    } catch (error) {
      console.error('로그인 요청 오류:', error);
    }
  }

  return (
    <div className='login-back-img'>
      <div className='login-container'>
        <div className='login-title'>Lemon Tree</div>
        <div className='login-content'>
          <div className='login-input-content'>
            <input
              className={'login-input'}
              id="phoneInput"
              pattern="[0-9]+"
              title="전화번호를 바르게 입력하세요"
              value={phoneNum}
              onChange={onPhoneNumHandler}
              placeholder={'휴대폰 번호를 입력해주세요'} />
          </div>
          <div className='login-input-content'>
            <input
              className={'login-input'}
              id="phoneInput"
              pattern=".{8}"
              title="8자리 이상 입력하세요"
              type="password"
              value={password}
              onChange={onPasswordHandler}
              placeholder={'비밀번호를 입력해주세요'} />
          </div>
          <button
            className={'login-btn-active'}
            disabled={!confirmButtonValid()}
            onClick={() => loginSubmit()}
          >
            로그인
          </button>
          <Link to={'/signup'} className='login-signUp'>회원가입</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
