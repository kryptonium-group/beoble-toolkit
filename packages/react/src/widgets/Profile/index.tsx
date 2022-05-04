import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Button from '../../components/Button';

/* eslint-disable-next-line */
export interface ProfileProps {}

const StyledProfile = styled.div`
  color: pink;
`;

export function Profile(props: ProfileProps) {
  const nextBody = document.getElementById('__next');
  const reactBody = document.getElementById('root');
  const TestButton = <Button />;

  ReactDOM.render(TestButton, reactBody);

  return (
    <StyledProfile>
      <Button>on</Button>
      <h1>Welcome to Profile!</h1>
    </StyledProfile>
  );
}

export default Profile;
