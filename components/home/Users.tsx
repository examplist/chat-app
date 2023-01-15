import { useAuthStore } from 'store/auth';
import axios from 'axios';
import { useQuery } from 'react-query';
import CardIndividual from 'components/home/CardIndividual';
import * as s from 'styles/home/Users';
import { Datum } from 'components/home/OneList';

const fetchUsers = async () => {
  const { data } = await axios.get('/api/users?user=all');
  return data;
};

export default function Users() {
  const { isLoading, isError, data } = useQuery(['users'], fetchUsers);
  const { id: myid } = useAuthStore();

  if (isLoading) {
    return <s.Loading>로딩 중</s.Loading>;
  }

  if (isError) {
    return <s.Error>죄송합니다. 문제가 발생했습니다.</s.Error>;
  }

  return (
    <s.Container>
      {data.map(({ id, name, photo }: Datum) => {
        if (myid === id) {
          return <div key={id}></div>;
        } else {
          return <CardIndividual key={id} id={id} name={name} photo={photo} />;
        }
      })}
    </s.Container>
  );
}
