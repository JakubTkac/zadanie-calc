import styled, { createGlobalStyle } from "styled-components";
import { COLOR, SCREENS } from "../Theme";
import HeadingH1 from "../components/Common/HeadingH1";
import Calculator from "../components/Calculator/Calculator";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: ${COLOR.BACKGROUND_BLUE};
    color: ${COLOR.BLACK};
    box-sizing: border-box;
    font-family: Open-Sans, Helvetica, Sans-Serif,serif;
  }
  input {
    border: none;
    padding: 0;
    margin: 0;
    background: none;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    color: inherit;
    outline: none;
  }
  select{
    background: none;
    border: none;
    padding: 0.5rem;
    font-size: inherit;
    color: inherit;
    cursor: pointer;
  }
`;

const StyledContentWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 20rem;
  height: 100vh;
  @media (max-width: ${SCREENS.XL}) {
    padding: 0 14rem;
  }
  @media (max-width: ${SCREENS.LG}) {
    padding: 0 10rem;
  }
  @media (max-width: ${SCREENS.L}) {
    padding: 0 6rem;
  }
  @media (max-width: ${SCREENS.MD}) {
    padding: 0 4rem;
  }
  @media (max-width: ${SCREENS.SM}) {
    padding: 0 1rem;
  }
  @media (max-width: ${SCREENS.SM}) {
    padding: 4px;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <StyledContentWrapper>
        <HeadingH1>Menova Kalkulacka</HeadingH1>
        <Calculator></Calculator>
      </StyledContentWrapper>
    </>
  );
}

export default App;
