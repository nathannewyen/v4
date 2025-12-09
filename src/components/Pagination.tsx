"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Pagination component with Previous/Next buttons and page indicator
const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  // Check if navigation buttons should be disabled
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  // Navigate to previous page
  const handlePreviousClick = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  // Navigate to next page
  const handleNextClick = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  // Base button styling matching existing design
  const buttonBaseStyle =
    "px-3 py-2 text-sm font-mono bg-white dark:bg-[#2a2a3e] border border-[#e0e0e0] dark:border-[#3a3a4e] transition-colors";

  // Active button styling with hover states
  const buttonActiveStyle = `${buttonBaseStyle} text-[#1A2234] dark:text-white hover:bg-[#d0d0d0] dark:hover:bg-[#3a3a4e] cursor-pointer`;

  // Disabled button styling
  const buttonDisabledStyle = `${buttonBaseStyle} text-[#999] dark:text-[#555] opacity-50 cursor-not-allowed`;

  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      {/* Previous button */}
      <button
        onClick={handlePreviousClick}
        disabled={isFirstPage}
        className={isFirstPage ? buttonDisabledStyle : buttonActiveStyle}
      >
        ← Previous
      </button>

      {/* Page indicator */}
      <span className="text-sm font-mono text-[#57606a] dark:text-[#8b949e]">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next button */}
      <button
        onClick={handleNextClick}
        disabled={isLastPage}
        className={isLastPage ? buttonDisabledStyle : buttonActiveStyle}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
