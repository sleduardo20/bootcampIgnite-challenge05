import { GetStaticProps } from 'next';
import { FiCalendar, FiUser } from 'react-icons/fi';
import Prismic from '@prismicio/client';
import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';

import { getPrismicClient } from '../services/prismic';
import { getFormatDate } from '../util/formatDate';

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
  const [results, setResults] = useState<Post[]>(postsPagination.results);
  const [next_page, setNexPage] = useState(postsPagination.next_page);

  const handleShowMore = async () => {
    const data = await fetch(next_page).then(response => response.json());

    const posts = data.results.map((post: Post) => ({
      uid: post.uid,
      first_publication_date: getFormatDate(post.first_publication_date),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    }));

    const newsPosts = [...results, ...posts];

    setResults(newsPosts);
    setNexPage(data.next_page);
  };

  return (
    <S.Container>
      <Header />
      <S.PostList>
        {results.map(post => (
          <S.Post key={post.uid}>
            <Link href={`/post/${post.uid}`}>
              <a>
                <h3>{post.data.title} </h3>
                <p>{post.data.subtitle}</p>
              </a>
            </Link>
            <S.Info>
              <span>
                <FiCalendar />
                {getFormatDate(post.first_publication_date)}
              </span>
              <span>
                <FiUser />
                {post.data.author}
              </span>
            </S.Info>
          </S.Post>
        ))}
      </S.PostList>

      {next_page && (
        <S.ShowMore onClick={handleShowMore}>Carregar mais posts</S.ShowMore>
      )}
    </S.Container>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      pageSize: 1,
    }
  );

  const results = postsResponse.results.map((post: Post) => ({
    uid: post.uid,
    first_publication_date: post.first_publication_date,
    data: {
      title: post.data.title,
      subtitle: post.data.subtitle,
      author: post.data.author,
    },
  }));

  const postsPagination = {
    next_page: postsResponse.next_page,
    results,
  };

  return {
    props: {
      postsPagination,
    },
  };
};
