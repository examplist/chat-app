import { useRouter } from 'next/router';
import axios from 'axios';
import { FiArrowLeft } from 'react-icons/fi';
import { alertError } from 'utils/alert';
import * as s from 'styles/one/Title';
import { TypeOneStore } from 'store/one';

interface Prop {
  myid: string;
  another: TypeOneStore;
}

export default function Title({ myid, another }: Prop) {
  const router = useRouter();

  const click$back = () => {
    router.push('/');
  };

  const click$out = async () => {
    const answer = confirm('정말로 나가시겠습니까?');
    if (!answer) {
      return;
    }
    const { status } = await axios.delete(`/api/one-room?me=${myid}&an=${another.id}`);
    if (status !== 204) {
      alertError('죄송합니다. 문제가 생겼습니다.');
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
      <s.Title>{another.name}</s.Title>
      <s.Space></s.Space>
      <s.Out onClick={click$out}>나가기</s.Out>
    </s.Container>
  );
}
