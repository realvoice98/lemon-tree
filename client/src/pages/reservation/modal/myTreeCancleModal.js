import React, { useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import { useUser } from '../../../userContext';
import { useNavigate } from "react-router-dom";

function MyTreeCancleModal({ cancleModal, setCancleModal }) {
  
  const navigate = useNavigate();

  return (
      <Overlay onClick={() => setCancleModal(false)}>
        <ModalWrap className="modalWrap">
          <div></div>
          
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
export default MyTreeCancleModal;