import { useState, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';

import { AxiosSearchBook } from '../../../api/AxiosSearchBook.js';
import { BookAtom } from '../../component/atom/BookAtom.jsx';
import BookList from '../../component/BookList.jsx';
import Loading from '../../component/Loading.jsx';
import SearchBar from '../../component/SearchBar.jsx';
import Paging from '../Paging/Paging.jsx';

const SearchBook = () => {
  const [bookList, setBookList] = useState([]);
  const [searchText, setSearchText] = useRecoilState(BookAtom);
  const [pageInfo, setPageInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const urlQuery = useLocation();

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지, 기본 값 1
  const [count, setCount] = useState(0); // 책 총 개수
  const [bookPerPage] = useState(5); // 한 페이지에 보여질 책 개수
  const [indexOfFirstBook, setIndexOfFirstBook] = useState(0); // 현재 페이지의 첫번째 아이템 인덱스
  const [indexOfLastBook, setIndexOfLastBook] = useState(0); // 현재 페이지의 마지막 아이템 인덱스
  const [currentBook, setCurrentBook] = useState([]); // 현재 페이지에서 보여지는 책들

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query') || '';
  const text = queryParams.get('searchField') || '';

  const fetchData = async () => {
    try {
      const response = await AxiosSearchBook({ searchQuery, text, page: currentPage });
      setBookList(response?.data?.results);
      setPageInfo(response?.data?.pageInfo);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery, currentPage, urlQuery.search]);

  const setPage = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    setCount(pageInfo?.totalElements);
    setIndexOfLastBook(currentPage * bookPerPage);
    setIndexOfFirstBook(indexOfLastBook - bookPerPage);
    setCurrentBook(bookList?.slice(indexOfFirstBook, indexOfLastBook));
  }, [count, currentPage, indexOfLastBook, indexOfFirstBook, bookList, bookPerPage]);

  const navigate = useNavigate();

  const handleSearch = (searchKeyWord) => {
    navigate(`/books?query=${encodeURIComponent(searchKeyWord)}&searchField=${searchText}`);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <Container>
      <SearchBar onSearch={handleSearch} />
      <ResultTextBox>
        <ResultName>{`'${searchQuery}'`}</ResultName>
        <ResultText>{`에 대한 ${pageInfo?.totalElements}개의 검색 결과`}</ResultText>
      </ResultTextBox>
      <ResultBookList>
        {bookList.map((item, index) => (
          <BookList data={item} key={index} isSearch={true} />
        ))}
      </ResultBookList>
      <PagingArea>{count && <Paging page={currentPage} count={count} setPage={setPage} />}</PagingArea>
    </Container>
  );
};

export default SearchBook;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 47px 0;
`;

const ResultTextBox = styled.div`
  display: flex;
  width: 900px;
  padding: 20px 0;
  font-size: 20px;
  margin-top: 17px;
`;

const ResultName = styled.p`
  color: ${({ theme }) => theme.colors.MINT100};
`;

const ResultText = styled.p``;

const ResultBookList = styled.div`
  display: flex;
  flex-direction: column;
  width: 900px;
`;

const PagingArea = styled.div`
  margin: 50px 0;
`;
