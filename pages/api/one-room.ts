import { db } from 'fb';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';

// handlers

async function handleGet(req: Req, res: Res) {
  const { me, an } = req.query;
  if (typeof me !== 'string' || typeof an !== 'string') {
    res.status(400).end();
    return;
  }
  const id = me < an ? `${me}-${an}` : `${an}-${me}`;
  const snap = await getDoc(doc(db, 'one', id));
  if (!snap.exists()) {
    res.status(404).end();
    return;
  }
  const { people, messages } = snap.data();
  res.status(200).json({ id, people, messages });
}

async function handlePost(req: Req, res: Res) {
  const { me, an } = req.query;
  if (typeof me !== 'string' || typeof an !== 'string') {
    res.status(400).end();
    return;
  }
  const id = me < an ? `${me}-${an}` : `${an}-${me}`;
  await setDoc(doc(db, 'one', id), {
    people: [me, an],
    messages: [],
  });
  return res.status(201).json({ id });
}

async function handlePatch(req: Req, res: Res) {
  const { me, an } = req.query;
  if (typeof me !== 'string' || typeof an !== 'string') {
    res.status(400).end();
    return;
  }
  const id = me < an ? `${me}-${an}` : `${an}-${me}`;
  await updateDoc(doc(db, 'one', id), {
    people: [me, an],
  });
  return res.status(201).json({ id });
}

async function handleDelete(req: Req, res: Res) {
  const { me, an } = req.query;
  if (typeof me !== 'string' || typeof an !== 'string') {
    res.status(400).end();
    return;
  }
  const id = me < an ? `${me}-${an}` : `${an}-${me}`;
  await updateDoc(doc(db, 'one', id), {
    people: [an],
  });
  return res.status(204).end();
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

  if (req.method === 'PATCH') {
    try {
      await handlePatch(req, res);
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
