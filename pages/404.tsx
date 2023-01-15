import Link from 'next/link';
import * as s from 'styles/404/page';

export default function () {
  return (
    <s.Main>
      <s.Message>자료가 없는 곳에 접근하셨습니다.</s.Message>
      <s.LinkToHome>
        <Link href={'/'}>홈으로</Link>
      </s.LinkToHome>
    </s.Main>
  );
}
