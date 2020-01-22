import Establishment from '../models/Establishment';

export default async function(req, res, next) {
  const { token: googleId } = req.headers;

  if (!googleId) {
    return res.status(401).json({
      error: 'token is required'
    });
  }

  const establishment = await Establishment.findOne({ googleId });

  if (!establishment) {
    return res.status(404).json({
      error: 'user not found'
    });
  }

  req.establishment = establishment;

  return next();
}
