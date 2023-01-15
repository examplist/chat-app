import { useState } from 'react';
import Users from 'components/home/Users';
import OneList from 'components/home/OneList';
import ManyList from 'components/home/ManyList';
import * as s from 'styles/home/page';

export default function index() {
  const [category, setCategory] = useState<string>('users');

  function isChosen(thisCategory: string) {
    if (thisCategory === category) {
      return 'chosen';
    } else {
      return '';
    }
  }

  return (
    <s.ExistMain>
      <s.Choose>
        <button onClick={() => setCategory('users')} className={isChosen('users')}>
          유저 목록
        </button>
        <button onClick={() => setCategory('chat-one')} className={isChosen('chat-one')}>
          1:1 채팅
        </button>
        <button
          onClick={() => setCategory('chat-many')}
          className={isChosen('chat-many')}
        >
          그룹 채팅
        </button>
      </s.Choose>
      {category === 'users' && <Users />}
      {category === 'chat-one' && <OneList />}
      {category === 'chat-many' && <ManyList />}
    </s.ExistMain>
  );
}
