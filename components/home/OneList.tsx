import { useAuthStore } from 'store/auth';
import { useQuery } from 'react-query';
import axios from 'axios';
import CardIndividual from 'components/home/CardIndividual';
import * as s from 'styles/home/OneList';

export interface Datum {
  id: string;
  name: string;
  photo: string;
}

const fetchUsers = async (id: string | null) => {
  if (!id) {
    return [];
  }
  const { data } = await axios.get(`/api/users?user=${id}`);
  return data;
};

export default function OneList() {
  const { id: myid } = useAuthStore();
  const { isLoading, isError, data } = useQuery(['one', myid], () => fetchUsers(myid));

  if (!myid) {
    return (
      <s.NotSigned>해당 페이지는 로그인을 하신 분만 접속할 수 있습니다.</s.NotSigned>
    );
  }

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
