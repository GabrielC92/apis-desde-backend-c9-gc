let formSearch = document.getElementById('form-search');
let search = document.getElementById('search');
let buscar = document.getElementById('buscar');
let titulo = document.getElementById('titulo');

console.log("search.js success!");
formSearch.addEventListener('submit', e => {
    e.preventDefault();
    search.value !== "" && formSearch.submit();
})

buscar.addEventListener('submit', e => {
    e.preventDefault();
    if (titulo.value !== "") {
        buscar.submit();
    }
})