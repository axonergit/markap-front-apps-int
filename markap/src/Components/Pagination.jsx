export default function Pagination({ currentPage, onPageChange, maxVisiblePages = 10, totalPages }) {

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const handleNext = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  let startPage, endPage;
  
  if (totalPages <= maxVisiblePages) {
    // Caso donde el total de páginas es menor o igual al máximo visible
    startPage = 1;
    endPage = totalPages;
  } else {
    // Calculamos el inicio y fin para más de maxVisiblePages total
    const maxPagesBeforeCurrentPage = Math.floor(maxVisiblePages / 2);
    const maxPagesAfterCurrentPage = Math.ceil(maxVisiblePages / 2) - 1;
    startPage = currentPage - maxPagesBeforeCurrentPage;
    endPage = currentPage + maxPagesAfterCurrentPage;

    if (startPage < 1) {
      // Ajuste si el inicio es menor que 1
      startPage = 1;
      endPage = maxVisiblePages;
    } else if (endPage > totalPages) {
      // Ajuste si el final es mayor que el total de páginas
      endPage = totalPages;
      startPage = totalPages - maxVisiblePages + 1;
    }
  }

  return (
    
    <nav role="navigation" aria-label="Pagination Navigation">
      <ul className="flex list-none items-center justify-center text-sm text-slate-700 md:gap-1">
        <li>
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            aria-label="Goto Previous Page"
            className="inline-flex h-10 items-center justify-center gap-4 rounded stroke-slate-700 px-4 text-sm font-medium text-slate-700 transition duration-300 hover:bg-emerald-50 hover:stroke-emerald-500 hover:text-emerald-500 focus:bg-emerald-50 focus:stroke-emerald-600 focus:text-emerald-600 focus-visible:outline-none"
          >
            Prev
          </button>
        </li>

        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <li key={startPage + index}>
            <button
              onClick={() => handlePageChange(startPage + index)}
              aria-label={`Goto Page ${startPage + index}`}
              className={`h-10 items-center justify-center rounded px-4 text-sm font-medium transition duration-300 md:inline-flex ${
                currentPage === startPage + index
                  ? "bg-emerald-500 text-white"
                  : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-500"
              }`}
            >
              {startPage + index}
            </button>
          </li>
        ))}

        <li>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            aria-label="Goto Next Page"
            className="inline-flex h-10 items-center justify-center gap-4 rounded stroke-slate-700 px-4 text-sm font-medium text-slate-700 transition duration-300 hover:bg-emerald-50 hover:stroke-emerald-500 hover:text-emerald-500 focus:bg-emerald-50 focus:stroke-emerald-600 focus:text-emerald-600 focus-visible:outline-none"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
