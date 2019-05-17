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
const cb = new ClipboardJS(elTextArea);
elTextArea.addEventListener('copy', function (e) {
    e.preventDefault();
    cb.copy(e, 'testData');
});

elTextArea.addEventListener('paste', function (e) {
    e.preventDefault();
    cb.paste();
});
        
~~~

### API

