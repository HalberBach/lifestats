import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        return res.status(200).json({ message: 'Test-API läuft!', data: { id: 1, name: 'Beispiel' } });
    }

    return res.status(405).json({ error: 'Methode nicht erlaubt' });
}
