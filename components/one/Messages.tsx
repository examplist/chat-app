import { useEffect, useRef } from 'react';
import axios from 'axios';
import { alertError } from 'utils/alert';
import * as s from 'styles/one/Messages';
import { Message } from 'pages/one/[id]';
import { TypeOneStore } from 'store/one';

interface PropMessage {
  id: string;
  people: string[];
  messages: Message[];
  myid: string;
  another: TypeOneStore;
}

interface PropMyMessage {
  docid: string;
  messageid: string;
  content: string;
  messages: Message[];
}

interface PropAnotherMessage {
  photo: string;
  content: string;
}

function MyMessage({ docid, messageid, content, messages }: PropMyMessage) {
  const click$delete = async () => {
    const newMessages = messages.filter((message) => message.id !== messageid);
    const { status } = await axios.put(`/api/one-message?id=${docid}`, {
      messages: newMessages,
    });
    if (status !== 201) {
      alertError('죄송합니다. 문제가 발생했습니다.');
      return;
    }
  };

  return (
    <s.MyMessageContainer>
      <s.MyMessageContent>
        <div>{content}</div>
        <div></div>
      </s.MyMessageContent>
      <s.MyMessageDelete onClick={click$delete}>삭제</s.MyMessageDelete>
    </s.MyMessageContainer>
  );
}

function AnotherMessage({ photo, content }: PropAnotherMessage) {
  return (
    <s.AnotherMessageContainer>
      <s.AnotherMessagePhoto>
        <img src={photo} />
      </s.AnotherMessagePhoto>
      <s.AnotherMessageContent>
        <div>{content}</div>
        <div></div>
      </s.AnotherMessageContent>
    </s.AnotherMessageContainer>
  );
}

export default function Messages({
  id: docid,
  people,
  messages,
  myid,
  another,
}: PropMessage) {
  const isAnotherOut = !another.id || !people.includes(another.id);
  const refContainer = useRef<HTMLElement>(null);

  useEffect(() => {
    const $container = refContainer.current;
    if ($container) {
      $container.scroll(0, $container.scrollHeight);
    }
  });

  if (messages.length === 0) {
    return (
      <>
        {isAnotherOut && <s.OutMessage>현재 상대방이 방을 나갔습니다.</s.OutMessage>}
        <s.NoMessage>아직 대화가 없습니다.</s.NoMessage>
      </>
    );
  }

  return (
    <s.Container ref={refContainer}>
      {isAnotherOut && <s.OutMessage>현재 상대방이 방을 나갔습니다.</s.OutMessage>}
      {messages.map(({ id: messageid, author, content }) => {
        if (author === myid) {
          return (
            <MyMessage
              key={messageid}
              docid={docid}
              messageid={messageid}
              content={content}
              messages={messages}
            />
          );
        } else {
          return (
            <AnotherMessage
              key={messageid}
              photo={another.photo || ''}
              content={content}
            />
          );
        }
      })}
    </s.Container>
  );
}
