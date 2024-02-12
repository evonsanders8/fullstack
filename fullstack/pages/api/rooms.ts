import { NextApiRequest, NextApiResponse } from 'next';
import { Room } from '../types';
import roomsData from '../../public/data.json';


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     try {
//       const response = await fetch('localhost:3000/data.json');
//       const data = await response.json();
//       res.status(200).json(data);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to fetch data' });
//     }
//   }