// 모든 "row" 요소를 선택합니다.
const rows = document.querySelectorAll('.row');

// 모달 요소를 선택합니다.
const modal = document.querySelector('.modal');

// 백그라운드 요소를 선택합니다.
const modalBack = document.querySelector('.modal_back');

// 클릭한 로우의 정보를 저장할 객체를 초기화합니다.
let clickedRowData = null;

// 각 "row" 요소에 클릭 이벤트를 추가합니다.
rows.forEach(row => {
  row.addEventListener('click', function() {
    // 클릭된 "row" 요소 내의 각 데이터를 추출합니다.
    const name = row.querySelector('.name').textContent;
    const number = row.querySelector('.number').textContent;
    const sex = row.querySelector('.sex').textContent;
    const std = row.querySelector('.std').textContent;
    const prog = row.querySelector('.prog').textContent;
    const count = row.querySelector('.count').textContent;
    const note = row.querySelector('.note').textContent;
    const date = row.querySelector('.date').textContent;
    const time = row.querySelector('.time').textContent;

    // 추출한 데이터를 객체로 만듭니다.
    const rowData = {
      name: name,
      number: number,
      sex: sex,
      std: std,
      prog: prog,
      count: count,
      note: note,
      date: date,
      time: time
    };

    // 인풋 태그를 선택합니다.
    const nameInput = modal.querySelector('.inputbox.name');
    const numberInput = modal.querySelector('.inputbox.number');
    const sexInput = modal.querySelector('.inputbox.sex');
    const noteInput = modal.querySelector('.inputbox.note');
    const dateInput = modal.querySelector('.inputbox.date');
    const progInput = modal.querySelector('.inputbox.prog');
    const countInput = modal.querySelector('.inputbox.count');
    const stdInput = modal.querySelector('.inputbox.std');

    // 추출한 데이터를 인풋 태그에 설정합니다.
    nameInput.value = name;
    numberInput.value = number;
    sexInput.value = sex;
    noteInput.value = note;
    countInput.value = count;
    stdInput.value =std;
    progInput.value = prog;
    dateInput.value = date;

    // 클릭된 로우의 데이터를 저장합니다.
    clickedRowData = rowData;

    // 백그라운드를 보이게 합니다.
    modalBack.style.display = 'block';
  });
});
// 모달 내부의 클릭 이벤트가 상위로 전파되지 않도록 설정합니다.
modal.addEventListener('click', function(event) {
  event.stopPropagation();
});

// 백그라운드 클릭 시 모달을 닫습니다.
modalBack.addEventListener('click', function () {
  modalBack.style.display = 'none';
});
