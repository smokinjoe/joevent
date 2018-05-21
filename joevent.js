const j = (function () {
  let debug = false;
  let hooks = {};

  const _callHook = (method, args, context) => {
    method.apply(context, args);
  };
  const _isDef = (arg) => {
    return typeof arg !== 'undefined';
  }

  return {
    on: (e, name, method, args = []) => {
      if (debug) {
        console.log('SETTING: ' + ( name ? name : 'all') + ' for ' + e);
      }

      hooks[e] = hooks[e] || {};
      hooks[e][name] = hooks[e][name] || [];

      hooks[e][name] = {
        'method' : method,
        'args' : Array.isArray(args) ? args : [args]
      };
    },
    off: (e, name) => {
      if (debug) {
        let string = name ? 'REMOVE: ' + e + '[' + name + ']' : 'REMOVE: all for ' + e;
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
    emit: (e, context = self) => {
      if (debug) console.log('EMIT: ' + e);

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