import { GetStaticProps } from 'next';
import { FiCalendar, FiUser } from 'react-icons/fi';
import Header from '../components/Header';

import { getPrismicClient } from '../services/prismic';

import * as S from './styles';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

const Home = ({ postsPagination }: HomeProps) => {
  return (
    <S.Container>
      <Header />
      <S.PostList>
        {postsPagination?.results.map(post => (
          <S.Post key={post.uid}>
            <h3>Como utilizar Hooks {post.data.title} </h3>
            <p>
              Pensando em sincronização em vez de ciclos de vida.{' '}
              {post.data.subtitle}
            </p>
            <S.Info>
              <span>
                <FiCalendar /> 15 Mar 2021 {post.first_publication_date}
              </span>
              <span>
                <FiUser /> Eduardo Lima {post.data.author}
              </span>
            </S.Info>
          </S.Post>
        ))}
      </S.PostList>

      <S.ShowMore>Carregar mais posts</S.ShowMore>
    </S.Container>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  // const postsResponse = await prismic.query(TODO);
  const response = {
    next_page: '1',
    results: [
      {
        uid: '1',
        first_publication_date: 'date',
        data: {
          title: 'title',
          subtitle: 'subtitle',
          author: 'author',
        },
      },
    ],
  };

  const postsPagination = response;
  return {
    props: {
      postsPagination,
    },
  };
};
