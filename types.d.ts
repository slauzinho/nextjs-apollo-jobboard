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
