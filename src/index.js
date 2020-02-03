const Router = require('./router');
const Inbox = require('./inbox');
const Sent = require('./sent');
const Compose = require('./compose');

const routes = { 
  inbox: new Inbox(), 
  compose: new Compose(),
  sent: new Sent()
}

window.addEventListener('DOMContentLoaded', (event) => {
  var ele = document.querySelectorAll('.sidebar-nav > li'); 
  var contentNode = document.querySelector('.content');

  var router = new Router(contentNode, routes);
  router.start();
  window.location.hash = '#inbox'

  ele.forEach(sideBarEle => { 
    var newLocation = sideBarEle.innerText.toLowerCase();
    sideBarEle.addEventListener('click', (event) => { 
      window.location.hash = newLocation;
    }); 
  });

});