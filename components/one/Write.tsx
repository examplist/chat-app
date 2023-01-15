import { FormEvent, useRef, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { alertError } from 'utils/alert';
import * as s from 'styles/one/Write';
import { Message } from 'pages/one/[id]';

interface Prop {
  id: string;
  messages: Message[];
  myid: string;
}

export default function Write({ id: roomid, messages, myid }: Prop) {
  const refContent = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const submit$message = async (e: FormEvent) => {
    e.preventDefault();
    if (!refContent.current) {
      return;
    }
    if (refContent.current.value === '') {
      alertError('한 글자 이상을 입력하여야 합니다!');
      return;
    }
    setLoading(true);
    const content = refContent.current.value;
    messages.push({ id: uuidv4(), author: myid, content });
    const { status } = await axios.put(`/api/one-message?id=${roomid}`, {
      messages,
    });
    if (status !== 201) {
      alertError('죄송합니다. 문제가 발생했습니다.');
      setLoading(false);
      return;
    }
    refContent.current.value = '';
    setLoading(false);
  };

  return (
    <s.Form onSubmit={submit$message}>
      <s.Input type={'text'} name={'content'} ref={refContent} />
      <s.Button disabled={loading}>제출</s.Button>
    </s.Form>
  );
}
