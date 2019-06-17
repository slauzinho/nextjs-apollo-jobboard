import { gql } from 'apollo-boost';
import { JobInfoFragment } from './fragments';

export const JOB_CREATE_MUTATION = gql`
  mutation jobCreate($input: JobCreateInput) {
    createJob(input: $input) {
      ...JobInfo
    }
  }
  ${JobInfoFragment}
`;
