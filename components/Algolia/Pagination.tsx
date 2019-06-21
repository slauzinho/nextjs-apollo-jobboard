import React from 'react';
import { connectPagination } from 'react-instantsearch-dom';

interface IProps {
  currentRefinement: number;
  nbPages: number;
  refine: (...args: any[]) => any;
  items: Array<{
    count: number;
    isRefined: boolean;
    label: string;
    value: string;
  }>;
}

const Pagination: React.FC<IProps> = ({
  currentRefinement,
  nbPages,
  refine,
}) => (
  <div>
    <h3>Páginas de Resultados:</h3>
    <a
      onClick={event => {
        event.preventDefault();
        refine(currentRefinement - 1);
      }}
    >
      « Anterior
    </a>
    <ul>
      {new Array(nbPages).fill(null).map((_, index) => {
        const page = index + 1;
        const style = {
          color: currentRefinement === page ? 'black' : '',
        };

        return (
          <li key={index}>
            <a
              style={style}
              onClick={event => {
                event.preventDefault();
                refine(page);
              }}
            >
              {page}
            </a>
          </li>
        );
      })}
    </ul>
    <a
      onClick={event => {
        event.preventDefault();
        refine(currentRefinement + 1);
      }}
    >
      Próxima »
    </a>
  </div>
);

export default connectPagination(Pagination);
