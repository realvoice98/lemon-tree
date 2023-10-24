// SVG 아이콘을 클릭할 때 form을 제출하는 함수
document.getElementById('searchIcon').addEventListener('click', function() {
  document.getElementById('searchForm').submit();
});
document.getElementById('searchIcon2').addEventListener('click', function() {
  document.getElementById('searchForm2').submit();
});

function searchOnEnter(event) {
    if (event.key === 'Enter') {
        const searchData = document.querySelector('.searchInput').value;
        const url = `/admin/client_list/search?searchData=${encodeURIComponent(searchData)}`;
        window.location.href = url;
        return false; // 폼 제출을 중단
      }
}

function tablet_searchOnEnter(event) {
    if (event.key === 'Enter') {
        const searchData = document.querySelector('.searchInput').value;
        const url = `/admin/client_list/search?searchData=${encodeURIComponent(searchData)}`;
        window.location.href = url;
        return false; // 폼 제출을 중단
      }
}


