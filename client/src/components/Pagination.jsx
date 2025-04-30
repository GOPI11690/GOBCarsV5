const Pagination = ({
    postsPerPage,
    totalPosts,
    setCurrentPage,
    currentPage,
  }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    const paginate = (pageNumber, e) => {
        console.log(currentPage);
      e.preventDefault();
       setCurrentPage(pageNumber);
    };
      
  
    return (
        <nav className="flex items-center justify-center -space-x-px" aria-label="Pagination">
      <p className="font-bold">Pages :</p>  <ul className="flex flex-row p-1 gap-3 text-10">
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={` ${currentPage === number ? "active bg-slate-600 font-extrabold" : ""}`}
            >
               <button
          type="button"
          className="min-h-[38px] min-w-[38px] flex justify-center items-center bg-gray-200 text-gray-800 border border-gray-200 py-2 px-3 text-sm first:rounded-s-lg last:rounded-e-lg focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-600 dark:border-neutral-700 dark:text-white dark:focus:bg-neutral-500"
          aria-current="page" onClick={(e)=>paginate(number,e) }
        >
          {number}
        </button></li>))}</ul>
       


        
      </nav>
    );
  };
  export default Pagination;

  