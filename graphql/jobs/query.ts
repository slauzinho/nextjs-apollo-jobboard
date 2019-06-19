import { gql } from 'apollo-boost';
import { JobInfoFragment } from './fragments';

export const PUBLIC_JOB_QUERY = gql`
  query jobQuery($id: ID!) {
    job(id: $id) {
      ...JobInfo
    }
  }
  ${JobInfoFragment}
`;
