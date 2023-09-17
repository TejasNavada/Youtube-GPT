'use strict';

window.addEventListener("message", (event) => {
  // We only accept messages from ourselves
  if (event.source !== window) {
    return;
  }

  if (event.data.type && (event.data.type === "CAPTIONS")) {
    console.log("Content script received: " + event.data.text);
    chrome.runtime.sendMessage(
        {
          type: 'Captions',
          payload: {
            message: event.data.text,
          },
        },
        (response) => {
          console.log(response.message);
        }
      );
  }
}, false);