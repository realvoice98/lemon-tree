function searchOnEnter(event) {
    if (event.key === 'Enter') {
        const searchData = document.querySelector('.searchInput').value;
        const url = `/admin/client_list/client_search?searchData=${encodeURIComponent(searchData)}`;
        window.location.href = url;
        return false; // 폼 제출을 중단
      }
}

function tablet_searchOnEnter(event) {
    if (event.key === 'Enter') {
        const searchData = document.querySelector('.searchInput').value;
        const url = `/admin/client_list/client_search?searchData=${encodeURIComponent(searchData)}`;
        window.location.href = url;
        return false; // 폼 제출을 중단
      }
}
