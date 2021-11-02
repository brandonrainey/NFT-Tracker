import React, { useEffect, useState } from "react";

export default function Pagination({
  data,
  pageIndex,
  setPageIndex,
  pageNumber,
  setPageNumber,
  topRef,
  setCustom,
  custom, 
  scrollToTop
}) {
  const [disabledPrev, setDisabledPrev] = useState(true);
  const [disabledNext, setDisabledNext] = useState(false);

  

  const handleClickPrev = () => {
    setPageIndex(pageIndex - 12);
    setPageNumber(pageNumber - 1);
    scrollToTop()
  };

  const handleClickNext = () => {
    setPageNumber(pageNumber + 1);
    setPageIndex(pageIndex + 12);
    scrollToTop()
  };

  useEffect(() => {
    if (data.assets.length < 8) {
      setDisabledNext(true);
    } else {
      setDisabledNext(false);
    }
    if (pageNumber !== 1) {
      setDisabledPrev(false);
    } else {
      setDisabledPrev(true);
    }

    
    
    
  }, [data]);

  return (
    <div className="flex justify-center">
      <div className="flex">
        <button
          className="items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          disabled={disabledPrev}
          onClick={handleClickPrev}
        >
          prev
        </button>
        <nav>
          <ul className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
            {pageNumber}
          </ul>
        </nav>
        <button
          className="items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          disabled={disabledNext}
          onClick={handleClickNext}
        >
          next
        </button>
      </div>
    </div>
  );
}
