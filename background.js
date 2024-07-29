// background.js
let adBlockEnabled = true;

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    
    return { cancel: adBlockEnabled };
    
  },
  { urls: [
    "*://*.doubleclick.net/*",
    "*://*.googlesyndication.com/*",
    "*://*.googleadservices.com/*",
    "*://*.google-analytics.com/*",
    "*://*.adnxs.com/*",
    "*://*.advertising.com/*",
    "*://*.adcolony.com/*",
    "*://*.media.net/*",
    "*://adservice.google.com/*",
    "*://click.googleanalytics.com/*",
    "*://analytics.google.com/*",
    "*://s3.amazonaws.com"

  ]},
  ["blocking"]
);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "toggleAdBlock") {
    adBlockEnabled = !adBlockEnabled;
    sendResponse({enabled: adBlockEnabled});
  }
});