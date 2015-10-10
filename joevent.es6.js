"use strict";

class J {
  static init () {
    if (!this.initted) {
      if (this.debug) console.log('Init():');
      this.hooks = {};
      this.initted = true;
    }
  }

  static on (e, name, method, args) {
    this.init();
    if (this.debug) console.log(Array.from(arguments.entries()));

    this.hooks[e] = this.hooks[e] || {};
    this.hooks[name] = this.hooks[name] || [];

    this.hooks[e][name] = {
      'method' : method,
      'args' : (typeof args === Array) ? args : [args] // this needs to be an array
    };
  };

  static remove (e, name) {
    this.init();
    if (this.debug) console.log(Array.from(arguments.entries()));

    if (typeof name === 'undefined' && (typeof this.hooks[e] !== 'undefined')) {
      delete this.hooks[e];
    }
    else if (typeof this.hooks[e][name] !== 'undefined') {
      delete this.hooks[e][name];
    }
  };

  static fire (e, context) {
    this.init();
    if (this.debug) console.log(Array.from(arguments.entries()));
    context = context || self;

    if (typeof this.hooks[e] !== 'undefined') {
      for (let key in this.hooks[e]) {
        let hook = this.hooks[e][key];
        //_callHook(hook.method, hook.args, context);
        hook.args.push(context);
        hook.method.apply(window, hook.args);
      }
    }
  };

  static debug () {
    this.debug = true;
  }

};