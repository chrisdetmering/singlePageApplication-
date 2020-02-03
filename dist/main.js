/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/compose.js":
/*!************************!*\
  !*** ./src/compose.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MessageStore = __webpack_require__(/*! ./message_store */ \"./src/message_store.js\")\n\nclass Compose { \n  constructor() { \n\n  }\n  \n  render() { \n    var newMessage = document.createElement('div');\n    this.saveUserInput(newMessage);\n    this.onSubmit(newMessage);\n\n    newMessage.className = 'new-message';\n    newMessage.innerHTML = this.renderForm(); \n    return newMessage;\n  }\n\n  renderForm() { \n    var messageDraft = new MessageStore().getMessageDraft();\n    return this.content(messageDraft);\n  }\n\n  saveUserInput(newMessage) { \n    newMessage.addEventListener('change', (event) => {\n      var element = event.target;\n      var name = element.name;\n      var value = element.value;\n\n      new MessageStore().updateDraftFeild(name, value);\n    });\n  }\n\n  content(messageDraft) { \n    var recipient = messageDraft.recipient ? messageDraft.recipient : '';\n    var subject = messageDraft.subject ? messageDraft.subject : '';\n    var body = messageDraft.body ? messageDraft.body : '';\n\n   return  `<p class=\"new-message-header\">New Message</p>\n    <form class=\"compose-form\"> \n      <input \n        placeholder='Recipient' \n        name='to'\n        type='text'\n        value=${recipient}>\n\n      <input\n        placeholder='Subject'\n        name='subject'\n        type='text'\n        value=${subject}>\n\n      <textArea name='body'rows=20>${body}</textArea>\n\n      <button \n        type=\"submit\"\n        class=\"btn btn-primary submit-message\">Send</button>\n  \n    </form>`\n  }\n\n  onSubmit(newMessage){ \n    newMessage.addEventListener('submit', (event) => {\n      event.preventDefault();\n      new MessageStore().sendDraft(newMessage);\n      window.location.hash = '#inbox';\n    });\n  }\n}\n\nmodule.exports = Compose;\n\n//# sourceURL=webpack:///./src/compose.js?");

/***/ }),

/***/ "./src/inbox.js":
/*!**********************!*\
  !*** ./src/inbox.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MessageStore = __webpack_require__(/*! ./message_store */ \"./src/message_store.js\");\n\n\n\nclass Inbox { \n  constructor() { \n\n  }\n\n  render() { \n    var container = document.createElement('ul');\n    container.className = 'messages';\n    var receivedMsg = new MessageStore().getInboxMessages();\n\n    receivedMsg.forEach(message => {\n      var nodeMsg = this.renderMessage(message);\n      container.appendChild(nodeMsg);\n    });\n\n    return container; \n  }\n\n\n  renderMessage(message) { \n    var li = document.createElement('li');\n    li.className = 'message';\n    li.innerHTML = \n    `<span class=\"from\"> ${message.from} </span> \n    <span class=\"subject\"> ${message.subject} </span>\n    <span class=\"body\"> ${message.body} </span>`\n\n    return li; \n  }\n\n}\n\nmodule.exports = Inbox;\n\n//# sourceURL=webpack:///./src/inbox.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Router = __webpack_require__(/*! ./router */ \"./src/router.js\");\nconst Inbox = __webpack_require__(/*! ./inbox */ \"./src/inbox.js\");\nconst Sent = __webpack_require__(/*! ./sent */ \"./src/sent.js\");\nconst Compose = __webpack_require__(/*! ./compose */ \"./src/compose.js\");\n\nconst routes = { \n  inbox: new Inbox(), \n  compose: new Compose(),\n  sent: new Sent()\n}\n\nwindow.addEventListener('DOMContentLoaded', (event) => {\n  var ele = document.querySelectorAll('.sidebar-nav > li'); \n  var contentNode = document.querySelector('.content');\n\n  var router = new Router(contentNode, routes);\n  router.start();\n  window.location.hash = '#inbox'\n\n  ele.forEach(sideBarEle => { \n    var newLocation = sideBarEle.innerText.toLowerCase();\n    sideBarEle.addEventListener('click', (event) => { \n      window.location.hash = newLocation;\n    }); \n  });\n\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/message_store.js":
