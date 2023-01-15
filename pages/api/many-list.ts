import { db } from 'fb';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';

// handlers

async function handleGet(req: Req, res: Res) {
  const { user } = req.query;
  if (typeof user !== 'string') {
    res.status(400).end();
    return;
  }
  const queryMade = query(
    collection(db, 'many'),
    where('curPeople', 'array-contains', user)
  );
  const snap = await getDocs(queryMade);
  const rooms = snap.docs.map((room) => {
    return {
      id: room.id,
      title: room.data().title,
    };
  });
  res.status(200).json(rooms);
}

async function handlePost(req: Req, res: Res) {
  const { myid, title } = req.body;
  await addDoc(collection(db, 'many'), {
    title,
    allPeople: [myid],
    curPeople: [myid],
    messages: [],
  });
  res.status(201).end();
}

// requests and responses

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
}
