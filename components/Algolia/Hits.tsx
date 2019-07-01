import React from 'react';
import { connectHits } from 'react-instantsearch-dom';
import { HitsProvided } from 'react-instantsearch-core';
import { IDoc } from '../../types';
import Job from '../Job';

interface IProps {
  handleClick: (id: string) => void;
}

const Hits = ({ hits, handleClick }: HitsProvided<IDoc> & IProps) => {
  if (hits.length === 0) {
    return <div>Não foram encontradas ofertas....</div>;
  }

  return (
    <ul>
      {hits.map(hit => (
        <Job
          key={hit.objectID}
          job={hit}
          openEditor={() => handleClick(hit.objectID)}
        />
      ))}
    </ul>
  );
};

export default connectHits(Hits);
