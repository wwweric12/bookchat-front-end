import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { AxiosBoardCategory } from '../../api/Board/AxiosBoardCategory';
import { AxiosBoardList } from '../../api/Board/AxiosBoardList';

import { BoardAtom } from './atom/BoardAtom.jsx';

const CategoryButton = ({ children, category, callbackFunction, state, setState, location, page }) => {
  const searchKeyWord = useRecoilValue(BoardAtom);
  const handleClick = () => {
    if (category === 'ALL') {
      AxiosBoardList({ callbackFunction, location, page });
    } else {
      AxiosBoardCategory({ category, callbackFunction, searchKeyWord, location, page });
    }
    setState({
      SOLUTION: false,
      CONCEPT: false,
      TYPO: false,
      QUESTION: false,
      ALL: false,
      [category]: true,
    });
  };

  return (
    <Button $state={state[category]} onClick={handleClick}>
      {children}
    </Button>
  );
};

export default CategoryButton;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 90px;
  height: 40px;
  font-size: 15px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border-radius: 15px;
  background-color: ${(props) => (props.$state ? props.theme.colors.LIGHTGRAY : props.theme.colors.WHITE)};
`;
