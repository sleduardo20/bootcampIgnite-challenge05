import Link from 'next/link';

import * as S from './styles';

export default function Header() {
  return (
    <S.Header>
      <Link href="/">
        <a>
          <img src="/img/logo.svg" alt="logo" />
        </a>
      </Link>
    </S.Header>
  );
}
