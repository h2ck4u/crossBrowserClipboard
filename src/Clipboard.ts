class Clipboard {
    browser: {
        isChrome: boolean,
        isMSEdge: boolean,
        isIE11: boolean,
    };
    elClipboard: any;
    targetElement: any;
    constructor(element: any) {
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
    }

    copy(e: any, text: string) {
        console.log('copy event is called!', text);
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

    paste() {
        console.log('paste event is called!');
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