import { useAuthStore } from 'store/auth';
import { useManyStore } from 'store/many';
import { useRouter } from 'next/router';
import { FiArrowLeft } from 'react-icons/fi';
import { alertError } from 'utils/alert';
import TitlePeople from 'components/many/TitlePeople';
import * as s from 'styles/many/Title';

export default function Title() {
  const authStore = useAuthStore();
  const manyStore = useManyStore();
  const router = useRouter();

  const click$back = () => {
    router.push('/');
  };

  const click$out = async () => {
    const answer = confirm('정말로 나가시겠습니까?');
    if (!answer) {
      return;
    }
    const response = await fetch('/api/many-people', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: manyStore.id,
        userid: authStore.id,
        curPeople: manyStore.curPeople,
      }),
    });
    if (response.status !== 204) {
      alertError('죄송합니다. 진행이 되지 않았습니다.');
      return;
    }
    router.push('/');
  };

  return (
    <s.Container>
      <s.BackButton>
        <button onClick={click$back}>
          <FiArrowLeft />
        </button>
      </s.BackButton>
      <s.Title>{manyStore.title}</s.Title>
      <s.Space />
      <TitlePeople />
      <s.Out onClick={click$out}>나가기</s.Out>
    </s.Container>
  );
}
