class Clipbaord {
    browser: {};
    constructor() {
        this.browser = {};
        this.init();
    }

    init() {
        this.__checkBrowser__();
    }

    copy() {
        
    }

    paste() {

    }
    /**
     * checking current browser and set browser.
     */
    __checkBrowser__() {
        const userAgent = navigator.userAgent.toLowerCase();
        this.browser = {
            isMSEdge: userAgent.indexOf('edge') > -1,
            isIE11: userAgent.indexOf('trident/7') > -1,
            isChrome: userAgent.indexOf('chrome') > -1 && userAgent.indexOf('edge') < 0
        };
    }
}

export default Clipbaord;