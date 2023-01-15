import { useManyStore } from 'store/many';
import { alertError } from 'utils/alert';
import * as s from 'styles/many/CardIndividual';
import { Datum } from 'components/many/TitlePeopleLater';

export default function CardIndividual({ id: userid, name, photo }: Datum) {
  const manyStore = useManyStore();

  const click$person = async () => {
    const response = await fetch('/api/many-people', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: manyStore.id,
        userid,
        allPeople: manyStore.allPeople,
        curPeople: manyStore.curPeople,
      }),
    });
    if (response.status !== 201) {
      alertError('죄송합니다. 추가되지 못했습니다.');
    }
  };

  return (
    <s.Card>
      <s.Img>
        <img src={photo} />
      </s.Img>
      <s.Name>{name}</s.Name>
      <s.Button>
        <button onClick={click$person}>추가</button>
      </s.Button>
    </s.Card>
  );
}
