const j = (function () {
  // private vars
  let debug = false;
  let hooks = {};

  // private methods
  const _callHook = (method, args, context) => {
    method.apply(context, args);
  };
  const _isDef = (arg) => {
    return typeof arg !== 'undefined';
  }

  // public methods
  return {
    set: (e, name, method, args = []) => {
      if (debug) {
        console.log('SET: ' + ( name ? name : 'all') + ' for ' + e);
      }

      // See if you can switch to Object.assign
      hooks[e] = hooks[e] || {};
      hooks[e][name] = hooks[e][name] || [];

      hooks[e][name] = {
        'method' : method,
        'args' : Array.isArray(args) ? args : [args] // this needs to be an array
      };
    },
    remove: (e, name) => {
      if (debug) {
        let string = name ? 'REMOVE: ' + e + '[' + name + ']' : 'remove all for ' + e;
        console.log(string);
      }

      if (_isDef(hooks[e])) {
        if (_isDef(hooks[e][name])) {
          delete hooks[e][name];
        }
        else {
          delete hooks[e];
        }
      }
    },
    fire: (e, context = self) => {
      if (debug) console.log('FIRE: ' + e);

      if (_isDef(hooks[e])) {
        for (let key in hooks[e]) {
          let hook = hooks[e][key];
          _callHook(hook.method, hook.args, context);
        }
      }
    },
    list: (e, name) => {
      if (debug) {
        if (e && _isDef(hooks[e])) {
          if (name && _isDef(hooks[e][name])) {
            console.log("LIST: ", hooks[e][name]);
          }
          else {
            console.log("LIST: hooks["+e+"]:", hooks[e]);
          }
        }
        else {
          console.log("LIST: hooks: ", hooks);
        }
      }
    },
    debug: () => {
      debug = true;
    }
  };
}());

//joevent.set('the_event', 'hook_name', f(), args);