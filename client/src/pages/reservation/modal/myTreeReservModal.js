import React, { useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function MyTreeReservModal({ setReservModal, moreData }) {

  const navigate = useNavigate();

  const getModalStatus = (moreData) => {
    setReservModal(false)
  }

  // const getMore = async () => {
  //   const SERVER_URL = 'http://localhost:8001/reservationMore';
  //   try {
  //     await axios.post(SERVER_URL, {
  //       id: moreData.id,
  //       reservation_date: updateData.reservation_date,
  //       reservation_time: updateData.reservation_time,
  //       note: updateData.note,
  //     });
  //   } catch (error) {
  //     console.log("error : ", error);
  //   }
  // }

  return (
    <Overlay onClick={() => setReservModal(false)}>
      <ModalWrap onClick={(e) => e.stopPropagation()}>
        <div className="myTree-modal-header">
          <div className="myTree-modal-title">
            예약 정보
          </div>
        </div>
        <div className="myTree-modal-content">
          <div className="myTree-modal-inner-content">
            <div className="myTree-modal-inner-txt">프로그램</div>
            <div className="myTree-modal-inner-data">
              <div className="myTree-modal-inner-view">
                <div>{moreData.prog_name}</div>
                <div className="small-txt">({moreData.prog_time}min)</div>
              </div>
            </div>
          </div>
          <div className="myTree-modal-inner-content">
            <div className="myTree-modal-inner-txt">잔여 횟수</div>
            <div className="myTree-modal-inner-data">{moreData.remain_count}회</div>
          </div>
        </div>
        <div className="myTree-modal-bottom">
          <button className="myTree-modal-btn btn-wrong" onClick={() => setReservModal(false)}>닫기</button>
          <button className="myTree-modal-btn btn-right" onClick={() => getModalStatus(moreData)}>
            <Link
              to={`/moreReserv?prog_name=${encodeURIComponent(moreData.prog_name)}&prog_time=${moreData.prog_time}&remain_count=${moreData.remain_count}&total_count=${moreData.total_count}&id=${moreData.id}&price=${moreData.price}`}
              className="myTree-modal-link"
            >
              추가예약
            </Link>
          </button>
        </div>
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
  width: 350px;
  height: fit-content;
  border-radius: 15px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
`;
export default MyTreeReservModal;