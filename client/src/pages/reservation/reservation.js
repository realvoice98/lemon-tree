import React from 'react';
import Header from '../../component/header';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import './customCalendar.css'; // 사용자 정의 스타일을 불러옵니다.
import { useState } from 'react';
import ReservationConfirm from './reservationConfirm';
import axios from 'axios';
import { useEffect } from 'react';

function Reservation() {

    const [dateValue, changeDate] = useState(new Date());
    const [selectedProgram,setSelectedProgram] = useState('선택한 프로그램');
    const [selectedTime,setSelectedTime] = useState('');
    const [programList,setProgramList]  = useState([]);
    const [timeList,setTimeList]  = useState(['17 : 00','17 : 30','18 : 00','18 : 30']);
    const [toggleStatus,setToggleStatus]  = useState(false);
    const [selectedCount,setSelectedCount] = useState('');
    const [confirmModal,setConfirmModal] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0); // 총 가격 나타내기
    const [date, setDate] = useState(new Date());
    const [startDate,setStartDate] = useState("");
    const [endDate,setEndDate] = useState("");
    const [program,setPrograms] = useState(); // 계산 함수에 쓰임

    const formatStartDate = (inputDate) => {
      const parts = inputDate.split('-');
      if (parts.length === 3) {
          const year = parts[0]; 
          const month = parts[1];
          const day = parts[2];
          return [year, month - 1, day];
      }
      return inputDate;
} 
    const openDate = formatStartDate(startDate);
    const closeDate = formatStartDate(endDate);
    

    const getOperaingDate = async() => {
      const SERVER_URL = 'http://localhost:8001/operatingdate'
      await axios.get(SERVER_URL)
      .then(res => {
          setEndDate(res.data[0].end_date)
          setStartDate(res.data[0].start_date)
        })
        .catch(error => console.log(error));
      
    }

    const getPrograms = async() => {
      const SERVER_URL = 'http://localhost:8001/programs'
      await axios.get(SERVER_URL)
      .then(res => {
          console.log(res.data)
          setProgramList(res.data)
        })
        .catch(error => console.log(error));
      
    }

    useEffect(() => {
      getOperaingDate();
      getPrograms();
    }, [])

    // 날짜데이터 형식 만들기 ex)23.10.04
    const formattedDate = dateValue.toLocaleDateString('ko-KR', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      });
      
      const lastIndex = formattedDate.lastIndexOf('.');
      const trimmedDate = formattedDate.substring(0, lastIndex); // 맨 뒤의 점 제거

    const toggleProgram = () =>{   
        setToggleStatus(!toggleStatus);
    }

    const onProgramCountHandler = (count) =>{
        setSelectedCount(count)
        const price = calculatePrice(selectedProgram, count);
        setTotalPrice(price);
    }

    const onClickConfirmModal = () => {
        setConfirmModal(true)
        console.log("선택한 프로그램:",selectedProgram,"선택한시간:",selectedTime,"선택한 날짜",dateValue)
    }
    
    const onClickProgram = (item) =>{
        setSelectedProgram(item)
        setToggleStatus(false)
        const price = calculatePrice(item, selectedCount);
        setTotalPrice(price);
    }

    // 월요일과 수요일만 활성화 또는 비활성화하는 함수
  const tileDisabled = ({ date, view }) => {
    const startDate = new Date(openDate[0], openDate[1], openDate[2]); // 10월 1일
    
    const endDate = new Date(closeDate[0], closeDate[1], closeDate[2]); // 10월 10일

    // startDate와 endDate 사이의 날짜 중에서 월요일 또는 수요일인 경우 활성화, 나머지는 비활성화
    if (date >= startDate && date <= endDate) {
      if (date.getDay() === 1 || date.getDay() === 3) {
        return false; // 활성화
      }
    }
    return true; // 비활성화
  };

  // tileContent 함수를 사용하여 오늘의 날짜에 '오늘' 텍스트를 추가
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const isToday = date.getDate() === new Date().getDate();
      return isToday ? <p style={{ position:'absolute',marginLeft:'10px', fontSize: '8px', marginBottom: '0px' ,zIndex:'99' }}>오늘</p> : null;
    }
    return null;
  };

  // 가격 계산 함수
  const calculatePrice = (program, count) => {
    switch (program) {
      case '프로그램1':
        switch (count) {
          case '1회':
            return (10000).toLocaleString(); // toLocaleString은 10,000식으로 쉼표찍어줌
          case '3회':
            return (25000).toLocaleString();
          default:
            return 0;
        }
      case '프로그램2':
        switch (count) {
          case '1회':
            return (20000).toLocaleString();
          case '3회':
            return (50000).toLocaleString();
          default:
            return 0;
        }
      default:
        return 0;
    }
  };

    // 모든 내용 클릭해야 예약하기 클릭할 수 있게하는 함수
  const reservationConfirm = () => {
    return (
      dateValue !== '' &&
      selectedProgram !== '' && // 프로그램 선택
      selectedCount !== '' && // 횟수 선택
      selectedTime !== ''// 시간 선택
    );
  };

    return (
        <>
        <Header></Header>
        {/* 날짜 선택 */}
        <div class="reservation-category-container">
            <img src='assets/icon_reservation_calendar.png' alt="" class="reservation-category-icon"/>
            <div class="reservation-category">날짜 선택</div>
            
        </div>
        <div class="reservation-content-container">
            <Calendar
                onChange={changeDate}
                formatDay={(locale, date) =>
                    date.toLocaleString('en', { day: 'numeric' })
                }
                value={dateValue}
                // nextLabel={<NextIcon />}
                // prevLabel={<PrevIcon />}
                next2Label={null}
                prev2Label={null}
                showNeighboringMonth={false} // 날짜선택 전까지 비활성화
                tileDisabled={tileDisabled} // 날짜 비활성화
                tileContent={tileContent} // tileContent 함수 사용
            />
        </div>

        {/* 프로그램 선택 */}
        <div class="reservation-category-container">
            <img src='assets/icon_reservation_choose_program.png' alt="" class="reservation-category-icon"/>
            <div class="reservation-category">프로그램 선택</div>
        </div>
        <div class="reservation-content-container">
            <div class="reservation-program-container">
                <div class="reservation-program-selected" >
                    <div>{selectedProgram}</div>
                    <img src="/assets/icon_programlist_toggle.png" alt="" onClick={toggleProgram}/>
                </div>
                {toggleStatus && 
                <div class="reservation-program-contents">
                    {programList.map((item,idx)=>{
                      const isDuplicate = idx > 0 && item.prog_name === programList[idx - 1].prog_name;
                        return(
                          !isDuplicate && (
                            <>
                                <div onClick={()=>onClickProgram(item.prog_name)}>
                                    { item.prog_name }
                                </div>
                                {programList[idx + 1] && <div className="dash" />}
                                {/* {idx !== programList.length - 1 && <div className="dash" />} */}
                            </>
                        )
                      )
                    })}
                </div>
                }
                {/* {selectProgramStatus &&  */}
                    <div class="reservation-category">횟수</div>
                    <div class="signup-buttonContainer">
                        <div class="signup-buttonContents">
                            <button onClick={() => onProgramCountHandler('1회')} className=
                            {selectedCount === '1회' ? 'signup-button-selected' : 'signup-button-unselected'}> 1회 </button>
                            <button onClick={() => onProgramCountHandler('3회')} className=
                            {selectedCount === '3회' ? 'signup-button-selected' : 'signup-button-unselected'}> 3회 </button>
                        </div>
                    </div>
                {/* } */}
                
            </div>
        </div>
        {/* 시간 선택 */}
        <div class="reservation-category-container">
            <img src='assets/icon_reservation_choose_time.png' alt="" class="reservation-category-icon"/>
            <div class="reservation-category">시간 선택</div>
        </div>
        <div class="reservation-content-container">
            <div class="reservation-time-container">
                {timeList.map((item,idx)=>{
                    return(
                        <div  
                        key={idx}
                        className={`reservation-time-content ${selectedTime === item ? 'reservation-time-selected' : ''}`}
                        onClick={() => setSelectedTime(item)}>
                            {item}
                        </div>
                    )
                })}
            </div>
        </div>
        <div class="reservation-category-container pay">
            <img src='assets/icon_reservation_pay.png' alt="" class="reservation-category-icon"/>
            <div class="reservation-category">결제 금액 <span>{totalPrice}원</span> </div>
        </div>
        <div class="reservation-content-container">
                <button className={`${reservationConfirm() ? 'reservation-pay-active' : 'reservation-pay-inactive'}`}
                onClick={onClickConfirmModal}
                disabled={!reservationConfirm()}
                >예약하기</button>
        </div>
        

        {confirmModal && (<ReservationConfirm
        open={confirmModal}
        onClose={() => {
          setConfirmModal(false);
        }}
        dateValue={trimmedDate}
        selectedProgram={selectedProgram}
        selectedTime={selectedTime}
        selectedCount={selectedCount}
        totalPrice={totalPrice}
        
      />)}
        </>
    );
}

export default Reservation;