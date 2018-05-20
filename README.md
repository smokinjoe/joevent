# joevent
Pretty simple event API

Use case: when the context that the event handler is to be executed within needs to change.

Documentation (can be found in index.html):

    // Uncomment below to view all sets/emits/removes and be
    // able to utilize j.list() to view any and all hooks set
    // j.debug();

    // =====================================================
    // Setting an event hook with a function and arguments
    const arg1 = 'Hello';
    const arg2 = 'World';

    function welcomer (string1, string2) {
      console.log(string1 + ' ' + string2);
    };

    j.on('welcome', 'welcome the user', welcomer, [arg1, arg2]);
    j.emit('welcome'); // Output: Hello World
    // =====================================================


    // =====================================================
    // Showing off how the context can be changed when triggering the hook event
    window.name = 'window';
    const obj1 = { name: 'joe' };
    const obj2 = { name: 'ed' };

    function outputName () {
      console.log(this.name);
    }

    j.on('name', 'changing context', outputName);
    j.emit('name', obj1); // Output: joe
    j.emit('name'); // Output: window
    j.emit('name', obj2); // Output: ed
    // =====================================================

    // =====================================================
    // Setting a second hook with the same name will overwrite previous hook
    j.on('duplicate', 'overwriteMe', () => console.log('This will never appear'));
    j.on('duplicate', 'overwriteMe', () => console.log('This will appear'));
    j.emit('duplicate'); // Output: This will appear
    // =====================================================

    // =====================================================
    // You can also remove hooks if you'd like - by name or event
    j.on('test', 'removeMe', () => console.log('You wont see me'));
    j.on('test', 'sticksAround', () => console.log('Hello from sticksAround!'));
    j.off('test', 'removeMe');
    j.emit('test'); // Output: Hello from sticksAround!
    j.off('test');
    j.emit('test'); // Nothing will be output because all were removed
    // =====================================================
