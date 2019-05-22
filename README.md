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
    cb.copy(e);
});

elTextArea.addEventListener('paste', function (e) {
    e.preventDefault();
    const text = cb.paste();
});

elTextArea.addEventListener('beforecopy', function (e) {
    e.preventDefault();
    cb.copy(e);
});

elTextArea.addEventListener('beforepaste', function (e) {
    e.preventDefault();
    const text = cb.paste();
});
~~~

### API
copy

paste
