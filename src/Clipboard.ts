class Clipboard {
    browser: {
        isChrome: boolean,
        isMSEdge: boolean,
        isIE11: boolean,
    };
    elClipboard: any;
    targetElement: any;
    constructor() {
        this.browser = {
            isChrome: false,
            isMSEdge: false,
            isIE11: false,
        };
        this.init();
        this.copy = this.copy.bind(this);
    }

    init() {
        this.__checkBrowser__();
        this.__createClipboardElement__();
        this.__addEventListener__();
    }

    copy(e: any) {
        console.log('copy event is called!');
        const text = window.getSelection().toString();
        if (this.browser.isChrome) { // clipboardData에 접근 가능 할 때.
            e.clipboardData.setData('text/plain', text);
            e.clipboardData.setData('text/html', text);
            this.elClipboard.innerText = text;
            console.log(this.elClipboard.innerText);
        } else {
            this.elClipboard.innerText = '';
            this.elClipboard.innerText = text;
            this.__selectElementContents__(this.elClipboard);
            this.elClipboard.focus();
        }
    }

    paste(e: any) {
        console.log('paste event is called!');
        this.elClipboard.innerText = e.clipboardData.getData('text');
        return e.clipboardData.getData('text');
    }

    __addEventListener__() {
        this.elClipboard.addEventListener('copy', this.copy);

        this.elClipboard.addEventListener('paste', this.paste);
    }

    /**
     * create clipboard element that is contentEditable Element.
     */
    __createClipboardElement__() {
        const elClipboard = document.createElement('div');
        elClipboard.contentEditable = 'true';
        document.body.append(elClipboard);

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

    __selectElementContents__(el: HTMLElement) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        if (sel) {
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
}

export default Clipboard;