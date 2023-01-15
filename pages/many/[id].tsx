import { useAuthStore } from 'store/auth';
import { useManyStore } from 'store/many';
import { useEffect } from 'react';
import reflectMany from 'utils/reflectMany';
import Title from 'components/many/Title';
import Messages from 'components/many/Messages';
import Write from 'components/many/Write';
import * as s from 'styles/many/page';

interface Prop {
  id: string;
}

interface Context {
  query: Prop;
}

//////////////////////////////////////
export default function many({ id }: Prop) {
  const me = useAuthStore();
  const manyStore = useManyStore();

  useEffect(() => {
    reflectMany(id, manyStore);
  }, []);

  if (manyStore.isLoading) {
    return <s.Loading>로딩 중</s.Loading>;
  }

  if (manyStore.isError) {
    return <s.Error>죄송합니다. 문제가 발생했습니다.</s.Error>;
  }

  if (!me.id || !Object.keys(manyStore.curPeople).includes(me.id)) {
    return <s.NotIncluded>당사자만 해당 방에 접속할 수 있습니다.</s.NotIncluded>;
  }

  return (
    <s.Container>
      <Title />
      <Messages />
      <Write />
    </s.Container>
  );
}

export async function getServerSideProps(context: Context) {
  return { props: { id: context.query.id } };
}
