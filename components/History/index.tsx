import React, { useState, useEffect } from 'react';
import { IHistory, getHistory, clearHistory } from '../../lib/history';
import Link from 'next/link';
import { Container, Title, Delete } from './styles';

const History = () => {
  const [history, setHistory] = useState<IHistory[]>();

  useEffect(() => {
    async function get() {
      const savedHistory = await getHistory();
      setHistory(savedHistory);
    }
    get();
  }, []);

  if (history) {
    return (
      <Container>
        <div style={{ display: 'flex' }}>
          <Title>Pesquisas Anteriores</Title>
          <Delete
            onClick={() => {
              setHistory([]);
              clearHistory();
            }}
          >
            Apagar
          </Delete>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          {history.map(({ job, city }: IHistory, index) => {
            return (
              <Link key={index} href={`jobs?job=${job}&city=${city}`}>
                <a>
                  {job} - {city}
                </a>
              </Link>
            );
          })}
        </div>
      </Container>
    );
  }

  return null;
};

export default History;
