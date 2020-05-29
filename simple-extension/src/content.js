var scriptElement = document.createElement("script");
scriptElement.setAttribute('src', chrome.runtime.getURL('/capturer/capturer.js'));
document.head.appendChild(scriptElement);
