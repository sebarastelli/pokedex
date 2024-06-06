import { currentPage, pokePerPage, setPage } from './modules/pagination.js';

document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 0) {
    setPage(currentPage - 1);
  }
});

document.getElementById("nextPage").addEventListener("click", () => {
  const totalPages = Math.ceil(1000 / pokePerPage);
  if (currentPage < totalPages - 1) {
    setPage(currentPage + 1);
  }
});

function init() {
  setPage(currentPage);
}

init();