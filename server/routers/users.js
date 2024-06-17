import express from 'express';

const router = express.Router();

const user = [
  {
    id: 1,
    name: 'John Doe',
    email: 'themiya@gmail.com',
  },
];

router.get('/', (req, res) => {
  res.send(user);
});

export default router;
