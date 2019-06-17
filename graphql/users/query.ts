import { gql } from 'apollo-boost';
import { JobInfoFragment } from '../jobs/fragments';
import { UserInfoFragment } from '../users/fragments';

export const ME_QUERY = gql`
  query Me {
    me {
      ...UserInfo
      jobs {
        ...JobInfo
      }
    }
  }
  ${UserInfoFragment}
  ${JobInfoFragment}
`;
