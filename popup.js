'use strict';

import './popup.css'

function askQuestion(){
  document.getElementById("response").textContent="";
  var port = chrome.runtime.connect({name: "gpt"});
  port.postMessage(document.getElementById("question").value);
  port.onMessage.addListener(function(msg) {
    document.getElementById("response").textContent=msg;
  });
}

function sendAPIKEY(){
  chrome.runtime.sendMessage(
    {
      type: 'APIKEY',
      payload: {
        message: document.getElementById("api key").value,
      },
    },
    (response) => {
      console.log(response.message);
    }
  );
  document.getElementById("apibtn").style.display="none";
  document.getElementById("api key").style.display='none';
}

document.getElementById("apibtn").addEventListener('click',sendAPIKEY)
document.getElementById("btn").addEventListener('click', askQuestion);

