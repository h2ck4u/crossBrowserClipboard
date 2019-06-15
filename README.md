### What is CrossBrowserClipboard?

If you use editor that is not contentEditable Element like textArea. You can get Data from Clipboard or set Data to Clipboard By CrossBrowserClipboard.

### Copy to clipboard for the Web

### Paste to web for the clipboard

### install
~~~
npm install ***
~~~

### usage

~~~html
<script src='./dist/clipboard.js'></script>
~~~
~~~javascript
const elTextArea = document.getElementById('textArea');
new ClipboardJS(elTextArea);
~~~

### API

#### getCopiedData
~~~javascript
  const myClipboard = new ClipboardJS(elTextArea);
  myClipboard.getCopiedData(); // return Object {text: String, html: HTMLElement}
~~~
#### getPastedData
~~~javascript
  const myClipboard = new ClipboardJS(elTextArea);
  myClipboard.getPastedData(); // return Object {text: String, html: HTMLElement}
~~~
