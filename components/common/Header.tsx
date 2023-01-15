import Link from 'next/link';
import HeaderAuth from 'components/common/HeaderAuth';
import * as s from 'styles/common/Header';

export default function Header() {
  return (
    <s.Container>
      <s.Title>
        <Link href={'/'}>채팅</Link>
      </s.Title>
      <s.Sign>
        <HeaderAuth />
      </s.Sign>
    </s.Container>
  );
}
