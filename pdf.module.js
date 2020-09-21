var fs = require('fs');
var pdf = require('html-pdf');
var options = { 
    border: '1in',
    format: 'A4'
};

const generatePdf = () => {
    var html = fs.readFileSync('./conver/TestCorreo2.html', 'utf8');
    
    pdf.create(html, options).toFile('./conver/TestCorreo2.pdf', function(err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
    });
};

module.exports = {
    generatePdf
};