const actions = [];

function initServerConnection() {
  const url = "ws://127.0.0.1:5000";
  socket = new WebSocket(url);

  socket.onmessage = function (messageEvent) {
    if (messageEvent.data) {
      const payload = JSON.parse(messageEvent.data);
      console.log(payload);
      console.log(actions);
    }
  };

  socket.onclose = function (event) {
    chrome.browserAction.setBadgeText({text: "-" })
  };

  socket.onerror = function (error) {
    chrome.browserAction.setBadgeText({text: "err" })
  };
}

initServerConnection();
