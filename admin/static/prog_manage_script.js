const management_date = document.querySelector('.management_date');
const date_container = document.querySelector('.date_container');
const startDateInput = document.getElementById('startDateInput');
const endDateInput = document.getElementById('endDateInput');
const modal = document.querySelector('.modal');
const modalBack = document.querySelector('.modal_back');

management_date.addEventListener('click', function () {
    management_date.style.display = 'none';
    date_container.style.display = 'block';
});

function extractDates() {
    const startDate = startDateInput.value; // 시작일 (yyyy-mm-dd 형식)
    const endDate = endDateInput.value;     // 종료일 (yyyy-mm-dd 형식)

    // 시작일과 종료일이 모두 입력되었는지 확인
    if (!startDate || !endDate) {
        alert('시작일과 종료일을 모두 입력해주세요.');
        return; // 값이 없으면 함수를 종료하고 모달 창을 열어둠
    }else{
        alert("운영날짜를 " + startDate + " ~ " + endDate + "로 설정합니다.");
    }

    // 하이픈(-) 제거 후 마침표(.) 추가
    const formattedStartDate = startDate.replace(/-/g, '.');
    const formattedEndDate = endDate.replace(/-/g, '.');

    console.log('시작일:', formattedStartDate);
    console.log('종료일:', formattedEndDate);

    date_container.style.display = 'none';
    management_date.style.display = 'block';
}

// 페이지 로드 시 시작일을 현재 날짜로 설정
window.onload = function() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    startDateInput.value = `${year}-${month}-${day}`;
}
const modifyButtons = document.querySelectorAll('.row_text.modify');
    
const deleteButtons = document.querySelectorAll('.row_text.del');

modifyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const row = button.parentElement.parentElement; // 수정 버튼의 부모 요소의 부모 요소 (행)
        const serviceName = row.querySelector('.row_text.prog').textContent;
        const count = row.querySelector('.row_text.count').textContent;
        const price = row.querySelector('.row_text.price').textContent;
        const discount = row.querySelector('.row_text.discount').textContent;
        
        // 모달 내의 인풋 상자를 선택
        const modalProgramInput = document.querySelector('.progForm .inputbox.prog');
        const modalCountInput = document.querySelector('.progForm .inputbox.number');
        const modalPriceInput = document.querySelector('.progForm .inputbox.price');
        const modalDiscountInput = document.querySelector('.progForm .inputbox.discount');

        // 모달 내의 인풋 상자에 값을 설정
        modalProgramInput.value = serviceName;
        modalCountInput.value = count;
        modalPriceInput.value = price;
        modalDiscountInput.value = discount;

        modalBack.style.display = 'block';
    });
});
modal.addEventListener('click', function(event) {
    event.stopPropagation();
  });
  
modalBack.addEventListener('click', function () {
    modalBack.style.display = 'none';
  });

deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
        const row = button.parentElement.parentElement; // 삭제 버튼의 부모 요소의 부모 요소 (행)
        const serviceName = row.querySelector('.row_text.prog').textContent;
        const count = row.querySelector('.row_text.count').textContent;
        const price = row.querySelector('.row_text.price').textContent;
        const discount = row.querySelector('.row_text.discount').textContent;
        
        console.log("Service Name:", serviceName);
        console.log("Count:", count);
        console.log("Price:", price);
        console.log("Discount:", discount);
    });
});