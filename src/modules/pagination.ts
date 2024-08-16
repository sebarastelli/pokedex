import { loadPokemons } from './pokemonLoader';

export let currentPage: number = 0;
export let pokePerPage: number = 20;
const maxVisiblePages: number = 7;

export function updatePagination(): void {
  const $prevPage = document.getElementById("prevPage") as HTMLButtonElement;
  const $nextPage = document.getElementById("nextPage") as HTMLButtonElement;
  const $paginationContainer = document.querySelector<HTMLUListElement>(".pagination");
  
  if (!$paginationContainer || !$prevPage || !$nextPage) return;

  const totalPages = Math.ceil(1000 / pokePerPage);
  const halfVisiblePages = Math.floor(maxVisiblePages / 2);
  let minPage = Math.max(currentPage - halfVisiblePages, 0);
  let maxPage = Math.min(minPage + maxVisiblePages - 1, totalPages - 1);

  if (maxPage - minPage < maxVisiblePages - 1) {
    minPage = Math.max(maxPage - maxVisiblePages + 1, 0);
  }

  $paginationContainer.innerHTML = "";
  $paginationContainer.appendChild($prevPage);

  for (let i = minPage; i <= maxPage; i++) {
    const $pageItem = document.createElement("li");
    $pageItem.classList.add("page-item");

    const $pageLink = document.createElement("a");
    $pageLink.classList.add("page-link");
    $pageLink.href = "#";
    $pageLink.textContent = (i + 1).toString();
    $pageLink.dataset.page = i.toString();

    $pageLink.addEventListener("click", (event) => {
      event.preventDefault();
      const target = event.target as HTMLAnchorElement;
      const page = parseInt(target.dataset.page!);
      setPage(page);
    });

    $pageItem.appendChild($pageLink);

    if (i === currentPage) {
      $pageItem.classList.add("active");
    }

    $paginationContainer.appendChild($pageItem);
  }

  $paginationContainer.appendChild($nextPage);
  $prevPage.classList.toggle("disabled", currentPage === 0);
  $nextPage.classList.toggle("disabled", currentPage === totalPages - 1);
}

export function setPage(page: number): void {
  currentPage = page;
  const offset = currentPage * pokePerPage;
  loadPokemons(offset, pokePerPage);
  updatePagination();
}