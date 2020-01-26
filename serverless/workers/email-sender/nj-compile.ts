import { renderString } from 'nunjucks';

const render = (html, data) => {
  if (!html || !data) {
    console.log('html --> ', html);
    console.log('data --> ', data);

    throw new Error('HTML or DATA are null or invalid');
  }

  return renderString(html, data);
};

export {
  render,
};
