import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FlagItems from "../Calculator/FlagItems";
import { FONT_WEIGHT } from "../../Theme";

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
    font-weight: ${FONT_WEIGHT.BOLDER};
  }
  option {
    font-weight: ${FONT_WEIGHT.REGULAR};
  }
  img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
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
  const [selectedFlag, setSelectedFlag] = useState<string | null>(null);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRateName = event.target.value;
    const selectedRate = data.find(
      (rate: IRate) => rate.name === selectedRateName,
    );

    if (selectedRate) {
      onSelectRate(selectedRate.rate);
      onSelectName(selectedRate.name);

      const selectedFlagItem = FlagItems.find(
        (item) => item.name === selectedRate.name,
      );
      if (selectedFlagItem) {
        setSelectedFlag(selectedFlagItem.flag);
      } else {
        setSelectedFlag(null);
      }
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
      {selectedFlag && <img alt={selectedFlag} src={selectedFlag} />}
      <StyledSelect disabled={disabled} onChange={handleSelectChange}>
        {options}
      </StyledSelect>
    </StyledSelectContainer>
  );
};

export default Select;
