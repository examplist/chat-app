import { useManyStore } from 'store/many';
import axios from 'axios';
import { useQuery } from 'react-query';
import CardIndividual from 'components/many/CardIndividual';
import * as s from 'styles/many/TitlePeopleLater';

export interface Datum {
  id: string;
  name: string;
  photo: string;
}

const fetchUsers = async () => {
  const { data } = await axios.get('/api/users?user=all');
  return data;
};

export default function TitlePeopleLater() {
  const { curPeople } = useManyStore();
  const { isLoading, isError, data } = useQuery(['users'], fetchUsers);

  if (isLoading) {
    return <div>로딩 중</div>;
  }

  if (isError) {
    return <div>죄송합니다. 문제가 발생했습니다.</div>;
  }

  return (
    <s.Container>
      <s.Title>유저 목록</s.Title>
      <s.List>
        {data.map(({ id, name, photo }: Datum) => {
          if (curPeople[id]) {
            return <div key={id}></div>;
          } else {
            return <CardIndividual key={id} id={id} name={name} photo={photo} />;
          }
        })}
      </s.List>
    </s.Container>
  );
}
