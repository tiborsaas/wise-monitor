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
    item.textContent = msg;
    document.querySelector('#actions').appendChild(item);
}
