import React from 'react';
import Select, { createFilter } from 'react-select';
import { Tag } from '../generated/apolloComponents';

interface IProps {
  initialState: Tag[];
  tags: Tag[];
  setFieldValue: (field: string, value: any) => void;
}

const Tags: React.FC<IProps> = props => {
  /* const onChange= */
  const filterConfig = {
    ignoreCase: true,
    ignoreAccents: true,
    trim: true,
    matchFrom: 'start' as 'start',
  };
  return (
    <Select
      isClearable
      isSearchable
      isMulti
      getOptionLabel={(option: Tag) => option.name}
      getOptionValue={option => option.name}
      onChange={(selectedTags: any) =>
        props.setFieldValue('tags', selectedTags)
      }
      name="tags"
      options={props.tags}
      filterOption={createFilter(filterConfig)}
      defaultValue={props.initialState}
    />
  );
};

export default Tags;
