import styled from 'styled-components';

export const Container = styled.main`


  padding: 6rem 0 8rem;

  background: linear-gradient(-45deg, #151515, #1A1D23,#1e212d,#1b1717);
    background-size: 400% 400%;
    animation: gradient 4s ease infinite;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
  }

  h1 {
    font-size: 4.8rem;
    color: var(--heading);
    font-weight: bold;
    margin: 8rem 0 2.4rem;
  }

  h2 {
    font-size: 3.6rem;
    color: var(--heading);
    font-weight: bold;
    margin-bottom: 3.2rem;
  }

  p {
    margin-top: 0.8rem;
    font-size: 1.8rem;
    color: var(--body);
    line-height: 1.8rem;
  }
`;

export const ContentContainer = styled.div`
  width: min(100%, 110rem);
  margin: 0 auto;
`;

export const Banner = styled.div`
  margin-top: 4.8rem;
  width: 100%;
  max-height: 40rem;

  img {
    width: 100%;
    max-height: 40rem;
    object-fit: cover;
  }
`;

export const Content = styled.div`
  margin-top: 6.4rem;
`;

export const Body = styled.div`
  margin-top: 1.8rem;
  font-size: 1.8rem;
  text-align: justify;

  a {
    text-decoration: none;
    color: var(--hightlight);
  }

  p {
    line-height: 3.2rem;
    color: var(--body);
  }

  ol {
    list-style: disc;
    margin: 3.6rem 0 3.6rem;

    li + li {
      margin-top: 1.2rem;
    }
  }
`;
