// background.js
let adBlockEnabled = true;

// List of websites to block
const websitesToBlock = [
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
  "*://*.luckyorange.com/*",
  "*://*.luckyorange.net/*",
  "*://analytics.pointdrive.linkedin.com/*",
  "*://*.mouseflow.com/*"
];

// Create rules for each website to block
const rules = websitesToBlock.map((website, index) => ({
  id: index + 1,
  priority: 1,
  action: { type: "block" },
  condition: {
    urlFilter: website,
    resourceTypes: ["main_frame", "sub_frame", "stylesheet", "script", "image", "font", "object", "xmlhttprequest", "ping", "csp_report", "media", "websocket", "other"]
  }
}));

// Function to update the blocking rules
function updateBlockingRules() {
  if (adBlockEnabled) {
    chrome.declarativeNetRequest.updateDynamicRules({
      addRules: rules,
      removeRuleIds: rules.map(rule => rule.id)
    });
  } else {
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: rules.map(rule => rule.id)
    });
  }
}

// Initialize the blocking rules
updateBlockingRules();

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleAdBlock") {
    adBlockEnabled = !adBlockEnabled;
    updateBlockingRules();
    sendResponse({enabled: adBlockEnabled});
  }
});