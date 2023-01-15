import { db } from 'fb';
import { doc, updateDoc } from 'firebase/firestore';
import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';

async function handlePut(req: Req, res: Res) {
  const { id } = req.query;
  if (typeof id !== 'string') {
    res.status(400).end();
    return;
  }
  const { messages } = req.body;
  await updateDoc(doc(db, 'one', id), {
    messages,
  });
  return res.status(201).json({ id });
}

//////////////////////////////////////////////////////

export default async function (req: Req, res: Res) {
  if (req.method === 'PUT') {
    try {
      await handlePut(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  }
}
