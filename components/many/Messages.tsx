import { useAuthStore } from 'store/auth';
import { useManyStore } from 'store/many';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { alertError } from 'utils/alert';
import * as s from 'styles/many/Messages';
import { Message } from 'store/many';

interface PropMyMessage {
  roomid: string;
  messageid: string;
  content: string;
  messages: Message[];
}
interface PropAnotherMessage {
  name: string;
  content: string;
}

function MyMessage({ roomid, messageid, content, messages }: PropMyMessage) {
  const click$delete = async () => {
    const newMessages = messages.filter((message) => message.id !== messageid);
    const { status } = await axios.put(`/api/many-message?id=${roomid}`, {
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

function AnotherMessage({ name, content }: PropAnotherMessage) {
  return (
    <s.AnotherMessageContainer>
      <s.AnotherMessageName>{name}</s.AnotherMessageName>
      <s.AnotherMessageContent>
        <div>{content}</div>
        <div></div>
      </s.AnotherMessageContent>
    </s.AnotherMessageContainer>
  );
}

export default function Messages() {
  const { id: roomid, allPeople, messages } = useManyStore();
  const { id: myid } = useAuthStore();
  const refContainer = useRef<HTMLElement>(null);

  useEffect(() => {
    const $container = refContainer.current;
    if ($container) {
      $container.scroll(0, $container.scrollHeight);
    }
  });

  if (messages.length === 0) {
    return <s.NoMessage>아직 대화가 없습니다.</s.NoMessage>;
  }

  return (
    <s.Container ref={refContainer}>
      {messages.map(({ id: messageid, author, content }) => {
        if (author === myid) {
          return (
            <MyMessage
              key={messageid}
              roomid={roomid}
              messageid={messageid}
              content={content}
              messages={messages}
            />
          );
        } else {
          return (
            <AnotherMessage
              key={messageid}
              name={allPeople[author].name}
              content={content}
            />
          );
        }
      })}
    </s.Container>
  );
}
