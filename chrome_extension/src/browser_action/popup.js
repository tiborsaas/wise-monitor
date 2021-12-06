chrome.runtime.sendMessage('get-actions', (response) => {
    // 3. Got an asynchronous response with the data from the background
    console.log(response);
    response.forEach(item => {
        createItem(item);
    });
});

// document.querySelector('#test').addEventListener(() => {
//     console.log('render...');
//     chrome.runtime.sendMessage('get-actions', (response) => {
//         // 3. Got an asynchronous response with the data from the background
//         console.log(response);
//     });
// })

function createItem(msg) {
    const item = document.createElement('li');
    item.textContent = msg;
    document.querySelector('#actions').appendChild(item);
}
