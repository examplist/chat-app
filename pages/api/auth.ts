import { db, storage } from 'fb';
import {
  doc,
  collection,
  query,
  where,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';

async function handleGet(req: Req, res: Res) {
  const { user } = req.query;
  if (typeof user !== 'string') {
    res.status(400).end();
    return;
  }
  const snap = await getDoc(doc(db, 'users', user));
  if (!snap.exists()) {
    res.status(404).end();
    return;
  }
  const { name, photo } = snap.data();
  res.status(200).json({ id: snap.id, name, photo });
}

async function handlePost(req: Req, res: Res) {
  const { user } = req.query;
  if (typeof user !== 'string') {
    res.status(400).end();
    return;
  }
  const { name, photo } = req.body;
  await setDoc(doc(db, 'users', user), {
    name,
    photo,
    deleted: false,
  });
  res.status(201).end();
}

async function handlePut(req: Req, res: Res) {
  const { user } = req.query;
  if (typeof user !== 'string') {
    res.status(400).end();
    return;
  }
  const { name, photo } = req.body;
  if (name !== null) {
    await updateDoc(doc(db, 'users', user), {
      name,
    });
    res.status(204).end();
    return;
  }
  if (photo !== null) {
    const storageRef = ref(storage, `profile/${user}`);
    await uploadBytes(storageRef, new Uint8Array(photo));
    const url = await getDownloadURL(storageRef);
    await updateDoc(doc(db, 'users', user), {
      photo: url,
    });
    res.status(200).json({ url });
    return;
  }
}

async function handleDelete(req: Req, res: Res) {
  const { user } = req.query;
  if (typeof user !== 'string') {
    res.status(400).end();
    return;
  }
  // users에서 deleted true로 바꾸기 -> 목록에 뜨지 않게
  await updateDoc(doc(db, 'users', user), {
    deleted: true,
  });
  // 모든 1:1 방에서 나가기
  const queryOne = query(collection(db, 'one'), where('people', 'array-contains', user));
  const snapOne = await getDocs(queryOne);
  snapOne.docs.map(async (room) => {
    if (!room.exists()) {
      return;
    }
    const newPeople = room.data().people.filter((person: string) => person !== user);
    await updateDoc(doc(db, 'one', room.id), {
      people: newPeople,
    });
  });
  // 모든 그룹 방에서 나가기
  const queryMany = query(
    collection(db, 'many'),
    where('curPeople', 'array-contains', user)
  );
  const snapMany = await getDocs(queryMany);
  snapMany.docs.map(async (room) => {
    if (!room.exists()) {
      return;
    }
    const newCurPeople = room
      .data()
      .curPeople.filter((curPerson: string) => curPerson !== user);
    await updateDoc(doc(db, 'many', room.id), {
      curPeople: newCurPeople,
    });
  });
  // 응답
  res.status(204).end();
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

  if (req.method === 'POST') {
    try {
      await handlePost(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  }

  if (req.method === 'PUT') {
    try {
      await handlePut(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  }

  if (req.method === 'DELETE') {
    try {
      await handleDelete(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  }
}
