import styled from "styled-components";
import Label from "../Common/Label";

const StyledCalculatorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #ffffff;
  border: 2px solid #000000;
  border-radius: 20px;
  box-shadow: 0px 16px 0px 1px #000000;
`;

const StyledCalculatorFlex = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledCurrencyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const StyledInputCurrencyContainer = styled.div`
  border: 1px solid #555755;
  border-radius: 2px;
  display: flex;
  width: 60%;
  justify-content: space-between;
  align-items: center;
  margin: 0 4rem;
`;
const Calculator = () => {
  return (
    <>
      <StyledCalculatorWrapper>
        <StyledCalculatorFlex>
          <StyledCurrencyContainer>
            <Label>Suma</Label>
            <StyledInputCurrencyContainer>
              <input></input>
              <div>
                <select name="" id=""></select>
                <span>22</span>
              </div>
            </StyledInputCurrencyContainer>
          </StyledCurrencyContainer>
          <StyledCurrencyContainer>
            <Label>Prepocet</Label>
            <StyledInputCurrencyContainer>aaa</StyledInputCurrencyContainer>
          </StyledCurrencyContainer>
        </StyledCalculatorFlex>
        <StyledCalculatorFlex>
          <h2>Kuz</h2>
          <button>Prepocitat</button>
        </StyledCalculatorFlex>
      </StyledCalculatorWrapper>
    </>
  );
};

export default Calculator;
