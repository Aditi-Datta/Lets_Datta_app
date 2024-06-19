



document.addEventListener('DOMContentLoaded', (event) => {
  const text = "Hey how are you?";
  const typewriterElement = document.getElementById('typewriter');
  let index = 0;
  function type() {
    if (index < text.length) {
        typewriterElement.textContent += text.charAt(index);
        index++;
        setTimeout(type, 100);
    }
}
  type();
});
document.addEventListener('DOMContentLoaded', (event) => {
  const text = "Bhai I'm fine. How about you?";
  const typewriterElement = document.getElementById('typewriter2');
  let index = 0;
  function type() {
    if (index < text.length) {
        typewriterElement.textContent += text.charAt(index);
        index++;
        setTimeout(type, 200);
    }
}
  type();
});
document.addEventListener('DOMContentLoaded', (event) => {
  const text = "I'm also fine.";
  const typewriterElement = document.getElementById('typewriter3');
  let index = 0;
  function type() {
    if (index < text.length) {
        typewriterElement.textContent += text.charAt(index);
        index++;
        setTimeout(type, 400);
    }
}
  type();
});




document.addEventListener('DOMContentLoaded', () => {
    const socket = io('http://localhost:8000', {
      transports: ['websocket']
    });

    const openPopupButton = document.getElementById('open-popup');
    const modal = document.getElementById('popup-form');
    const closeModalButton = document.querySelector('.close');
  
    openPopupButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });
  
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });
  
    window.addEventListener('click', (event) => {
      if (event.target == modal) {
          modal.style.display = 'none';
      }
    });

    
const form = document.getElementById('send-container');
const msgInput = document.getElementById('msgInp');
const msgContainer = document.querySelector('.container');
const modalMsg = document.querySelector('.modal');

var audio = new Audio('IncomingMsg.mp3');

const append = (message, position) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  msgContainer.append(messageElement);
  if(position =='msgLeftCss'){
    audio.play();
  };
  // modalMsg.append(messageElement);
  // if(position =='msgLeftCss'){
  //   audio.play();
  // }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = msgInput.value;
  append(`You: ${message}`, 'msgRightCss');
  socket.emit('send', message);
  msgInput.value ='';
})
var namePopUp = document.getElementById('name');
var messagePopUp = document.getElementById('message');

modal.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = namePopUp.value;
  socket.emit('new-user-joined', name);

  const message = messagePopUp.value;
  append(`You: ${message}`, 'msgRightCss');
  socket.emit('send', message);
  namePopUp.value ='';
  messagePopUp.value ='';
  modal.style.display = 'none';
})



socket.on('connect', () => {
    console.log('Server Connected');


    
    // const name= prompt("Please enter your name to join in this chat application");

    // socket.emit('new-user-joined', name);

    
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