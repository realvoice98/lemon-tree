import React from 'react';
import Header from '../../component/header';

function myTree(props) {

    // 잔여 횟수
    const count = [
        {
            name: "얼굴&데콜테",
            time: 60,
            remainCount: 3,
            totalCount: 3
        },
        {
            name: "다리",
            time: 30,
            remainCount: 1,
            totalCount: 3
        }
    ];

    // 예약 내역
    const myReservation = [
        {
            date: "2023.09.12",
            dateTime: "17:30",
            name: "얼굴&데콜테",
            time: 60,
            remainCount: 3,
            totalCount: 3
        },
        {
            date: "2023.09.12",
            dateTime: "18:30",
            name: "다리",
            time: 30,
            remainCount: 3,
            totalCount: 3
        }
    ];

    // 예약 목록
    const reservationList = [
        {
            date: "2023.09.11",
            dateTime: "18:00",
            status: "취소완료",
            name: "다리",
            time: 30,
            remainCount: 1,
            totalCount: 3
        },
        {
            date: "2023.09.10",
            dateTime: "18:30",
            status: "예약완료",
            name: "다리",
            time: 30,
            remainCount: 2,
            totalCount: 3
        },
        {
            date: "2023.09.09",
            dateTime: "18:00",
            status: "예약완료",
            name: "다리",
            time: 30,
            remainCount: 3,
            totalCount: 3
        }
    ];

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
                            {count.map((count, index, array) => (
                                <>
                                    <div key={index} className='myTree-inner-container'>
                                        <div className='myTree-program'>
                                            <div className='myTree-program-name'>{count.name} 관리</div>
                                            <div className='myTree-program-time'>({count.time}min)</div>
                                        </div>
                                        <div className='myTree-count'>{count.remainCount}회 / {count.totalCount}회</div>
                                    </div>
                                    {(array.length > 1 && index < array.length - 1) && <div className='dash-g' />}
                                </>
                            ))}
                        </div>
                    </div>
                    <div className='dash-b' />
                    <div className='myTree-container'>
                        <div className='myTree-title'>예약 내역</div>
                        {myReservation.map((myReservation, index2) => (
                            <>
                                <div className='myTree-content'>
                                <div className='myTree-inner-container'>
                                    <div className='myTree-program'>
                                        <div className='myTree-program-date'>{myReservation.date}</div>
                                        <div className='myTree-program-date-time'>{myReservation.dateTime}</div>
                                    </div>
                                    <button className='myTree-btn'>예약취소</button>
                                </div>
                                <div className='dash-g' />
                                <div className='myTree-inner-container'>
                                    <div className='myTree-program'>
                                        <div className='myTree-program-name'>{myReservation.name} 관리</div>
                                        <div className='myTree-program-time'>({myReservation.time}min)</div>
                                    </div>
                                    <div className='myTree-count'>{myReservation.remainCount}회 / {myReservation.totalCount}회</div>
                                </div>
                            </div>
                            </>
                        ))}
                    </div>
                    <div className='dash-b' />
                    <div className='myTree-container'>
                        <div className='myTree-title'>예약 목록</div>
                        {reservationList.map((reservationList, index3) => (
                            <>
                                <div className='myTree-content'>
                                <div className='myTree-inner-container'>
                                    <div className='myTree-program'>
                                        <div className='myTree-program-date'>{reservationList.date}</div>
                                        <div className='myTree-program-date-time'>{reservationList.dateTime}</div>
                                    </div>
                                    <div className={`myTree-status${getReservationStatus(reservationList.status)}`}>{reservationList.status}</div>
                                </div>
                                <div className='dash-g' />
                                <div className='myTree-inner-container'>
                                    <div className='myTree-program'>
                                        <div className='myTree-program-name'>{reservationList.name} 관리</div>
                                        <div className='myTree-program-time'>({reservationList.time}min)</div>
                                    </div>
                                    <div className='myTree-count'>{reservationList.remainCount}회 / {reservationList.totalCount}회</div>
                                </div>
                            </div>
                            </>
                        ))}
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default myTree; 