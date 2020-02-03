class Router { 
  constructor(node, routes) { 
    this.node = node; 
    this.routes = routes;
  }

  start() { 
    window.addEventListener('hashchange', () => { 
      this.render();
    });
  }

  activeRoute() { 
    var currentRoute = window.location.hash.slice(1);
    for (var route in this.routes) { 
      if  (currentRoute === route) { 
        var component = this.routes[route];
        return component; 
      }
    }
  }

  render() { 
    var component = this.activeRoute()

    if (component === undefined) { 
      this.node.innerHTML = "";
    } else { 
      this.node.innerHTML = "";
      this.node.appendChild(component.render());
    }

  }
}


module.exports = Router;