import '@article-quiz/preset';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Button } from '@article-quiz/components';

const root = document.createElement('div');
root.id = 'crx-root';
console.log('will start some fucking react app?');
console.log({
  document,
  body: document.body,
});
document.body.appendChild(root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Button className={'sticky top-10 left-10'}>TEST SOME CONTENT</Button>
  </React.StrictMode>
);
