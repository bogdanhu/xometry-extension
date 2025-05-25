chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "extract-xometry-data",
    title: "Extrage date Xometry",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "extract-xometry-data") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });
  }
});