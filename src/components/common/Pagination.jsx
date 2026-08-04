function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = [];

  // luôn hiện trang đầu
  pages.push(1);

  let start = Math.max(2, currentPage - 2);
  let end = Math.min(totalPages - 1, currentPage + 2);

  // Nếu gần đầu
  if (currentPage <= 4) {
    end = Math.min(6, totalPages - 1);
  }

  // Nếu gần cuối
  if (currentPage >= totalPages - 3) {
    start = Math.max(2, totalPages - 5);
  }

  if (start > 2) {
    pages.push("left-dot");
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages - 1) {
    pages.push("right-dot");
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return (
    <div
      className="
        mt-8
        flex
        flex-wrap
        items-center
        justify-center
        gap-2
      "
    >
      {/* Previous */}

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-lg
          border
          border-gray-300
          bg-white
          text-gray-600
          transition
          hover:border-orange-500
          hover:text-orange-500
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        ◀
      </button>

      {pages.map((page, index) => {
        if (page === "left-dot" || page === "right-dot") {
          return (
            <span
              key={index}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                text-gray-500
              "
            >
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              flex
              h-10
              min-w-[40px]
              items-center
              justify-center
              rounded-lg
              border
              transition

              ${
                currentPage === page
                  ? "border-orange-500 bg-orange-500 text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:border-orange-500 hover:text-orange-500"
              }
            `}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-lg
          border
          border-gray-300
          bg-white
          text-gray-600
          transition
          hover:border-orange-500
          hover:text-orange-500
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
