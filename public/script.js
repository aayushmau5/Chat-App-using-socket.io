//Make connection
let socket = io.connect('http://localhost:4000');

//Query DOM
let btn = document.getElementById('send');
let text = document.getElementById('message');
let handle = document.getElementById('handle');
let output = document.querySelector('.output');
let feedback = document.querySelector('.feedback');

//Emit events
btn.addEventListener('click', () => {
    socket.emit('chat', {
        message: text.value,
        handle: handle.value
    });
    text.value = '';
});

text.addEventListener('keypress', () => {
    socket.emit('typing', handle.value);
});

//Listen for events
socket.on('chat', (data) => {
    output.innerHTML += `<p><strong>${data.handle}</strong>:${data.message}</p>`;
    feedback.innerHTML = '';
});

socket.on('typing', (data) => {
    feedback.innerHTML = `<p><em>${data} is typing a message....</em></p>`;
});