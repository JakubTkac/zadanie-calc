import styled from "styled-components";
import Label from "../Common/Label";
import { IoSwapHorizontal } from "react-icons/io5";
import Select, { IRate } from "../Common/Select";
import { useEffect, useState } from "react";
import Button from "../Common/Button";
import { COLOR, FONT_SIZE, SCREENS } from "../../Theme";

const StyledCalculatorWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${COLOR.WHITE};
  border: 2px solid ${COLOR.BLACK};
  border-radius: 20px;
  box-shadow: 0px 16px 0px 1px ${COLOR.BLACK};
  padding: 1rem 2rem;
  @media (max-width: ${SCREENS.XS}) {
    padding: 1rem 0.5rem;
  }
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
    font-size: ${FONT_SIZE.XXXL};
    top: 10px;
  }
  h2 {
    width: 50%;
    @media (max-width: ${SCREENS.LG}) {
      width: 100%;
    }
  }
  @media (max-width: ${SCREENS.LG}) {
    flex-direction: column;
    align-items: flex-end;
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
  @media (max-width: ${SCREENS.LG}) {
    width: 100%;
  }
`;

const StyledInputCurrencyContainer = styled.div`
  border: 1px solid ${COLOR.DARKER_GRAY};
  box-sizing: border-box;
  border-radius: 10px;
  height: 4rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  input {
    color: ${COLOR.DARK_GRAY};
    appearance: textfield;
    width: 100%;
    height: 100%;
  }
  span {
    color: ${COLOR.DARK_GRAY};
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  @media (max-width: ${SCREENS.XS}) {
    flex-direction: column;
  }
`;
const StyledButtonWrapper = styled.div`
  width: 50%;
  @media (max-width: ${SCREENS.LG}) {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-right: 2rem;
  }
  @media (max-width: ${SCREENS.XS}) {
    padding-right: 1.5rem;
  }
`;

interface ICalculatorData {
  date: string;
  rate: {
    [currencyCode: string]: number;
  };
  rates: IRate[];
}

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
  const [calculatedResult, setCalculatedResult] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState<number>(1);
  const [calculatorItems, setCalculatorItems] =
    useState<ICalculatorData | null>(null);

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
  const handleCalculate = () => {
    if (selectedCalculationRate !== null) {
      const result = inputValue * selectedCalculationRate;
      setCalculatedResult(result);
    }
  };

  const handleSwapValues = () => {};

  useEffect(() => {
    handleCalculate();
  }, [inputValue, selectedCalculationRate]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/EU?api-key=f32e39c8-caeb-4444-bca0-1b1a6efb4b34",
      );
      const data = await response.json();
      setCalculatorItems(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <StyledCalculatorWrapper>
        <StyledCalculatorFlex>
          <StyledCurrencyContainer>
            <Label>Suma</Label>
            <StyledInputCurrencyContainer>
              <input
                value={inputValue}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (/^\d*\.?\d{0,2}$/.test(newValue)) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    setInputValue(newValue);
                  }
                }}
                type="text"
                min="0"
                defaultValue={1}
              />
              <Select
                data={[{ name: "EUR", rate: 1 }]}
                disabled={true}
                onSelectRate={handleSelectedAmountRate}
                onSelectName={handleSelectedAmountName}
              ></Select>
            </StyledInputCurrencyContainer>
          </StyledCurrencyContainer>
          <IoSwapHorizontal onClick={handleSwapValues}></IoSwapHorizontal>
          <StyledCurrencyContainer>
            <Label>Prepocet</Label>
            <StyledInputCurrencyContainer>
              <span>
                {calculatedResult !== null ? calculatedResult.toFixed(2) : ""}
              </span>
              <Select
                data={calculatorItems?.rates || []}
                disabled={false}
                onSelectRate={handleSelectedCalculationRate}
                onSelectName={handleSelectedCalculationName}
              ></Select>
            </StyledInputCurrencyContainer>
          </StyledCurrencyContainer>
        </StyledCalculatorFlex>
        <StyledCalculatorFlex>
          <h2>
            {`${selectedAmountRate} ${selectedAmountName} = `}
            <span
              style={{
                color: COLOR.BLUE,
              }}
            >
              {selectedCalculationRate}
            </span>{" "}
            {selectedCalculationName}
          </h2>
          <StyledButtonWrapper>
            <Button onClick={handleCalculate}>Prepocitat</Button>
          </StyledButtonWrapper>
        </StyledCalculatorFlex>
      </StyledCalculatorWrapper>
    </>
  );
};

export default Calculator;
