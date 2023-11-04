import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAllJobsContext } from "../pages/AllJobs";

const PageBtnContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useAllJobsContext();
  const pages = Array.from({ length:numOfPages } , (_, index) => {
    return index + 1
  })

  const {search , pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageNumber = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page' , pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`)
  }

  const addPageButton = ({pageNumber, activeClass}) => {
    return(
      <button className={`btn page-btn ${activeClass && 'active'}`} 
          key={pageNumber}
          onClick={ () => handlePageNumber(pageNumber) }
      >
          {pageNumber}
      </button>
      );
  };

  const renderPageButtons = () => {
    const pageButons = [];
    //  first page
    pageButons.push(addPageButton({pageNumber:1 , activeClass: currentPage === 1}));
    
    // 
    if (  currentPage > 3 ) {
      pageButons.push(<span className="page-btn dots" key="dots-1">...</span>);
    }

    //  one befor current page
    if (  currentPage !== 1 && currentPage !== 2) {
      pageButons.push(addPageButton({pageNumber:currentPage -1, activeClass: false}));
    }

    //  current page
    if (  currentPage !== 1 && currentPage !== numOfPages) {
      pageButons.push(addPageButton({pageNumber:currentPage , activeClass: true}));
    }

    //  one after current page
    if (  currentPage !== numOfPages && currentPage !== numOfPages-1) {
      pageButons.push(addPageButton({pageNumber:currentPage +1  , activeClass: false}));
    }

    // 
    if (  currentPage < numOfPages-2 ) {
      pageButons.push(<span className="page-btn dots" key="dots+1">...</span>);
    }

    // last page
    pageButons.push(addPageButton({pageNumber:numOfPages , activeClass: currentPage === numOfPages}));
    return pageButons
  }
  return (
  <Wrapper>
    <button className="btn prev-btn" onClick={ ()=> {
        let prevPage = currentPage - 1;
        if ( prevPage < 1 )  prevPage = numOfPages;
        handlePageNumber(prevPage); 
    }}>
        <HiChevronDoubleLeft/>
        prev
    </button>
    <div className="btn-container">
       {renderPageButtons()}
    </div>
    <button className="btn next-btn" onClick={ ()=> {
        let nextPage = currentPage + 1;
        if ( nextPage > numOfPages )  nextPage = 1;
        handlePageNumber(nextPage); 
    }}>
        <HiChevronDoubleRight/>
        next
    </button>
  </Wrapper>
  
  );
};

export default PageBtnContainer;
