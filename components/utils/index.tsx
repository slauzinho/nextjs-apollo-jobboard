import { JobMeQuery } from '../../types';
import { distanceInWordsToNow as distanceInWordsEnglish } from 'date-fns';

const orderingRanking = ['APPROVED', 'PENDING', 'REJECTED', 'EXPIRED'];

export function orderByStatus(jobs: JobMeQuery[]) {
  return jobs.sort((jobA, jobB) => {
    const resultByStatus =
      orderingRanking.indexOf(jobA.status) -
      orderingRanking.indexOf(jobB.status);
    // If the ranking is different return that value
    // otherwise we need to compare another field
    if (resultByStatus !== 0) {
      return resultByStatus;
    }
    // Compare using the publish date
    return +new Date(jobA.published_at) - +new Date(jobB.published_at);
  });
}

export function distanceInWordsToNow(date: string | number | Date) {
  return distanceInWordsEnglish(date, {
    locale: require('date-fns/locale/pt'),
  });
}
