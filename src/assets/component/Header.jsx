import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import Logo from '../images/Logo.svg';
import Logout from '../images/Logout.svg';

const Header = ({ isLoggined, setIsLoggined }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.removeItem('accessToken');
    setIsLoggined(false);
    alert('로그아웃 하셨습니다!');
    navigate('/login');
  };

  return (
    <>
      <Container>
        <LogoImg src={Logo} alt="로고 이미지" onClick={() => navigate('/')} />
        {isLoggined && (
          <button onClick={handleLogin}>
            <Exit src={Logout} alt="로그아웃 이미지" />
          </button>
        )}
      </Container>
    </>
  );
};

export default Header;

const Container = styled.div`
  width: 100%;
  height: 116px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  padding: 33px 250px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.BROWN};
`;

const LogoImg = styled.img`
  width: 190px;
  height: 50px;
  &:hover {
    cursor: pointer;
  }
`;

const Exit = styled.img`
  width: 50px;
  height: 50px;
`;
