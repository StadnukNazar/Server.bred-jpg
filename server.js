import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imgDir = path.join(__dirname, 'Bred.jpg');

const app = express()
const port = process.argv[2] ? parseInt(process.argv[2], 10) : 3000;
if (isNaN(port) || port <= 0) {
  console.log(process.argv[2])
  console.error('ERROR ');
  process.exit(1);
}

const favicon = readFileSync(path.join(imgDir, ''));

app.get('/:jpg/:width/:height', (req, res) => {
  const width = parseInt(req.params.width, 10);
  const height = parseInt(req.params.height, 10);

  console.log(`Received request for image with width: ${width} and height: ${height}`);

  if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
    return res.status(400).send('Invalid width || height');
  }

  let sourceImage = path.join(imgDir, '');
  

  res.setHeader('Content-Type', 'image/jpeg');

  sharp(sourceImage)
    .resize(width, height, {
      fit: "cover",
      position: "center"
    })
    .jpeg({ quality: 80 })
    .pipe(res);
});

app.get('/', (req, res) => {
  res.redirect('/jpg/1000/1000');

});



app.listen(port, () => {
    console.log(`Server is running on port 127.0.0.1:${port}`)
});
