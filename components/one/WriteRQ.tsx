import { FormEvent, useRef, useEffect } from 'react';
import { useMutation } from 'react-query';
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
  let loading = false;
  const { isLoading, isError, isSuccess, mutate } = useMutation(
    async ({ roomid, messages }: { roomid: string; messages: Message[] }) => {
      await axios.put(`/api/one-message?id=${roomid}`, {
        messages,
      });
    }
  );

  if (isLoading) {
    loading = true;
  }

  if (isError) {
    alertError('죄송합니다. 문제가 발생했습니다.');
    loading = false;
  }

  useEffect(() => {
    if (isSuccess && refContent.current) {
      refContent.current.value = '';
    }
  }, [isSuccess]);

  const submit$message = async (e: FormEvent) => {
    e.preventDefault();
    if (!refContent.current) {
      return;
    }
    if (refContent.current.value === '') {
      alertError('한 글자 이상을 입력하여야 합니다!');
      return;
    }
    const content = refContent.current.value;
    messages.push({ id: uuidv4(), author: myid, content });
    mutate({ roomid, messages });
  };

  return (
    <s.Form onSubmit={submit$message}>
      <s.Input type={'text'} name={'content'} ref={refContent} />
      <s.Button disabled={loading}>제출</s.Button>
    </s.Form>
  );
}
