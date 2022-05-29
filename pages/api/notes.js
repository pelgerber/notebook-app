import prisma from "../../lib/prisma"
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method === 'POST') {

    const mydate = new Date(Date.now()).toISOString();

    console.log(mydate)

    const noteItem = {
      id: uuidv4(),
      date: mydate,
      title: req.body.title,
      text: req.body.text,
    }

    const note = await prisma.notes.create({
      data: noteItem,
    });

    return res.status(200).json(note);

  } else if (req.method === 'GET') {

    console.log('GET request received!')

    try {
      const data = await prisma.notes.findMany({})
      return res.status(200).json({ data })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ msg: 'Something went wrong' })
    }

  } else if (req.method === 'DELETE') {

    try {
      const data = await prisma.notes.delete({
        where: { id: req.body.id },
      })
      return res.status(200).json({ data })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ msg: 'Something went wrong' })
    }

  } else {
    return res.status(405).json({ msg: 'Method not allowed' })
  }

}