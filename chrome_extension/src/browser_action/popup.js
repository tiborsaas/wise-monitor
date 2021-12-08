let totalReceived = 0;

chrome.runtime.sendMessage('get-actions', (response) => {
    console.log(response);
    response.forEach(item => {
        createItem(item);
    });
});

function calculateTotalReceived(actions) {
    return actions.reduce((acc, curr) => {
        if (curr.type === 'transfer_received') {
            acc += curr.message;
        }
        return acc;
    }, 0);
}

function createItem(msg) {
    const item = document.createElement('li');
    const time = document.createElement('span');

    let options = { dateStyle: "medium", timeStyle: "medium" };
    const timeAt = new Date(msg.sent_at).toLocaleString("en-GB", options);

    time.textContent = timeAt;

    if (msg.type === 'transfer_issue') {
        const badges = createBadges(msg.message);
        badges.forEach(badge => {
            item.appendChild(badge);
        });
    } else if (msg.type === 'state_change') {
        item.textContent = msg.message;
    } else if (msg.type === 'transfer_received') {
        item.textContent = `${msg.message.amount} ${msg.message.currency}`;
    }

    item.className = msg.type;
    item.appendChild(time);
    document.querySelector('#actions').appendChild(item);
}

function createBadges(issueArr) {
    return issueArr.map((issue) => {
        const node = document.createElement('span');
        node.className = 'badge';
        node.textContent = issue;
        return node;
    });
}
