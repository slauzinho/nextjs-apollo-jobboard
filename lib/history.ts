const MY_DOMAIN = 'http://localhost:3000';

export async function saveHistory(searchTerm: string, city: string) {
  const searchUrl = `${MY_DOMAIN}/jobs?job=${searchTerm}&city=${city}`;
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

export async function getHistory(): Promise<string[]> {
  const historyString = await localStorage.getItem('history');
  if (historyString) {
    return JSON.parse(historyString);
  }
  return [];
}
