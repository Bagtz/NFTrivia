import express from 'express';
import cors from 'cors';

import routes from './route.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes)

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});