import { db } from 'fb';
import { doc, updateDoc } from 'firebase/firestore';
import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';

async function handlePost(req: Req, res: Res) {
  const { id, userid, allPeople, curPeople } = req.body;
  const allPeopleIds = Object.keys(allPeople);
  const curPeopleIds = Object.keys(curPeople);
  // 나갔다가 다시 들어오는 경우 추가되지 않게
  if (!allPeopleIds.includes(userid)) {
    allPeopleIds.push(userid);
  }
  curPeopleIds.push(userid);
  await updateDoc(doc(db, 'many', id), {
    allPeople: allPeopleIds,
    curPeople: curPeopleIds,
  });
  return res.status(201).json({ id });
}

async function handleDelete(req: Req, res: Res) {
  const { id, userid, curPeople } = req.body;
  delete curPeople[userid];
  const curPeopleIds = Object.keys(curPeople);
  await updateDoc(doc(db, 'many', id), {
    curPeople: curPeopleIds,
  });
  return res.status(204).end();
}

//////////////////////////////////////////////////////

export default async function (req: Req, res: Res) {
  if (req.method === 'POST') {
    try {
      await handlePost(req, res);
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
