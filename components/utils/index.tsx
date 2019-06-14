import { JobMeQuery } from '../../types';

const orderingRanking = ['APPROVED', 'PENDING', 'REJECTED', 'EXPIRED'];

/**
 * Function that sorts a Job array by comparing the status code
 * of which job, and if they are equal it defaults to the publish
 * date.
 * @param jobs Job Array
 */

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
