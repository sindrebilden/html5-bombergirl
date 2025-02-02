class InputEngine {
    /**
     * A dictionary mapping ASCII key codes to string values describing
     * the action we want to take when that key is pressed.
     */
    bindings = {};

    /**
     * A dictionary mapping actions that might be taken in our game
     * to a boolean value indicating whether that action is currently being performed.
     */
    actions = {};

    listeners = [];

    constructor() {
    }

    setup() {
        this.bind(38, 'up2');
        this.bind(37, 'left2');
        this.bind(40, 'down2');
        this.bind(39, 'right2');
        this.bind(16, 'bomb2');

        this.bind(87, 'up');
        this.bind(65, 'left');
        this.bind(83, 'down');
        this.bind(68, 'right');
        this.bind(32, 'bomb');
        this.bind(18, 'bomb');

        this.bind(13, 'restart');
        this.bind(27, 'escape');
        this.bind(77, 'mute');

        document.addEventListener('keydown', this.onKeyDown);
        document.addEventListener('keyup', this.onKeyUp);
    }

    onKeyDown(event) {
        var action = gInputEngine.bindings[event.keyCode];
        if (action) {
            gInputEngine.actions[action] = true;
            event.preventDefault();
        }
        return false;
    }

    onKeyUp(event) {
        var action = gInputEngine.bindings[event.keyCode];
        if (action) {
            gInputEngine.actions[action] = false;

            var listeners = gInputEngine.listeners[action];
            if (listeners) {
                for (var i = 0; i < listeners.length; i++) {
                    var listener = listeners[i];
                    listener();
                }
            }
            event.preventDefault();
        }
        return false;
    }

    /**
     * The bind function takes an ASCII keycode and a string representing
     * the action to take when that key is pressed.
     */
    bind(key, action) {
        this.bindings[key] = action;
    }

    addListener(action, listener) {
        this.listeners[action] = this.listeners[action] || new Array();
        this.listeners[action].push(listener);
    }

    removeAllListeners() {
        this.listeners = [];
    }
}

gInputEngine = new InputEngine();
