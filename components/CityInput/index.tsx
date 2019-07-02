import React from 'react';
import Downshift from 'downshift';
import { City } from '../generated/apolloComponents';
import Input from '../styles/components/Input';

interface IProps {
  cities: City[];
  handleChange: (city: City) => void;
}

const getSuggestions = (value: string | null, list: City[]) => {
  if (!value) {
    return [];
  }
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  const suggestedList = list
    .filter(
      city => city.name.toLowerCase().slice(0, inputLength) === inputValue
    )
    .sort((cityA, cityB) => cityA.name.length - cityB.name.length);

  return inputLength < 2 ? [] : suggestedList;
};

const CityInput: React.FC<IProps> = props => (
  <Downshift
    onChange={props.handleChange}
    itemToString={(item: City | null) => (item ? item.name : '')}
  >
    {({
      getInputProps,
      getLabelProps,
      getMenuProps,
      getItemProps,
      isOpen,
      inputValue,
      highlightedIndex,
      selectedItem,
    }) => (
      <div>
        <label {...getLabelProps()}>{props.children}</label>
        <Input {...getInputProps()} />
        <ul {...getMenuProps()}>
          {isOpen &&
            getSuggestions(inputValue, props.cities).map((item, index) => (
              <li
                key={item.id}
                {...getItemProps({
                  index,
                  item,
                  style: {
                    backgroundColor:
                      highlightedIndex === index ? 'lightgray' : undefined,
                    fontWeight: selectedItem === item ? 'bold' : 'normal',
                  },
                })}
              >
                {`${item.name}, Distrito de ${item.district}`}
              </li>
            ))}
        </ul>
      </div>
    )}
  </Downshift>
);

export default CityInput;
