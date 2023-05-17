import { BiDotsHorizontalRounded } from 'react-icons/bi';
import styled from 'styled-components';

const DotIcon = () => {
  return (
    <AlignCenter>
      <Dot />
    </AlignCenter>
  );
};

const Dot = styled(BiDotsHorizontalRounded)`
  color: black;
`;

const AlignCenter = styled.div`
  display: flex;
  justify-content: center;
`;

export default DotIcon;
