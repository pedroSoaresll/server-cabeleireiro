import * as Yup from 'yup';

export default async function(req, res, next) {
  const schema = Yup.object().shape({
    latitude: Yup.number().required(),
    longitude: Yup.number().required(),
    establishmentId: Yup.string().required()
  });

  if (!(await schema.isValid(req.body))) {
    return res.json({
      error: 'Invalid required parameters'
    });
  }

  return next();
}
