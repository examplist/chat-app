import { db } from 'fb';
import { doc, onSnapshot } from 'firebase/firestore';
import { ManyStore } from 'store/many';
import { alertError } from './alert';

export default function (id: string, manyStore: ManyStore) {
  const {
    allPeople,
    curPeople,
    setIsLoading,
    setIsError,
    setId,
    setTitle,
    setAllPeople,
    setCurPeople,
    setMessages,
  } = manyStore;

  onSnapshot(doc(db, 'many', id), async (doc) => {
    if (doc.exists()) {
      // 데이터
      const allPeopleIdsFromServer = doc.data().allPeople;
      const allPeopleIdsFromClient = Object.keys(allPeople);
      const curPeopleIdsFromServer = doc.data().curPeople;
      const curPeopleIdsFromClient = Object.keys(curPeople);

      // 현재 멤버 추가
      for (const personId of curPeopleIdsFromServer) {
        if (!curPeopleIdsFromClient.includes(personId)) {
          const response = await fetch(`/api/auth?user=${personId}`);
          if (response.status !== 200) {
            alertError('죄송합니다. 문제가 발생했습니다.');
            continue;
          }
          const { id, name, photo } = await response.json();
          allPeople[id] = { name, photo };
          curPeople[id] = { name, photo };
        }
      }

      // 현재 멤버는 아니지만 기존에 있었던 멤버 추가
      for (const personId of allPeopleIdsFromServer) {
        if (!allPeopleIdsFromClient.includes(personId)) {
          const response = await fetch(`/api/auth?user=${personId}`);
          if (response.status !== 200) {
            alertError('죄송합니다. 문제가 발생했습니다.');
            continue;
          }
          const { id, name, photo } = await response.json();
          allPeople[id] = { name, photo };
        }
      }

      // 나간 멤버 빼기
      for (const personId of curPeopleIdsFromClient) {
        if (!curPeopleIdsFromServer.includes(personId)) {
          delete curPeople[personId];
        }
      }

      setIsLoading(false);
      setId(id);
      setTitle(doc.data().title);
      setAllPeople({ ...allPeople });
      setCurPeople({ ...curPeople });
      setMessages(doc.data().messages);
    } else {
      setIsLoading(false);
      setIsError(true);
    }
  });
}
