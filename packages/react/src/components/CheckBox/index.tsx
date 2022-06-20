import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsCheckLg } from 'react-icons/bs';
import { Colors, SizeProps } from '../../styles';

/* eslint-disable-next-line */
export interface CheckBoxProps extends SizeProps {
  onClick?: (value?: boolean) => void;
  backgroundColor?: string;
  value?: boolean;
  onChange?: (value: boolean) => void;
}

interface ContainerProps extends SizeProps {
  clicked?: boolean;
  backgroundColor: string;
}

const Container = styled.div<ContainerProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  border: 1px solid ${Colors.border.faint};
  background-color: ${({ clicked, backgroundColor }) =>
    clicked ? backgroundColor : Colors.background.white};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    border: 1px solid ${Colors.border.highlight};
  }
`;

export const CheckBox: FC<CheckBoxProps> = ({
  size,
  onClick,
  backgroundColor = Colors.background.messageTint,
  value,
  onChange,
}) => {
  const [clicked, setClicked] = useState(value ?? false);

  const toggle = () => {
    setClicked(!clicked);
    onClick && onClick(clicked);
  };

  useEffect(() => {
    onChange && onChange(clicked);
  }, [clicked]);

  return (
    <Container
      onClick={toggle}
      {...{ size, backgroundColor }}
      clicked={value ?? clicked}
    >
      {(value ?? clicked) && (
        <BsCheckLg color="#fff" size={size && 0.6 * size} />
      )}
    </Container>
  );
};

export default CheckBox;
