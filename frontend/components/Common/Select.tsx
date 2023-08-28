import React, { useEffect } from "react";
import styled from "styled-components";

export interface IRate {
  name: string;
  rate: number;
}

interface ISelectProps {
  data: IRate[];
  disabled?: boolean;
  onSelectRate: (selectedRate: number) => void;
  onSelectName: (selectedRate: string) => void;
}

const StyledSelectContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  height: 100%;
  select {
    font-weight: 700;
  }
  option {
    font-weight: 500;
  }
`;

const StyledSelect = styled.select`
  ${(props) =>
    props.disabled &&
    `
      cursor: not-allowed;
    `}
`;

const Select: React.FC<ISelectProps> = ({
  data,
  disabled,
  onSelectRate,
  onSelectName,
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRateName = event.target.value;
    const selectedRate = data.find(
      (rate: IRate) => rate.name === selectedRateName,
    );

    if (selectedRate) {
      onSelectRate(selectedRate.rate);
      onSelectName(selectedRate.name);
    }
  };

  useEffect(() => {
    handleSelectChange({
      target: { value: data[0]?.name || "" },
    } as React.ChangeEvent<HTMLSelectElement>);
  }, []);

  const options = data.map((rate: IRate) => (
    <option key={rate.name} value={rate.name}>
      {rate.name}
    </option>
  ));

  return (
    <StyledSelectContainer>
      <StyledSelect disabled={disabled} onChange={handleSelectChange}>
        {options}
      </StyledSelect>
    </StyledSelectContainer>
  );
};

export default Select;
