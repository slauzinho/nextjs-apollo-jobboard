import React from 'react';
import { connectMenu } from 'react-instantsearch-dom';
import { MenuProvided } from 'react-instantsearch-core';

interface Iprops {
  title: string;
}

const Menu: React.FC<Iprops & Partial<MenuProvided>> = ({
  items,
  refine,
  title,
}) => {
  if (items && refine) {
    return (
      <div>
        <h3>{title}</h3>
        {items.map(item => (
          <ul key={item.value}>
            <li onClick={() => refine(item.label)}>
              <a>{item.label}</a>
            </li>
            <span>({item.count})</span>
          </ul>
        ))}
      </div>
    );
  }
  return null;
};

export default connectMenu(Menu);
