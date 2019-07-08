import React from 'react';
import Downshift from 'downshift';
import { City } from '../generated/apolloComponents';
import Input from '../styles/components/Input';
import { InputContainer } from './styles';

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
        <div id="cityLabels">
          <label {...getLabelProps()}>{props.children}</label>
          <label>Cidade ou distrito</label>
        </div>
        <InputContainer>
          <Input {...getInputProps()} />
          <svg width={25} height={25}>
            <g fill="none" fillRule="evenodd">
              <path d="M0 0h25v25H0z" />
              <path
                d="M22 9.284C22 4.173 17.774 0 12.518 0 7.262 0 3 4.173 3 9.284c0 4.66 6.712 11.683 9.518 15.613C15.323 20.897 22 13.943 22 9.284zm-1.207 0c0-4.45-3.73-8.067-8.275-8.067-4.582 0-8.275 3.616-8.275 8.067 0 4.068 5.682 10.119 8.275 13.561 2.592-3.442 8.275-9.493 8.275-13.56zm-8.275-3.651c2.06 0 3.729 1.634 3.729 3.651 0 2.052-1.67 3.686-3.73 3.686-2.095 0-3.764-1.634-3.764-3.686 0-2.017 1.67-3.651 3.765-3.651zm0 1.217c1.385 0 2.486 1.078 2.486 2.434 0 1.39-1.101 2.469-2.486 2.469-1.385 0-2.522-1.078-2.522-2.469 0-1.356 1.137-2.434 2.522-2.434z"
                fill="#454F5B"
              />
            </g>
          </svg>
        </InputContainer>
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
