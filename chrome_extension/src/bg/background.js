const actions = [];

function createActionEntry(payload) {
  const { data, sent_at, event_type } = payload;

  const eventMap = {
    "transfers#state-change": {
      type: "state_change",
      key: "current_state",
    },
    "transfers#active-cases": {
      type: "transfer_issue",
      key: "active_cases",
    },
    "balances#credit": {
      type: "transfer_received",
      key: "post_transaction_balance_amount",
    },
  }

  return {
    type: data[eventMap[event_type]].type,
    message: data[eventMap[event_type]].key,
    sent_at,
  }
}

function initServerConnection(port) {
  const url = "ws://127.0.0.1:5000";
  socket = new WebSocket(url);

  socket.onmessage = function (event) {
    if (event.data) {
      const { payload } = JSON.parse(event);
      chrome.browserAction.setBadgeText({text: data });
      console.log(payload);
      console.log(actions);

      actions.push(createActionEntry(payload));
    }
  };

  socket.onclose = function (event) {
    chrome.browserAction.setBadgeText({text: "-" })
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
