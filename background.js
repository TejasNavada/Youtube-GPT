'use strict';

var captions = "";
var messages = [];
var openai;
var apikey = false;
import OpenAI from 'openai';


chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name === "gpt");
  console.log("Connected .....");
  port.onMessage.addListener(async function(msg) {
    if(captions === ""){
      port.postMessage("Reload the page");
    }
    else if(!apikey){
      port.postMessage("Enter Open AI API KEY")
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
  if(request.type==="APIKEY") {
    openai = new OpenAI({
      apiKey: request.payload.message
    });
    apikey=true;
    const message = 'API KEY Received';
    sendResponse({message,});
  }
  else if (request.type === 'Captions') {
    captions = request.payload.message;
    messages = [{"role": "system", "content": "You give short answers to questions about a video with the captions as context. Here are the captions: "+request.payload.message}]
    const message = 'Captions Received';
    sendResponse({message,});
  }
  
});
