const MY_DOMAIN = 'http://localhost:3000';

export async function saveHistory(searchTerm: string, city: string) {
  const searchUrl = `${MY_DOMAIN}/job=${searchTerm}&city=${city}`;
  const historyString = await localStorage.getItem('history');
  if (historyString) {
    const historyList = JSON.parse(historyString);
    const searchExists = historyList && historyList.indexOf(searchUrl);
    historyList.slice(0, +searchExists);
    historyList.slice(+searchExists + 1);
    const newHistoryList = [historyList.slice(-4), searchUrl];
    return await localStorage.setItem(
      'history',
      JSON.stringify(newHistoryList)
    );
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
