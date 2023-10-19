import React, { useState } from "react";
import styled from "styled-components";


function ReservationConfirm({ onClose,dateValue,selectedProgram, selectedCount, selectedTime, totalPrice }) {

  const [clickYesNo, setClickYesNo] = useState('');

  const handleClose = () => {
    onClose?.();
  };

  const onClickYes = () => {
    setClickYesNo('yes')
  }

  const onClickNo = () => {
    setClickYesNo('no')
  }
  
  return (
      <Overlay>
        <ModalWrap>
          {clickYesNo === 'yes' ? 
            <>
            <div class="reservationModal-header1">예약되었습니다.</div>
            <div class="reservationModal-warning">결제는 프로그램 이용 후 부탁드립니다.</div>
            <button class="reservationModal-confirm" onClick={handleClose}>확인</button>
            </>
          : 
          clickYesNo === 'no'
          ? 
            <>
            <div class="reservationModal-header1">예약 취소되었습니다.</div>
            <button class="reservationModal-confirm" onClick={handleClose}>확인</button>
            </>
          : 
          <>
          <div class="reservaionModal-header"> 예약 확인</div>

          <div class="reservationModal-content">
            <div class="reservationModal-title">시간</div>
            <div class="reservationModal-info">{dateValue} / {selectedTime}</div>
          </div>
          <div class="reservationModal-content">
            <div class="reservationModal-title">프로그램</div>
            <div class="reservationModal-info">{selectedProgram}</div>
          </div>
          <div class="reservationModal-content">
            <div class="reservationModal-title">횟수</div>
            <div class="reservationModal-info">{selectedCount}</div>
          </div>
          <div class="reservationModal-content">
            <div class="reservationModal-title">금액</div>
            <div class="reservationModal-info">{totalPrice}원</div>
          </div>

          <div class="reservationModal-button-container">
            <button class="reservationModal-button" onClick={onClickYes}>예</button>
            <button class="reservationModal-button" onClick={onClickNo}>아니오</button>
          </div>
          </>
          }
          
        </ModalWrap>
      </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const ModalWrap = styled.div`
  width: 400px;
  height: fit-content;
  border-radius: 15px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
`;

const CloseButton = styled.div`
  float: right;
  width: 40px;
  height: 40px;
  margin: 20px;
  cursor: pointer;
  i {
    color: #5d5d5d;
    font-size: 30px;
  }
`;

const Contents = styled.div`
  margin: 50px 30px;
  h1 {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 60px;
  }
  img {
    margin-top: 60px;
    width: 300px;
  }
`;
const Button = styled.button`
  cursor: pointer;
  width: 100%;
  background-color: #DFE3E8;
  color: #ffffff;
  border-radius: 5px;
  border:0px;
  padding: 10px;
  margin-top: 20px;
  &:hover {
    background-color: #898989;
  }
`;
export default ReservationConfirm;