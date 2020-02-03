const MessageStore = require('./message_store');


class Sent { 
  constructor() {}


  render() { 
    var container = document.createElement('ul');
    container.className = 'messages';
    var sentMessages = new MessageStore().getSentMessages()

    sentMessages.forEach(msg =>{ 
      var sentNode = this.renderMessage(msg)
      container.appendChild(sentNode);
    });

    return container; 
  }

  renderMessage(message) { 
    var li = document.createElement('li');
    li.className = 'message';
    li.innerHTML = `<span class="to"> ${message.to} </span>
    <span class="subject"> ${message.subject} </span>
    <span class="body"> ${message.body} </span>`

    return li; 
  }
}


module.exports = Sent; 