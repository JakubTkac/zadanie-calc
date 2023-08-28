import styled from "styled-components";
import Label from "../Common/Label";
import { IoSwapHorizontal } from "react-icons/io5";
import CalculatorItems from "./CalculatorItems";
import Select from "../Common/Select";
import { useState } from "react";

const StyledCalculatorWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #ffffff;
  border: 2px solid #000000;
  border-radius: 20px;
  box-shadow: 0px 16px 0px 1px #000000;
  padding: 1rem 2rem;
`;

const StyledCalculatorFlex = styled.div`
  display: flex;
  gap: 1rem;
  box-sizing: border-box;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  svg {
    position: relative;
    height: 100%;
    font-size: 2rem;
    top: 10px;
  }
`;

const StyledCurrencyContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 50%;
  height: 100%;
  align-items: flex-start;
  justify-content: center;
  gap: 0.5rem;
`;

const StyledInputCurrencyContainer = styled.div`
  border: 1px solid #555755;
  box-sizing: border-box;
  border-radius: 10px;
  height: 4rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  input {
    width: 100%;
    height: 100%;
  }
  span {
    width: 100%;
    height: 100%;
  }
`;
const Calculator = () => {
  const [selectedAmountRate, setSelectedAmountRate] = useState<number | null>(
    null,
  );
  const [selectedCalculationRate, setSelectedCalculationRate] = useState<
    number | null
  >(null);
  const [selectedAmountName, setSelectedAmountName] = useState<string>("");
  const [selectedCalculationName, setSelectedCalculationName] =
    useState<string>("");

  const handleSelectedAmountRate = (selectedRate: number) => {
    setSelectedAmountRate(selectedRate);
  };
  const handleSelectedCalculationRate = (selectedRate: number) => {
    setSelectedCalculationRate(selectedRate);
  };
  const handleSelectedAmountName = (selectedRate: string) => {
    setSelectedAmountName(selectedRate);
  };
  const handleSelectedCalculationName = (selectedRate: string) => {
    setSelectedCalculationName(selectedRate);
  };

  return (
    <>
      <StyledCalculatorWrapper>
        <StyledCalculatorFlex>
          <StyledCurrencyContainer>
            <Label>Suma</Label>
            <StyledInputCurrencyContainer>
              <input defaultValue={1}></input>
              <Select
                data={[{ name: "EUR", rate: 1 }]}
                disabled={true}
                onSelectRate={handleSelectedAmountRate}
                onSelectName={handleSelectedAmountName}
              ></Select>
            </StyledInputCurrencyContainer>
          </StyledCurrencyContainer>
          <IoSwapHorizontal></IoSwapHorizontal>
          <StyledCurrencyContainer>
            <Label>Prepocet</Label>
            <StyledInputCurrencyContainer>
              <span></span>
              <Select
                data={CalculatorItems.rates}
                disabled={false}
                onSelectRate={handleSelectedCalculationRate}
                onSelectName={handleSelectedCalculationName}
              ></Select>
            </StyledInputCurrencyContainer>
          </StyledCurrencyContainer>
        </StyledCalculatorFlex>
        <StyledCalculatorFlex>
          <h2>{`${selectedAmountRate} ${selectedAmountName} = ${selectedCalculationRate} ${selectedCalculationName}`}</h2>
          <button>Prepocitat</button>
        </StyledCalculatorFlex>
      </StyledCalculatorWrapper>
    </>
  );
};

export default Calculator;
