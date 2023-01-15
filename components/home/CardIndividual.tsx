import { useAuthStore } from 'store/auth';
import { useOneStore } from 'store/one';
import { useRouter } from 'next/router';
import { alertError } from 'utils/alert';
import * as s from 'styles/home/CardIndividual';
import { Datum } from 'components/home/OneList';

export default function CardIndividual({ id: anotherid, name, photo }: Datum) {
  const router = useRouter();
  const { id: myid } = useAuthStore();
  const { change: changeOne } = useOneStore();

  const click$person = async () => {
    if (!myid) {
      alertError('로그인을 하셔야 채팅을 하실 수 있습니다.');
      return;
    }
    const responseGet = await fetch(`/api/one-room?me=${myid}&an=${anotherid}`);

    if (responseGet.status === 200) {
      changeOne({ id: anotherid, name, photo });
      const { id, people } = await responseGet.json();
      if (!people.includes(myid)) {
        await fetch(`/api/one-room?me=${myid}&an=${anotherid}`, {
          method: 'PATCH',
        });
      }
      router.push(`/one/${id}`);
      return;
    }
    if (responseGet.status === 404) {
      const responsePost = await fetch(`/api/one-room?me=${myid}&an=${anotherid}`, {
        method: 'POST',
      });
      if (responsePost.status === 201) {
        changeOne({ id: anotherid, name, photo });
        const { id } = await responsePost.json();
        router.push(`/one/${id}`);
        return;
      }
    }
    alertError('죄송합니다. 문제가 발생했습니다.');
  };

  return (
    <s.Card onClick={click$person}>
      <s.Img>
        <img src={photo} />
      </s.Img>
      <s.Name>{name}</s.Name>
    </s.Card>
  );
}
