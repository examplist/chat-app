import { useAuthStore } from 'store/auth';
import { useQuery } from 'react-query';
import axios from 'axios';
import CardGroup from 'components/home/CardGroup';
import ManyAdd from 'components/home/ManyAdd';
import * as s from 'styles/home/ManyList';

export interface Datum {
  id: string;
  title: string;
}

const fetchRooms = async (id: string | null) => {
  if (!id) {
    return [];
  }
  const { data } = await axios.get(`/api/many-list?user=${id}`);
  return data;
};

export default function ManyList() {
  const { id: myid } = useAuthStore();
  const { isLoading, isError, data, refetch } = useQuery(['chat-many', myid], () =>
    fetchRooms(myid)
  );

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
      {data.map(({ id, title }: Datum) => (
        <CardGroup key={id} id={id} title={title} />
      ))}
      <ManyAdd refetch={refetch} />
    </s.Container>
  );
}
