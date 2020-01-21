import * as Yup from 'yup';

export default async function(req, res, next) {
  const schema = Yup.object().shape({
    googleId: Yup.string().required(),
    name: Yup.string().required()
  });

  if (!(await schema.isValid(req.body))) {
    return res.json({
      error: 'Invalid required parameters'
    });
  }

  return next();
}
