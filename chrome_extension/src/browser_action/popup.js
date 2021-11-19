chrome.runtime.sendMessage({foo: 'bar'}, response => {
    console.log(response)
});

function createItem(msg) {
    const item = document.createElement('li');
    item.textContent = msg;
    document.querySelector('#actions').appendChild(item);
}
