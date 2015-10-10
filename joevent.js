var j = (function () {
  // private vars
  let debug = false;
  let hooks = {};

  // private methods
  var _callHook = (method, args, context) => {
    args.push(context);  // should this be here or in fire() ?
    method.apply(window, args);
  };

  // public methods
  return {
    set: (e, name, method, args) => {
      if (debug) {
        console.log('set: ' +( name ? name : 'all') + ' for ' + e);
      }

      hooks[e] = hooks[e] || {};
      hooks[e][name] = hooks[e][name] || [];

      hooks[e][name] = {
        'method' : method,
        'args' : (typeof args === Array) ? args : [args] // this needs to be an array
      };
    },
    remove: (e, name) => {
      if (debug) {
        var string = name ? 'REMOVE: ' + e + '[' + name + ']' : 'remove all for ' + e;
        console.log(string);
      }

      if (typeof name === 'undefined') {
        delete hooks[e];
      }
      else if (typeof hooks[e][name] !== 'undefined') {
        delete hooks[e][name];
      }
    },
    fire: (e, context) => {
      if (debug) console.log('FIRE: ' + e);

      var context = context || self;

      if (typeof hooks[e] !== 'undefined') {
        for (var key in hooks[e]) {
          var hook = hooks[e][key];
          _callHook(hook.method, hook.args, context);
        }
      }
    },
    list: (e, name) => {
      if (debug) {
        if (e && name) {
          if (typeof hooks[e][name] !== 'undefined') console.log("LIST: ", hooks[e][name]);
        }
        else if (e) {
          if (typeof hooks[e] !== 'undefined') {
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