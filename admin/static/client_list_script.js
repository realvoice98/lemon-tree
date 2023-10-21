function searchOnEnter(event) {
    if (event.key === 'Enter') {
        const searchTerm = event.target.value.toLowerCase();
        const rows = document.querySelectorAll('.row');

        rows.forEach(function(row) {
            const name = row.querySelector('.name_client').textContent.toLowerCase();
            const number = row.querySelector('.number_client').textContent.toLowerCase();

            if (searchTerm === '' || name.includes(searchTerm) || number.includes(searchTerm)) {
                row.style.display = 'flex';
            } else {
                row.style.display = 'none';
            }
        });
    }
}

function tablet_searchOnEnter(event) {
    if (event.key === 'Enter') {
        const searchTerm = event.target.value.toLowerCase();
        const rows = document.querySelectorAll('.row');

        rows.forEach(function(row) {
            const name = row.querySelector('.name_client').textContent.toLowerCase();
            const number = row.querySelector('.number_client').textContent.toLowerCase();

            if (searchTerm === '' || name.includes(searchTerm) || number.includes(searchTerm)) {
                row.style.display = 'flex';
            } else {
                row.style.display = 'none';
            }
        });
    }
}
