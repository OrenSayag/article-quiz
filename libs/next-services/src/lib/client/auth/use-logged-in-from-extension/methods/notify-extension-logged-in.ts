/// <reference types="chrome"/>
'use client';

export const notifyExtensionLoggedIn = async () => {
  const extId = process.env['NEXT_PUBLIC_CHROME_EXTENSION_ID'];

  if (!extId) {
    console.error('No chrome extension id in env');
  }

  if (typeof chrome !== 'undefined' && chrome && chrome.runtime) {
    const res = await chrome.runtime.sendMessage(extId, {
      messageType: 'LOGGED_IN',
    });
    console.log({ res });
  }
};
