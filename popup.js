'use strict';



function askQuestion(){
  document.getElementById("response").textContent="";
  var port = chrome.runtime.connect({name: "gpt"});
  port.postMessage(document.getElementById("question").value);
  port.onMessage.addListener(function(msg) {
    document.getElementById("response").textContent=msg;
  });
}

document.getElementById("btn").addEventListener('click', askQuestion);

