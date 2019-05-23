class Clipboard {
    browser: {
        isChrome: boolean,
        isMSEdge: boolean,
        isIE11: boolean,
    };
    elClipboard: any;
    targetElement: HTMLElement;
    constructor(targetElement: HTMLElement) {
        this.targetElement = targetElement;
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
        this.__bindEvent__();
    }

    copy(e: any) {
        console.log('copy event is called!');
        const text = window.getSelection().toString();
        if (this.browser.isChrome) { // clipboardData에 접근 가능 할 때.
            e.clipboardData.setData('text/plain', text);
            e.clipboardData.setData('text/html', text);
            this.elClipboard.innerText = text;
            console.log(this.elClipboard.innerText);
        }
    }

    paste(e: any) {
        console.log('paste event is called!');
        let text = '';
        if (this.browser.isChrome) { // clipboardData에 접근 가능 할 때.
            this.elClipboard.innerText = e.clipboardData.getData('text'); // 임시코드
            text = e.clipboardData.getData('text');
        }
        return text;
    }

    pasteForIE() {
        console.log('pasteForIE event is called!');
        this.elClipboard.innerText = '';
        this.elClipboard.focus();
    }

    copyForIE() {
        console.log('copyForIE event is called!');
        const text = window.getSelection().toString();
        this.elClipboard.innerText = text;
        this.__selectElementContents__(this.elClipboard);
        this.elClipboard.focus();
    }

    __bindEvent__() {
        if (this.browser.isChrome) {
            this.targetElement.addEventListener('copy', this.copy.bind(this));
            this.targetElement.addEventListener('paste', this.paste.bind(this));
        } else if (this.browser.isIE11 || this.browser.isMSEdge) {
            this.targetElement.addEventListener('beforecopy', this.copyForIE.bind(this));
            this.targetElement.addEventListener('beforepaste', this.pasteForIE.bind(this));
        }
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