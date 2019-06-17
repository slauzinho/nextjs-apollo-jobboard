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
} from '../components/generated/apolloComponents';
import { AppContext } from '../lib/withApollo';
import { CATEGORIES_QUERY } from '../graphql/categories/query';
import { CITIES_QUERY } from '../graphql/cities/query';
import { TAGS_QUERY } from '../graphql/tags/query';
import Page1 from '../components/Post/Page1';
import Page2 from '../components/Post/Page2';
import Error from '../components/styles/components/Error';

export interface FormData {
  title: string;
  empresa: string;
  city: string;
  categories: string[];
  tags: string[] | null;
  editorState: EditorState;
}

interface IProps {
  categories: Category[];
  tags: Tag[];
  cities: City[];
}

// @ts-ignore
const pages = [<Page1 />, <Page2 />];

const Post: NextFunctionComponent<IProps, IProps, AppContext> = props => {
  const [page, setPage] = useState(0);

  return (
    <div>
      <Formik
        initialValues={{
          title: '',
          tipo: '',
          salario: '',
          empresa: '',
          city: '',
          categories: [],
          tags: [],
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
            tags: values.tags,
          };

          console.log(data);
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
                  <a type="submit" disabled={isSubmitting}>
                    Enviar
                  </a>
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
