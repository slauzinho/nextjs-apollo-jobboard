import { Hit } from 'react-instantsearch-core';
export type JobMeQuery = { __typename?: 'Job' } & Pick<
  JobType,
  | 'id'
  | 'slug'
  | 'title'
  | 'url'
  | 'company'
  | 'description'
  | 'shortDescription'
  | 'published_at'
  | 'status'
> & {
    city: { __typename?: 'City' } & Pick<City, 'id' | 'name'>;
    categories: Array<
      { __typename?: 'Category' } & Pick<Category, 'id' | 'name'>
    >;
    tags: Array<Maybe<{ __typename?: 'Tag' } & Pick<Tag, 'id' | 'name'>>>;
  };

export interface IDoc extends Hit {
  city: string;
  shortDescription: string;
  company: string;
  slug: string;
  title: string;
  updated_at: number;
  url: string | null;
  categories: string[];
  techs: string[];
  _tags: string[];
  _geoloc: {
    lat: number;
    lng: number;
  };
}

export function instanceOfJob(object: any): object is JobMeQuery {
  return 'status' in object;
}
