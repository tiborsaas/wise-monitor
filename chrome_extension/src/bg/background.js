const actions = [];

function initServerConnection(port) {
  // const url = "ws://35.203.156.49:8080";
  const url = "ws://127.0.0.1:5000";
  socket = new WebSocket(url);

  socket.onmessage = function (event) {
    if (event.data) {
      const payload = JSON.parse(event.data);
      const { data, sent_at, event_type } = payload;
      // chrome.browserAction.setBadgeText({text: data });
      console.log(payload)

      if (event_type === 'transfers#state-change') {
        actions.push({
          type: 'state_change',
          message: data.current_state,
          sent_at,
        })
      }

      if (event_type === 'transfers#active-cases') {
        actions.push({
          type: 'transfer_issue',
          message: data.active_cases,
          sent_at,
        })
      }

      if (event_type === 'balances#credit') {
        actions.push({
          type: data.resource.type,
          message: data.post_transaction_balance_amount,
          sent_at,
        })
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


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'get-actions') {
    sendResponse(actions);
  }
});

initServerConnection();
