import { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import Prismic from '@prismicio/client';
import { useRouter } from 'next/router';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../services/prismic';

import Header from '../../components/Header';
import * as S from './styles';
import { getFormatDate } from '../../util/formatDate';
import { Info } from '../styles';
import Comments from '../../components/Comments';

type Body = {
  text: string;
};

type Content = {
  heading: string;
  body: Body[];
};

interface Post {
  first_publication_date: string | null;
  uid: string;
  data: {
    title: string;
    subtitle: string;
    banner: {
      url: string;
    };
    author: string;
    content: Content[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  const router = useRouter();

  const [totalWordsPost, setTotalWordsPost] = useState([]);

  if (router.isFallback) {
    return <h2>Carregando...</h2>;
  }

  useEffect(() => {
    const wordsContent = post.data.content.reduce((acc, item, index) => {
      acc[index] =
        item.heading.split(' ').length +
        RichText.asText(item.body).split(' ').length;

      return acc;
    }, []);

    setTotalWordsPost(wordsContent);
  }, [post.data.content]);

  const totalWords = totalWordsPost.reduce((acc, word) => acc + word, 0);

  const readingTime = Math.round(totalWords / 200);

  return (
    <S.Container>
      <S.ContentContainer>
        <Header />
      </S.ContentContainer>
      <S.Banner>
        <img src={post.data.banner.url} alt={post.data.title} />
      </S.Banner>

      <S.ContentContainer>
        <h1>{post.data.title} </h1>

        <Info>
          <span>
            <FiCalendar />
            {getFormatDate(post.first_publication_date)}
          </span>
          <span>
            <FiUser />
            {post.data.author}
          </span>
          <span>
            <FiClock /> {readingTime} min
          </span>
        </Info>

        {post.data.content.map(content => (
          <S.Content key={content.heading}>
            <h2>{content.heading}</h2>
            <S.Body
              dangerouslySetInnerHTML={{
                __html: RichText.asHtml(content.body),
              }}
            />
          </S.Content>
        ))}
      </S.ContentContainer>
      <Comments></Comments>
    </S.Container>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {


  const prismic = getPrismicClient();
  const postsResponse = await prismic.query([
    Prismic.predicates.at('document.type', 'posts'),
  ]);

  const paths = postsResponse.results.map(result => ({
    params: {
      slug: result.uid,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID('posts', String(slug), {});

  const post: Post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author,
      content: response.data.content,
    },
  };

  return {
    props: {
      post,
    },
  };
};
