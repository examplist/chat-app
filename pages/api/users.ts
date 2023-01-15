import { db } from 'fb';
import {
  doc,
  collection,
  query,
  where,
  getDoc,
  getDocs,
  orderBy,
} from 'firebase/firestore';
import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';

async function handleGet(req: Req, res: Res) {
  const { user } = req.query;
  if (typeof user !== 'string') {
    res.status(400).end();
    return;
  }
  // 전체 목록 가져오기
  if (user === 'all') {
    const queryMade = query(
      collection(db, 'users'),
      where('deleted', '!=', true),
      orderBy('deleted', 'asc'),
      orderBy('name', 'asc')
    );
    const snapUsers = await getDocs(queryMade);
    const users = snapUsers.docs.map((user) => {
      return { id: user.id, name: user.data().name, photo: user.data().photo };
    });
    res.status(200).json(users);
    return;
  }

  // 1:1 목록 불러오기
  const queryMade = query(collection(db, 'one'), where('people', 'array-contains', user));
  const snapRooms = await getDocs(queryMade);
  const others = [];
  for (let i = 0; i < snapRooms.docs.length; i++) {
    const roomid = snapRooms.docs[i].id;
    const another = roomid.split('-').find((person: string) => person !== user);
    if (!another) {
      return res.status(404).end();
    }
    const snapAnother = await getDoc(doc(db, 'users', another));
    if (snapAnother.exists()) {
      others.push({
        id: snapAnother.id,
        name: snapAnother.data().name,
        photo: snapAnother.data().photo,
      });
    }
  }
  return res.status(200).json(others);
}

//////////////////////////////////////////////////////

export default async function (req: Req, res: Res) {
  if (req.method === 'GET') {
    try {
      await handleGet(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  }
}
