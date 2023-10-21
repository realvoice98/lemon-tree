// 모든 "row" 요소를 선택
const rows = document.querySelectorAll('.row');

// 모달 요소를 선택
const modal = document.querySelector('.modal');

// 백그라운드 요소를 선택
const modalBack = document.querySelector('.modal_back');

// 클릭한 로우의 정보를 저장할 객체를 초기화
let clickedRowData = null;

// 각 "row" 요소에 클릭 이벤트를 추가
rows.forEach(row => {
  row.addEventListener('click', function() {
    // 클릭된 "row" 요소 내의 각 데이터를 추출
    const name = row.querySelector('.name').textContent;
    const number = row.querySelector('.number').textContent;
    const sex = row.querySelector('.sex').textContent;
    const std = row.querySelector('.std').textContent;
    const prog = row.querySelector('.prog').textContent;
    const count = row.querySelector('.count').textContent;
    const note = row.querySelector('.note').textContent;
    const datetime = row.querySelector('.date').textContent;
    const status = row.querySelector('.time').textContent;
    const price = row.querySelector('.price').textContent;
    const discount = row.querySelector('.discount').textContent;
    const id = row.querySelector('.id').textContent;

    const dateSlice = datetime.split('/');
    const date = dateSlice[0];
    let time = dateSlice[1];

    time = time.replace(':', ' : ');

    const rowData = {
      name: name,
      phone: number,
      gender: sex,
      std: std,
      prog_name: prog,
      prog_count: count,
      note: note,
      date: date,
      reservation_status: status,
      price: price,
      discount: discount,
      prog_time : time,
      id : id
    };

    // 인풋 태그를 선택
    const nameInput = modal.querySelector('.inputbox.name');
    const numberInput = modal.querySelector('.inputbox.number');
    const sexInput = modal.querySelector('.inputbox.sex');
    const noteInput = modal.querySelector('.inputbox.note');
    const dateInput = modal.querySelector('.inputbox.date');
    const timeInput = modal.querySelector('.inputbox.time');
    const progInput = modal.querySelector('.inputbox.prog');
    const countInput = modal.querySelector('.inputbox.count');
    const stdInput = modal.querySelector('.inputbox.std');
    const priceInput = modal.querySelector('.inputbox.price');
    const discountInput = modal.querySelector('.inputbox.discount');
    const idInput = modal.querySelector('.inputbox.id');

    // 추출한 데이터를 인풋 태그에 설정
    nameInput.value = name;
    numberInput.value = number;
    sexInput.value = sex;
    noteInput.value = note;
    countInput.value = count;
    stdInput.value =std;
    progInput.value = prog;
    dateInput.value = date;
    priceInput.value = price;
    discountInput.value = discount;
    timeInput.value = time;
    idInput.value = id;

    // 클릭된 로우의 데이터를 저장
    clickedRowData = rowData;

    // 백그라운드 활성화
    modalBack.style.display = 'block';
  });
});
// 모달 내부의 클릭 이벤트가 상위로 전파되지 않도록 설정함
modal.addEventListener('click', function(event) {
  event.stopPropagation();
});

// 백그라운드 클릭 시 모달을 닫음
modalBack.addEventListener('click', function () {
  modalBack.style.display = 'none';
});

function confirmBtn(){
  const idInput = modal.querySelector('.inputbox.id');
}
