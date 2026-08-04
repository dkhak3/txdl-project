function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];

  // luôn hiện trang đầu
  pages.push(1);

  let start = Math.max(2, currentPage - 2);
  let end = Math.min(totalPages - 1, currentPage + 2);

  if (start > 2) {
    pages.push("...");
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages - 1) {
    pages.push("...");
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 p-8">
      {/* Previous */}

      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="
          rounded-xl
          bg-gray-100
          px-4
          py-2
          font-bold
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        ◀
      </button>

      {pages.map((page, index) => {
        if (page === "...") {
          return (
            <span key={`dot-${index}`} className="px-2 font-bold">
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              rounded-xl
              px-4
              py-2
              font-bold
              transition

              ${
                currentPage === page
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 hover:bg-orange-100"
              }
            `}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="
          rounded-xl
          bg-gray-100
          px-4
          py-2
          font-bold
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        ▶
      </button>
    </div>
  );
}

export default Pagination;
