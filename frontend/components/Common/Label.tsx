import styled from "styled-components";
import { COLOR, FONT_SIZE, FONT_WEIGHT } from "../../Theme";
import React, { ReactNode } from "react";

interface ILabelProps {
  color?: string;
  fontSize?: string;
  children: ReactNode;
}

const StyledLabel = styled.span<ILabelProps>`
  color: ${(props) => props.color || COLOR.DARKER_GRAY};
  font-size: ${(props) => props.fontSize || FONT_SIZE.L};
  font-weight: ${FONT_WEIGHT.REGULAR};
`;

const Label: React.FC<ILabelProps> = ({ children, color, fontSize }) => {
  return (
    <StyledLabel color={color} fontSize={fontSize}>
      {children}
    </StyledLabel>
  );
};

export default Label;
