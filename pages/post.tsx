import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { NextFunctionComponent } from 'next';
import { Formik } from 'formik';
import {
  CategoriesQuery,
  TagsQuery,
  Category,
  Tag,
  CitiesQuery,
  City,
  useJobCreateMutation,
  MeQuery,
  MeDocument,
} from '../components/generated/apolloComponents';
import { AppContext } from '../lib/withApollo';
import { CATEGORIES_QUERY } from '../graphql/categories/query';
import { CITIES_QUERY } from '../graphql/cities/query';
import { TAGS_QUERY } from '../graphql/tags/query';
import Page1 from '../components/Post/Page1';
import Page2 from '../components/Post/Page2';
import Page3 from '../components/Post/Page3';
import Error from '../components/styles/components/Error';

export interface FormData {
  title: string;
  empresa: string;
  city: string;
  categories: string[];
  tags: string[] | null;
  editorState: EditorState;
  url: string;
  emailCandidatura: string;
}

interface IProps {
  categories: Category[];
  tags: Tag[];
  cities: City[];
}

// @ts-ignore
const pages = [<Page1 />, <Page2 />, <Page3 />];

const Post: NextFunctionComponent<IProps, IProps, AppContext> = props => {
  const [page, setPage] = useState(0);
  const createJob = useJobCreateMutation();

  return (
    <div>
      <Formik
        initialValues={{
          title: '',
          empresa: '',
          city: '',
          categories: [],
          tags: [],
          url: '',
          emailCandidatura: '',
          editorState: EditorState.createEmpty(),
        }}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          setSubmitting(true);
          const description = stateToHTML(
            values.editorState.getCurrentContent()
          );
          const data = {
            title: values.title,
            company: values.empresa,
            description,
            city: values.city,
            categories: values.categories,
            url: values.url,
            email: values.emailCandidatura,
            tags: values.tags.map((t: Tag) => t.name),
          };

          const result = await createJob({
            variables: {
              input: data,
            },
            update: (cache, { data: mutationResult }) => {
              const meQueryData = cache.readQuery<MeQuery>({
                query: MeDocument,
              });
              console.log('meQueryData', meQueryData);
              if (meQueryData) {
                console.log('Entrei');
                console.log(mutationResult);
                cache.writeQuery({
                  query: MeDocument,
                  data: {
                    me: {
                      ...meQueryData.me,
                      jobs: [...meQueryData.me!.jobs, mutationResult.createJob],
                    },
                  },
                });
                console.log(mutationResult.createJob);
                console.log(meQueryData);
              }
            },
          });

          setSubmitting(false);
        }}
      >
        {({ handleSubmit, isSubmitting, status, setStatus, ...otherProps }) => (
          <form onSubmit={handleSubmit}>
            {React.cloneElement(pages[page], {
              ...otherProps,
              categories: props.categories,
              tags: props.tags,
              cities: props.cities,
              setStatus,
            })}
            <div>
              {page !== 0 && (
                <a
                  onClick={() => setPage(page - 1)}
                  style={{ textDecorationLine: 'underline' }}
                >
                  Voltar
                </a>
              )}
              {page === pages.length - 1 ? (
                <div>
                  <button type="submit" disabled={isSubmitting}>
                    Enviar
                  </button>
                </div>
              ) : (
                <button
                  style={{ marginLeft: 'auto' }}
                  type="button"
                  onClick={() => {
                    setPage(page + 1);
                    setStatus({});
                  }}
                >
                  Continuar
                </button>
              )}
            </div>
            <Error center>{status && status.submitErrors}</Error>
          </form>
        )}
      </Formik>
    </div>
  );
};

Post.getInitialProps = async ctx => {
  const { data: categoriesData } = await ctx.apolloClient.query<
    CategoriesQuery
  >({
    query: CATEGORIES_QUERY,
  });
  const { data: tagsData } = await ctx.apolloClient.query<TagsQuery>({
    query: TAGS_QUERY,
  });

  const { data: citiesData } = await ctx.apolloClient.query<CitiesQuery>({
    query: CITIES_QUERY,
  });

  return {
    categories: categoriesData.categories as Category[],
    tags: tagsData.tags as Tag[],
    cities: citiesData.cities as City[],
  };
};

export default Post;
