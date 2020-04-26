const loginForm = document.getElementById("welcome-form");
const messagesSection = document.getElementById("messages-section");
const messagesList = document.getElementById("messages-list");
const addMessageForm = document.getElementById("add-messages-form");
const userNameInput = document.getElementById("username");
const messageContentInput = document.getElementById("message-content");
const socket = io();

socket.on('message', ({ author, content }) => addMessage(author, content))

let userName = '';

loginForm.addEventListener('submit', (event) => {
  login(event);
});

addMessageForm.addEventListener('submit', (event) => {
  sendMessage(event);
});

const login = () => {
  event.preventDefault();
  // console.log('click');

  if (userNameInput.value == '') {
    alert('Type your name, please')
  }
  else {
    userName = userNameInput.value;
    //console.log(userName);
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }
  socket.emit('join', userName);
};

const sendMessage = () => {
  event.preventDefault();
  // console.log('click');

  if (messageContentInput.value == '') {
    alert('Type your message, please')
  }
  else {
    addMessage(userName, messageContentInput.value);
    socket.emit('message', { author: userName, content: messageContentInput.value })
    messageContentInput.value = '';
  }
};

const addMessage = (author, content) => {
  const message = document.createElement('li');
  message.classList.add('message', 'message--received');
  if (author == userName) message.classList.add('message--self');
  message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author }</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
  messagesList.appendChild(message);

}