import { useAuthStore, status } from 'store/auth';
import SignForm from 'components/sign/SignForm';
import * as s from 'styles/sign/page';

export default function sign() {
  const { status: currentStatus } = useAuthStore();

  if (currentStatus === status.loading) {
    return (
      <s.Container>
        <s.LoggedIn>로딩 중</s.LoggedIn>
      </s.Container>
    );
  }

  if (currentStatus === status.fetched) {
    return (
      <s.Container>
        <s.LoggedIn>이미 로그인을 하셨습니다.</s.LoggedIn>
      </s.Container>
    );
  }

  if (currentStatus === status.failed) {
    return (
      <s.Container>
        <SignForm />
      </s.Container>
    );
  }

  return <s.Container></s.Container>;
}
