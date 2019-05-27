class Clipboard {
    browser: {
        isChrome: boolean,
        isMSEdge: boolean,
        isIE11: boolean,
    };
    elClipboard: any;
    targetElement: any;
    constructor(targetElement: any) {
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
        e.clipboardData.setData('text/plain', text);
        e.clipboardData.setData('text/html', text);
        this.elClipboard.innerText = text;
        console.log(this.elClipboard.innerText);

    }

    /**
     * get Data from clipboardData from event.
     * @param {ClipboardEvent} e
     * @returns {String} text
     */
    paste(e: ClipboardEvent) {
        console.log('paste event is called!');
        this.elClipboard.innerText = e.clipboardData.getData('text'); // 임시코드
        let text = e.clipboardData.getData('text');
        return text;
    }

    copyForIE() {
        console.log('copyForIE event is called!');
        const isContentEditable = this.targetElement.contentEditable;
        const isTextArea = this.targetElement.tagName === 'TEXTAREA';
        let text;
        if (isTextArea) {
            console.log('textArea!');
            const selectionStart = this.targetElement.selectionStart;
            const selectionEnd = this.targetElement.selectionEnd;
            text = this.targetElement.value.slice(selectionStart, selectionEnd)
        } else if (isContentEditable) {
            console.log('contentEditable!');
            text = window.getSelection().toString();
        }
        this.elClipboard.innerText = text;
        this.__selectElementContents__(this.elClipboard);
        this.elClipboard.focus();
    }

    /**
     * get Data from clipboardData.
     * beforepaste event trigger to paste event. 
     * @returns {String} text
     */
    pasteForIE() {
        console.log('pasteForIE event is called!');
        this.elClipboard.innerText = '';
        this.elClipboard.focus();
        return this.elClipboard.innerText;
    }

    /**
     * bind 'copy', 'paste', 'beforecopy', 'beforepaste' event To Target.
     */
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
        elClipboard.id = 'clipboard';
        elClipboard.style.cssText = "width: 200px; height: 100px; border: solid 1px orange";
        document.body.appendChild(elClipboard);

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

    /**
     * select Element target Element.
     */
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