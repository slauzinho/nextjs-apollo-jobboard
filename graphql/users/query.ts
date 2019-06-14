import { gql } from 'apollo-boost';

export const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      jobs {
        id
        slug
        title
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
    }
  }
`;
