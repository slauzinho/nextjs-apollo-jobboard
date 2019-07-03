export interface IHistory {
  job: string;
  city: string;
}

export async function saveHistory(searchTerm: string, city: string) {
  const searchUrl = JSON.stringify({
    job: searchTerm,
    city,
  });
  const historyString = await localStorage.getItem('history');
  if (historyString) {
    const historyList: string[] = JSON.parse(historyString);
    const matchedIndex = historyList.indexOf(searchUrl);
    if (matchedIndex >= 0) {
      const head = historyList.slice(0, matchedIndex);
      const tail = historyList.slice(matchedIndex + 1);
      const listWithoutElement = [...head, ...tail];
      const newHistoryList = [...listWithoutElement.slice(-4), searchUrl];
      return await localStorage.setItem(
        'history',
        JSON.stringify(newHistoryList)
      );
    } else {
      return await localStorage.setItem(
        'history',
        JSON.stringify([...historyList.slice(-4), searchUrl])
      );
    }
  }

  return await localStorage.setItem('history', JSON.stringify([searchUrl]));
}

export async function getHistory(): Promise<IHistory[]> {
  const historyString = await localStorage.getItem('history');
  if (historyString) {
    const listString = JSON.parse(historyString);
    return listString.map((item: string) => JSON.parse(item));
  }
  return [];
}

export async function clearHistory() {
  await localStorage.removeItem('history');
}
