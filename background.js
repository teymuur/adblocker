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
    "*://analytics.s3.amazonaws.com/*",
    "*://adtago.s3.amazonaws.com/*",
    "*://analyticsengine.s3.amazonaws.com/*",
    "*://advice-ads.s3.amazonaws.com/*",
    "*://pixel.facebook.com/*",
    "*://an.facebook.com/*",
    "*://events.reddit.com/*",
    "*://events.redditmedia.com/*",
    "*://static.ads-twitter.com/*",
    "*://ads-api.twitter.com/*",
    "*://ads.youtube.com/*",
    "*://ads.pinterest.com/*",
    "*://ads.linkedin.com/*",
    "*://ads-api.tiktok.com/*",
    "*://ads-sg.tiktok.com/*",
    "*://ads.tiktok.com/*",
    "*://ads.yahoo.com/*",
    "*://adserver.unityads.unity3d.com/*",
    "*://auction.unityads.unity3d.com/*",
    "*://*.hotjar.com/*",
    "*://*.freshmarketer.com/*",
    "*://*.luckyorange.com/*",  "*://*.luckyorange.net/*",
    "*://analytics.pointdrive.linkedin.com/*",
    "*://*.mouseflow.com/*",

  ]},
  ["blocking"]
);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "toggleAdBlock") {
    adBlockEnabled = !adBlockEnabled;
    sendResponse({enabled: adBlockEnabled});
  }
});