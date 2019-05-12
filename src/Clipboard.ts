class Clipbaord {
    browser: {};
    elClipboard: any;
    constructor() {
        this.browser = {};
        this.elClipboard;
        this.init();
    }

    init() {
        this.__checkBrowser__();
        this.__createClipboardElement__();
    }

    copy() {
        
    }

    paste() {

    }

    
    /**
     * create clipboard element that is contentEditable Element.
     */
    __createClipboardElement__() {
        const elClipboard = document.createElement('div');
        elClipboard.contentEditable = 'true';

        this.elClipboard = elClipboard;
    }

    /**
     * check current browser and set browser.
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