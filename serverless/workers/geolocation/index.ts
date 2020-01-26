export const handler = event => {
  event.Records.forEach(({ body }) => {
    console.log('body received', body);
  });

  return true;
};
