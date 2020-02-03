const MessageStore = require('./message_store')

class Compose { 
  constructor() { 

  }
  
  render() { 
    var newMessage = document.createElement('div');
    this.saveUserInput(newMessage);
    this.onSubmit(newMessage);

    newMessage.className = 'new-message';
    newMessage.innerHTML = this.renderForm(); 
    return newMessage;
  }

  renderForm() { 
    var messageDraft = new MessageStore().getMessageDraft();
    return this.content(messageDraft);
  }

  saveUserInput(newMessage) { 
    newMessage.addEventListener('change', (event) => {
      var element = event.target;
      var name = element.name;
      var value = element.value;

      new MessageStore().updateDraftFeild(name, value);
    });
  }

  content(messageDraft) { 
    var recipient = messageDraft.recipient ? messageDraft.recipient : '';
    var subject = messageDraft.subject ? messageDraft.subject : '';
    var body = messageDraft.body ? messageDraft.body : '';

   return  `<p class="new-message-header">New Message</p>
    <form class="compose-form"> 
      <input 
        placeholder='Recipient' 
        name='to'
        type='text'
        value=${recipient}>

      <input
        placeholder='Subject'
        name='subject'
        type='text'
        value=${subject}>

      <textArea name='body'rows=20>${body}</textArea>

      <button 
        type="submit"
        class="btn btn-primary submit-message">Send</button>
  
    </form>`
  }

  onSubmit(newMessage){ 
    newMessage.addEventListener('submit', (event) => {
      event.preventDefault();
      new MessageStore().sendDraft(newMessage);
      window.location.hash = '#inbox';
    });
  }
}

module.exports = Compose;