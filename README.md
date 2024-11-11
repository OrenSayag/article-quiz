Tool to pop up a quiz about an article you've read on the internet.

## Testing the SDK

1. Serve the sdk: `http-server`.

2. In browser console, paste the script:

```js
const script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'http://localhost:8080/sdk/sdk.js';
document.head.appendChild(script);
```

The JS is loaded to the site.
