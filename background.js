'use strict';

var captions = "";
var messages = [];

import OpenAI from 'openai';
const openai = new OpenAI({
  apiKey: "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"
});

chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name === "gpt");
  console.log("Connected .....");
  port.onMessage.addListener(async function(msg) {
    if(captions === ""){
      port.postMessage("Reload the page");
    }
    else{
      messages.push({"role": "user", "content": msg});
      var gptResp = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
      });
      port.postMessage(gptResp.choices[0].message.content);
    }
    
  });
});


chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.type === 'Captions') {
    captions = request.payload.message;
    messages = [{"role": "system", "content": "You give short answers to questions about a video with the captions as context. Here are the captions: "+request.payload.message}]
    const message = 'Captions Received';
    sendResponse({message,});
  }
  
});
