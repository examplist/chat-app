import { db } from 'fb';
import { doc, onSnapshot } from 'firebase/firestore';
import { useAuthStore } from 'store/auth';
import { useOneStore } from 'store/one';
import { useEffect, useState } from 'react';
import Title from 'components/one/Title';
import Messages from 'components/one/Messages';
import Write from 'components/one/Write';
import * as s from 'styles/one/page';

interface Prop {
  id: string;
}

interface Context {
  query: Prop;
}

export interface Message {
  id: string;
  author: string;
  content: string;
}

//////////////////////////////////////
export default function one({ id }: Prop) {
  const me = useAuthStore();
  const another = useOneStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [people, setPeople] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    onSnapshot(doc(db, 'one', id), (doc) => {
      if (doc.exists()) {
        setLoading(false);
        setMessages(doc.data().messages);
        setPeople(doc.data().people);
      } else {
        setLoading(false);
        setError(true);
      }
    });
  }, []);

  if (loading) {
    return <s.Loading>로딩 중</s.Loading>;
  }

  if (error) {
    return <s.Error>죄송합니다. 문제가 발생했습니다.</s.Error>;
  }

  if (!me.id || !people.includes(me.id)) {
    return <s.NotIncluded>당사자만 해당 방에 접속할 수 있습니다.</s.NotIncluded>;
  }

  return (
    <s.Container>
      <Title myid={me.id} another={another} />
      <Messages
        id={id}
        people={people}
        messages={messages}
        myid={me.id}
        another={another}
      />
      <Write id={id} messages={messages} myid={me.id} />
    </s.Container>
  );
}

export async function getServerSideProps(context: Context) {
  return { props: { id: context.query.id } };
}
