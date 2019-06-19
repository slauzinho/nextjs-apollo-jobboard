import React from 'react';
import { connectMenu } from 'react-instantsearch-dom';
import Link from 'next/link';
import { MenuExposed, MenuProvided } from 'react-instantsearch-core';

const Menu = ({ items, currentRefinement, refine, title }) => (
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

export default connectMenu(Menu);
