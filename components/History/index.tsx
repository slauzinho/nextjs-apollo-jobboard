import React, { useState, useEffect } from 'react';
import { IHistory, getHistory, clearHistory } from '../../lib/history';
import Link from 'next/link';

const History = () => {
  const [history, setHistory] = useState<IHistory[]>();

  useEffect(() => {
    async function get() {
      const savedHistory = await getHistory();
      setHistory(savedHistory);
    }
    get();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <h3>Pesquisas Anteriores</h3>
        <button
          type="button"
          onClick={() => {
            setHistory([]);
            clearHistory();
          }}
        >
          Apagar
        </button>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        {history &&
          history.map(({ job, city }: IHistory, index) => {
            return (
              <Link key={index} href={`jobs?job=${job}&city=${city}`}>
                <a>
                  {job} - {city}
                </a>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default History;
