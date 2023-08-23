import { styled } from 'styled-components';

const ChatParticipant = ({ children, onlineUser }) => {
  return (
    <ParticipantContainer>
      <ParticipantTitle>{children}</ParticipantTitle>
      <ParticipantContentBox>
        {onlineUser && onlineUser.map((data) => <ParticipantContent>{data}</ParticipantContent>)}
      </ParticipantContentBox>
    </ParticipantContainer>
  );
};

export default ChatParticipant;

const ParticipantContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
`;

const ParticipantTitle = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.MINT70};
  padding: 8px 10px;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.WHITE};
`;

const ParticipantContentBox = styled.div`
  width: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ParticipantContent = styled.div`
  padding: 8px 10px;
  font-size: 15px;
`;
