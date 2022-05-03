import styled from 'styled-components';

/* eslint-disable-next-line */
export interface PostProps {}

const StyledPost = styled.div`
  color: pink;
`;

export function Post(props: PostProps) {
  return (
    <StyledPost>
      <h1>Welcome to Post!</h1>
    </StyledPost>
  );
}

export default Post;
