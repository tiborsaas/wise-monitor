function initServerConnection(port) {
  // const url = "ws://35.203.156.49:8080";
  const url = "ws://127.0.0.1:5000";
  socket = new WebSocket(url);

  socket.onmessage = function (event) {
    if (event.data) {
      const payload = JSON.parse(event.data);
      chrome.browserAction.setBadgeText({text: payload.data })
      console.log('websocket', payload);

      if (payload.action === 'transfer') {
        console.log('transfer event');
      }
    }
  };

  socket.onclose = function (event) {
    chrome.browserAction.setBadgeText({text: "X" })
  };

  socket.onerror = function (error) {
    chrome.browserAction.setBadgeText({text: "err" })
  };
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log(msg);
  if (msg.foo === 'bar') {
    sendResponse("ACID");
    return true;
  }
});

initServerConnection();
