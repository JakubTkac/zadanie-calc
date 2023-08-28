import styled from "styled-components";
import { COLOR, FONT_SIZE, FONT_WEIGHT, SCREENS } from "../../Theme";
import { ReactNode } from "react";

interface IHeadingH1Props {
  color?: string;
  fontSize?: string;
  children: ReactNode;
}

const StyledHeadingH1 = styled.h1<IHeadingH1Props>`
  color: ${(props) => props.color || COLOR.WHITE_HEADING};
  font-size: ${(props) => props.fontSize || FONT_SIZE.XXXXL};
  font-weight: ${FONT_WEIGHT.BOLDEST};
  margin-bottom: 4rem;
`;

const HeadingH1: React.FC<IHeadingH1Props> = ({
  children,
  color,
  fontSize,
}) => {
  return (
    <StyledHeadingH1 color={color} fontSize={fontSize}>
      {children}
    </StyledHeadingH1>
  );
};

export default HeadingH1;
