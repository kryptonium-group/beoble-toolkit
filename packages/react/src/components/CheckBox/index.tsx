import styled from 'styled-components';

/* eslint-disable-next-line */
export interface CheckBoxProps {}

const StyledCheckBox = styled.div`
  color: pink;
`;

export function CheckBox(props: CheckBoxProps) {
  return (
    <StyledCheckBox>
      <h1>Welcome to CheckBox!</h1>
    </StyledCheckBox>
  );
}

export default CheckBox;
