import { Button } from './Button';
import styled from 'styled-components';

const Connect = styled(Button)`
  font-size: 16px;
  padding: 8px 12px;
  width: 100%;
  height: 48px;
  max-width: 224px;
  border-radius: 32px;
`;

const ConnectButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Connect backgroundColor="#0070f3" color="#ffffff" onClick={onClick}>
      Connect
    </Connect>
  );
};

export default ConnectButton;
