const actions = [];

function createActionEntry(payload) {
  const { data, sent_at, event_type } = payload;

  const eventMap = {
    "transfers#state-change": {
      type: "state_change",
      extract: () => data["current_state"],
    },
    "transfers#active-cases": {
      type: "transfer_issue",
      extract: () => data["active_cases"],
    },
    "balances#credit": {
      type: "transfer_received",
      extract: () => {
        return {
          amount: data["amount"],
          currency: data["currency"],
        }
      },
    },
  }

  return {
    type: eventMap[event_type].type,
    message: eventMap[event_type].extract(),
    sent_at,
  }
}

function initServerConnection() {
  const url = "ws://127.0.0.1:5000";
  socket = new WebSocket(url);

  socket.onmessage = function (messageEvent) {
    if (messageEvent.data) {
      const payload = JSON.parse(messageEvent.data);
      console.log(payload);
      console.log(actions);

      if (payload.event_type !== 'connection') {
        actions.push(createActionEntry(payload));
      }
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
