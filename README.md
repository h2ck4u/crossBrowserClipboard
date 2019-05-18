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
    const text = ''; // 클립보드에 넣을 데이터.
    cb.copy(e, text);
});

elTextArea.addEventListener('paste', function (e) {
    e.preventDefault();
    const text = cb.paste();
});
        
~~~

### API

