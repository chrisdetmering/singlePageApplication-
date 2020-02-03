const MessageStore = require('./message_store');



class Inbox { 
  constructor() { 

  }

  render() { 
    var container = document.createElement('ul');
    container.className = 'messages';
    var receivedMsg = new MessageStore().getInboxMessages();

    receivedMsg.forEach(message => {
      var nodeMsg = this.renderMessage(message);
      container.appendChild(nodeMsg);
    });

    return container; 
  }


  renderMessage(message) { 
    var li = document.createElement('li');
    li.className = 'message';
    li.innerHTML = 
    `<span class="from"> ${message.from} </span> 
    <span class="subject"> ${message.subject} </span>
    <span class="body"> ${message.body} </span>`

    return li; 
  }

}

module.exports = Inbox;