
// const socket = io('http://localhost:8000');

document.addEventListener('DOMContentLoaded', () => {
    const socket = io('http://localhost:8000', {
      transports: ['websocket']
    });


const form = document.getElementById('send-container');
const msgInput = document.getElementById('msgInp');
const msgContainer = document.querySelector('.container');

var audio = new Audio('IncomingMsg.mp3');

const append = (message, position) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  msgContainer.append(messageElement);
  if(position =='msgLeftCss'){
    audio.play();
  }
  

}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = msgInput.value;
  append(`You: ${message}`, 'msgRightCss');
  socket.emit('send', message);
  msgInput.value ='';
})

socket.on('connect', () => {
    console.log('Server Connected');


    const name= prompt("Please enter your name");
    socket.emit('new-user-joined', name);


    
    socket.on('user-joined', name => {
      append(`${name} joined the chat`, 'UserJoinCss')
      console.log(name);
    });

    
    socket.on('receive', data => {
      append(`${data.name}: ${data.message}`, 'msgLeftCss')
      console.log(name);
    });

    
    socket.on('leave', name => {
      append(`${name} left the chat `, 'UserJoinCss')
      console.log(name);
    });




   
});

});