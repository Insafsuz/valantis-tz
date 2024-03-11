import { FC } from "react";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className={styles.container}>
      <button
        disabled={currentPage === 1}
        className={styles.button}
        onClick={goToPrevPage}
      >
        Previois page
      </button>
      <span className={styles.counter}>Page {currentPage}</span>
      <button
        disabled={currentPage === totalPages}
        className={styles.button}
        onClick={goToNextPage}
      >
        Next page
      </button>
    </div>
  );
};

export { Pagination };
