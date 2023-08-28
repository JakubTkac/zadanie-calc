import styled from "styled-components";
import { ReactNode } from "react";
import { COLOR, FONT_SIZE, FONT_WEIGHT, SCREENS } from "../../Theme";

interface IButtonProps {
  onClick: () => void;
  bgcolor?: string;
  color?: string;
  children: ReactNode;
}

const StyledButton = styled.button<IButtonProps>`
  position: relative;
  background-color: ${(props) => props.bgcolor || COLOR.BACKGROUND_BLUE};
  color: ${(props) => props.bgcolor || COLOR.WHITE_HEADING};
  width: 60%;
  padding: 1rem 1rem;
  font-weight: ${FONT_WEIGHT.BOLDER};
  border: 1px solid ${COLOR.BLACK};
  border-radius: 3rem;
  cursor: pointer;
  left: 1.5rem;
  font-size: ${FONT_SIZE.L};
  @media (max-width: ${SCREENS.LG}) {
    width: 100%;
  }
`;

const Button: React.FC<IButtonProps> = ({
  onClick,
  bgcolor,
  children,
  color,
}) => {
  return (
    <StyledButton onClick={onClick} bgcolor={bgcolor} color={color}>
      {children}
    </StyledButton>
  );
};

export default Button;
