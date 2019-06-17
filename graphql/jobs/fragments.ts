import { gql } from 'apollo-boost';

export const JobInfoFragment = gql`
  fragment JobInfo on Job {
    id
    slug
    title
    email
    url
    company
    description
    shortDescription
    city {
      id
      name
    }
    published_at
    categories {
      id
      name
    }
    tags {
      id
      name
    }
    status
  }
`;
