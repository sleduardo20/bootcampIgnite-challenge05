import styled from 'styled-components';

export const Container = styled.main`
  width: min(100%, 110rem);
  margin: 0 auto;
  padding: 8rem 2.5rem 8rem;

  aside {
    margin-top: 3.2rem;

    a {
      font-size: 1.4rem;
      color: var(--hightlight);
    }
  }
`;

export const PostList = styled.ul`
  margin-top: 6.4rem;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Post = styled.li`
  & + li {
    margin-top: 4.8rem;
  }

  h3 {
    font-size: 2.8rem;
    color: var(--heading);
    font-weight: bold;
  }

  p {
    margin-top: 0.8rem;
    font-size: 1.8rem;
    color: var(--body);
    line-height: 1.8rem;
  }
`;

export const Info = styled.div`
  margin-top: 2.4rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    color: var(--info);

    svg {
      width: 2rem;
      height: 2rem;
      margin-right: 0.8rem;
    }

    & + span {
      margin-left: 2.4rem;
    }
   }
`;

export const ShowMore = styled.button`
  margin-top: 6.4rem;
  font-size: 1.8rem;
  outline: none;
  color: var(--hightlight);
  background: transparent;
  border: none;
  cursor: pointer;
`;
