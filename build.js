var fs = require('fs');
var minify = require('html-minifier-terser').minify;
fs.readFile('./index_src.html', 'utf8', function (err, data) {
    if (err) {
        throw err;
    }
    fs.writeFile('./index.html', minify(data,{removeComments: true,collapseWhitespace: true,minifyJS:true, minifyCSS:true}),function(){
        console.log('success');
    });
});