/*!******************************!*\
  !*** ./src/message_store.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let messages = {\n  sent: [\n    {\n      to: \"friend@mail.com\",\n      subject: \"Check this out\",\n      body: \"It's so cool\"\n    },\n    { to: \"person@mail.com\", subject: \"zzz\", body: \"so booring\" }\n  ],\n  inbox: [\n    {\n      from: \"grandma@mail.com\",\n      subject: \"Fwd: Fwd: Fwd: Check this out\",\n      body:\n        \"Stay at home mom discovers cure for leg cramps. Doctors hate her\"\n    },\n    {\n      from: \"person@mail.com\",\n      subject: \"Questionnaire\",\n      body: \"Take this free quiz win $1000 dollars\"\n    }\n  ]\n};\n\n\nfunction Message(from, to, subject, body) { \n  this.from = from, \n  this.to = to, \n  this.subject = subject, \n  this.body = body \n}\n\nvar messageDraft = new Message();\n\nclass MessageStore { \n  constructor() { \n  }\n\n  getInboxMessages() { \n    return messages.inbox;\n  }\n\n  getSentMessages() { \n    return messages.sent;\n  }\n\n  getMessageDraft() { \n    return messageDraft;\n  }\n\n  updateDraftFeild(feild, value) { \n    messageDraft[feild] = value;\n  }\n\n  sendDraft() { \n    messages.sent.push(messageDraft);\n    messageDraft = new Message();\n  }\n\n}\n\nmodule.exports = MessageStore;\n\n//# sourceURL=webpack:///./src/message_store.js?");

/***/ }),

/***/ "./src/router.js":
/*!***********************!*\
  !*** ./src/router.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Router { \n  constructor(node, routes) { \n    this.node = node; \n    this.routes = routes;\n  }\n\n  start() { \n    window.addEventListener('hashchange', () => { \n      this.render();\n    });\n  }\n\n  activeRoute() { \n    var currentRoute = window.location.hash.slice(1);\n    for (var route in this.routes) { \n      if  (currentRoute === route) { \n        var component = this.routes[route];\n        return component; \n      }\n    }\n  }\n\n  render() { \n    var component = this.activeRoute()\n\n    if (component === undefined) { \n      this.node.innerHTML = \"\";\n    } else { \n      this.node.innerHTML = \"\";\n      this.node.appendChild(component.render());\n    }\n\n  }\n}\n\n\nmodule.exports = Router;\n\n//# sourceURL=webpack:///./src/router.js?");

/***/ }),

/***/ "./src/sent.js":
/*!*********************!*\
  !*** ./src/sent.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MessageStore = __webpack_require__(/*! ./message_store */ \"./src/message_store.js\");\n\n\nclass Sent { \n  constructor() {}\n\n\n  render() { \n    var container = document.createElement('ul');\n    container.className = 'messages';\n    var sentMessages = new MessageStore().getSentMessages()\n\n    sentMessages.forEach(msg =>{ \n      var sentNode = this.renderMessage(msg)\n      container.appendChild(sentNode);\n    });\n\n    return container; \n  }\n\n  renderMessage(message) { \n    var li = document.createElement('li');\n    li.className = 'message';\n    li.innerHTML = `<span class=\"to\"> ${message.to} </span>\n    <span class=\"subject\"> ${message.subject} </span>\n    <span class=\"body\"> ${message.body} </span>`\n\n    return li; \n  }\n}\n\n\nmodule.exports = Sent; \n\n//# sourceURL=webpack:///./src/sent.js?");

/***/ })

/******/ });