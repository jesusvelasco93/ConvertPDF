// const fs = require('fs');
const pdf = require('html-pdf');
const express = require('express');
const router = express.Router();
const options = { 
  border: '1in',
  format: 'A4'
};

/* GET home page. */
router.post('/', async function(req, res, next) {
  const responseBody = {
    status: 200,
    error: false,
    errorMsg: "",
    pdfStream: ""
  };
  const htmlBuffer = req.body ? req.body.fileContent : null;

  if (htmlBuffer) {
    const buffer = Buffer.from(htmlBuffer, 'base64');
    // console.log("Buffer", buffer);
    const html = buffer.toString('utf8');
    // console.log("HTML", html);

    // await pdf.create(html, options).toFile("test.pdf", (err, bufferPDF) => {
    await pdf.create(html, options).toBuffer((err, bufferPDF) => {
        if (err) {
            responseBody.status = 500;
            responseBody.error = true;
            responseBody.errorMsg = "Ha ocurrido un error al generar el PDF."
            console.log('Error ', errorMsg);
        } else {
            responseBody.pdfFile = bufferPDF.toString('base64');
            console.log("OK");
        }
        // console.log('Respondiendo ', responseBody);
        return res.status(200).send(responseBody);
    });
  } else {
      responseBody.status = 400;
      responseBody.error = true;
      responseBody.errorMsg = "No se ha recibido ningún fichero.";
      console.log('No hay fichero ', responseBody);
      return res.status(200).send(responseBody);
  }
});

module.exports = router;
