import jwt from 'jsonwebtoken';
const { verify } = jwt;
export default (req, res, next) => {
  const auth = req.headers.authorization;
  if(!auth) return res.status(401).json({ message: 'No token' });
  const token = auth.split(' ')[1];
  try {
    const payload = verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch(e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
