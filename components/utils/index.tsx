import { JobMeQuery } from '../../types';
import { distanceInWordsToNow as distanceInWordsEnglish } from 'date-fns';
import * as yup from 'yup';

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
    return +new Date(jobB.published_at) - +new Date(jobA.published_at);
  });
}

export function distanceInWordsToNow(date: string | number | Date) {
  return distanceInWordsEnglish(date, {
    locale: require('date-fns/locale/pt'),
  });
}

export const schemaCreateJob = yup.object().shape({
  title: yup
    .string()
    .min(15)
    .required('Deve escolher um título para o seu anuncio'),
  empresa: yup.string().required('Nome da empresa é obrigatório'),
  categories: yup
    .array()
    .of(yup.string())
    .min(1, 'Selecione pelo menos uma categoria'),
  tags: yup.array().of(yup.string()),
  url: yup.string().url(),
  emailCandidatura: yup.string().email(),
  city: yup.string().required('Deve escolher uma cidade'),
});
