export default function Pagination({ currentPage, onPageChange,maxVisiblePages, totalPages}) {

  const handlePageChange = (page) => {
    onPageChange(page); // Actualiza la página actual en `CategoriaProductos`
  };

  const handleNext = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  // Define el número máximo de botones de página visibles
  let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
  let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(endPage - maxVisiblePages + 1, 1);
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
