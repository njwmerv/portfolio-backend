import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send('Got a request for home!');
});

export default router;
