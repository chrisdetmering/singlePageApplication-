let messages = {
  sent: [
    {
      to: "friend@mail.com",
      subject: "Check this out",
      body: "It's so cool"
    },
    { to: "person@mail.com", subject: "zzz", body: "so booring" }
  ],
  inbox: [
    {
      from: "grandma@mail.com",
      subject: "Fwd: Fwd: Fwd: Check this out",
      body:
        "Stay at home mom discovers cure for leg cramps. Doctors hate her"
    },
    {
      from: "person@mail.com",
      subject: "Questionnaire",
      body: "Take this free quiz win $1000 dollars"
    }
  ]
};


function Message(from, to, subject, body) { 
  this.from = from, 
  this.to = to, 
  this.subject = subject, 
  this.body = body 
}

var messageDraft = new Message();

class MessageStore { 
  constructor() { 
  }

  getInboxMessages() { 
    return messages.inbox;
  }

  getSentMessages() { 
    return messages.sent;
  }

  getMessageDraft() { 
    return messageDraft;
  }

  updateDraftFeild(feild, value) { 
    messageDraft[feild] = value;
  }

  sendDraft() { 
    messages.sent.push(messageDraft);
    messageDraft = new Message();
  }

}

module.exports = MessageStore;