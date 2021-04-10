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
import Link from 'next/link';

type Body = {
  text: string;
};

type Content = {
  heading: string;
  body: Body[];
};

interface Post {
  first_publication_date: string | null;
  last_publication_date: string | null;
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
  previousPost: {
    uid: string;
    title: string;
  }
  nextPost: {
    uid: string;
    title: string;
  }
}

export default function Post({ post,previousPost,nextPost }: PostProps) {
  const router = useRouter();

  const [totalWordsPost, setTotalWordsPost] = useState([]);

  if (router.isFallback) {
    return <h2>Carregando...</h2>;
  }


  useEffect(() => {
    const wordsContent = post.data.content.reduce((acc, item, index) => {
      acc[index] =
        item.heading ? (item.heading.split(' ').length): 0 +
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
          <div>
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
          </div>

          <span>* editado em {getFormatDate(post.last_publication_date)}</span>

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
      <S.Divider />

      <S.WrapperPosts>

      {previousPost && (
        <S.LinkPost>
        <strong>{previousPost.title}</strong>
            <Link href={`/post/${previousPost.uid}`}>
              <a>
              Post Anterior
              </a>
            </Link>
        </S.LinkPost>
      )}

      {nextPost && (
        <S.LinkPost>
          <strong>{nextPost.title}</strong>
            <Link href={`/post/${nextPost.uid}`}>
              <a>Proximo Post</a>
            </Link>
        </S.LinkPost>
      )}

      </S.WrapperPosts>

      <Comments />
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

  const postSelectedResponse = await prismic.getByUID('posts', String(slug), {});

  const { results } = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],{}
  );

  const indexPostPrevious = results
    .findIndex(post => post.uid === postSelectedResponse.uid ) + 1;

  const indexPostNext = results
    .findIndex(post => post.uid === postSelectedResponse.uid ) - 1;

  const posts = results.map(item => ({
    uid: item.uid,
    title: item.data.title,
  }));

  const previousPost = posts[indexPostPrevious] || null;
  const nextPost = posts[indexPostNext] || null;

  const post: Post = {
    uid: postSelectedResponse.uid,
    first_publication_date: postSelectedResponse.first_publication_date,
    last_publication_date: postSelectedResponse.last_publication_date,
    data: {
      title: postSelectedResponse.data.title,
      subtitle: postSelectedResponse.data.subtitle,
      banner: {
        url: postSelectedResponse.data.banner.url,
      },
      author: postSelectedResponse.data.author,
      content: postSelectedResponse.data.content,
    },
  };



  return {
    props: {
      post,
      previousPost,
      nextPost
    },
  };
};
