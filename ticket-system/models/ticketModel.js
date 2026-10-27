import fs from 'fs'
import path from 'path'

import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

 export const readtickets = JSON.parse(fs.readFileSync(path.join(__dirname, '../db.json'), 'utf-8'))

export const writeToFile = (data) => {
  fs.writeFileSync(path.join(__dirname, '../db.json'), JSON.stringify(data, null, 2))
}

