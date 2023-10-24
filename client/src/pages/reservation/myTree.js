import React, { useEffect, useState } from 'react';
import Header from '../../component/header';
import axios from 'axios';
import MyTreeCancleModal from './modal/myTreeCancleModal';
import MyTreeReservModal from './modal/myTreeReservModal';


function MyTree(props) {

    useEffect(() => {
        getMyTree()
        getMyReservation()
        getReservationList()
    }, [])

    const [myTree, setMyTree] = useState([]);
    const [myReservation, setMyReservation] = useState([]);
    const [reservationList, setReservationList] = useState([]);

    const [cancleModal, setCancleModal] = useState(false);
    const [reservModal, setReservModal] = useState(false);

    const getCancleModal = () => {
        setCancleModal(true)
    }

    const getReservModal = () => {
        setReservModal(true)
    }

    // 잔여횟수
    const getMyTree = async () => {
        const client_id = sessionStorage.getItem('id');
        const SERVER_URL = 'http://localhost:8001/myTree';
        try {
            const response = await axios.get(SERVER_URL, {
                params: { client_id }
            });
            setMyTree(response.data)
        } catch (error) {
            console.log("error : ", error);
        }
    }

    // 예약내역
    const getMyReservation = async () => {
        const client_id = sessionStorage.getItem('id');
        const SERVER_URL = 'http://localhost:8001/myReservation';
        try {
            const response = await axios.get(SERVER_URL, {
                params: { client_id }
            });
            setMyReservation(response.data)
        } catch (error) {
            console.log("error : ", error);
        }
    }

    // 예약목록
    const getReservationList = async () => {
        const client_id = sessionStorage.getItem('id');
        const SERVER_URL = 'http://localhost:8001/reservationList';
        try {
            const response = await axios.get(SERVER_URL, {
                params: { client_id }
            });
            setReservationList(response.data)
        } catch (error) {
            console.log("error : ", error);
        }
    }

    function getReservationStatus(status) {
        return status === '취소완료' ? '-cancle' : '';
    }

    return (
        <>
            <Header />
            <div className='myTree-main-container'>
                <div className='myTree-main-title'>My Tree</div>
                <div className='myTree-main-content'>
                    <div className='myTree-container'>
                        <div className='myTree-title'>잔여 횟수</div>
                        <div className='myTree-content'>
                            {myTree.map((myTree, index, array) => (
                                <>
                                    <div key={index} className='myTree-inner-container'>
                                        <div className='myTree-program'>
                                            <div className='myTree-program-name'>{myTree.prog_name} 관리</div>
                                            <div className='myTree-program-time'>({myTree.prog_time}min)</div>
                                        </div>
                                        <div className='myTree-right-content'>
                                            <div className='myTree-count'>{myTree.remain_count}회 / {myTree.total_count}회</div>
                                            <button className='myTree-btn-reserv' onClick={getReservModal}>예약하기</button>
                                        </div>
                                    </div>
                                    {(array.length > 1 && index < array.length - 1) && <div className='dash-g' />}
                                </>
                            ))}
                        </div>
                    </div>
                    <div className='dash-b' />
                    <div className='myTree-container'>
                        <div className='myTree-title'>예약 내역</div>
                        {myReservation.map((myReservation, index2) => {
                            const parts = myReservation.reservation_date.split('.');
                            const formattedDate = `20${parts[0]}.${parts[1]}.${parts[2]}`;
                            const reservation_time = myReservation.reservation_time.split(' ').join('');
                            return (
                                    <div key={index2} className='myTree-content'>
                                        <div className='myTree-inner-container'>
                                            <div className='myTree-program'>
                                                <div className='myTree-program-date'>{formattedDate}</div>
                                                <div className='myTree-program-date-time'>{reservation_time}</div>
                                            </div>
                                            <div className='myTree-right-content'>
                                                <div className='myTree-status myTree-status-list'>{myReservation.reservation_status}</div>
                                                <button className='myTree-btn-cancle' onClick={getCancleModal}>예약취소</button>
                                            </div>
                                        </div>
                                        <div className='dash-g' />
                                        <div className='myTree-inner-container'>
                                            <div className='myTree-program'>
                                                <div className='myTree-program-name'>{myReservation.prog_name} 관리</div>
                                                <div className='myTree-program-time'>({myReservation.prog_time}min)</div>
                                            </div>
                                            <div className='myTree-count'>{myReservation.remain_count}회 / {myReservation.total_count}회</div>
                                        </div>
                                    </div>
                            );
                        })}
                    </div>
                    <div className='dash-b' />
                    <div className='myTree-container'>
                        <div className='myTree-title'>예약 목록</div>
                        {reservationList.map((reservationList, index3) => {
                            const parts = reservationList.reservation_date.split('.');
                            const formattedDate = `20${parts[0]}.${parts[1]}.${parts[2]}`;
                            const reservation_time = reservationList.reservation_time.split(' ').join('');
                            return (
                                    <div key={index3} className='myTree-content'>
                                        <div className='myTree-inner-container'>
                                            <div className='myTree-program'>
                                                <div className='myTree-program-date'>{formattedDate}</div>
                                                <div className='myTree-program-date-time'>{reservation_time}</div>
                                            </div>
                                            <div className={`myTree-status${getReservationStatus(reservationList.reservation_status)}`}>{reservationList.reservation_status}</div>
                                        </div>
                                        <div className='dash-g' />
                                        <div className='myTree-inner-container'>
                                            <div className='myTree-program'>
                                                <div className='myTree-program-name'>{reservationList.prog_name} 관리</div>
                                                <div className='myTree-program-time'>({reservationList.prog_time}min)</div>
                                            </div>
                                            <div className='myTree-count'>{reservationList.remain_count}회 / {myTree.total_count}회</div>
                                        </div>
                                    </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            {cancleModal === true && <MyTreeCancleModal cancleModal={cancleModal} setCancleModal={setCancleModal} />}
            {reservModal && <MyTreeReservModal reservModal={reservModal} setReservModal={setReservModal} />}
        </>
    );
}

export default MyTree; 