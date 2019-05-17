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
const cb = new ClipboardJS.default(elTextArea);
elTextArea.addEventListener('copy', function (e) {
    e.preventDefault();
    cb.copy(e, 'testData');
});
        
~~~

### API

