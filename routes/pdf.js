// const fs = require('fs');
const pdf = require('html-pdf');
const express = require('express');
const router = express.Router();

const options = { 
  // phantomPath: phantomjs.path,
  border: '0.39in',
  format: 'A4',
  // timeout: 0000
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

  try {
    if (htmlBuffer) {
      const buffer = Buffer.from(htmlBuffer, 'base64');
      const html = buffer.toString('utf8');
      const result = await waitGettingPDF(responseBody, html);
      return res.status(200).send(result);
    } else {
        responseBody.status = 400;
        responseBody.error = true;
        responseBody.errorMsg = "No se ha recibido ningún fichero.";
        console.log('No hay fichero ', responseBody);
        return res.status(200).send(responseBody);
    }
  } catch (ex) {
    responseBody.status = 500;
    responseBody.error = true;
    responseBody.errorMsg = "Ha ocurrido un error provocado por una excepción al generar el PDF." + ex;
    console.log.log('Error ', ex);
  }
});

function waitGettingPDF(responseBody, html) {
  return new Promise((resolve, reject) => {
      const pdfPromise = pdf.create(html, options);
      // pdf.create(html, options).toFile("./test.pdf", (err, data) => {
      // pdfPromise.toFile("D:/HOME/10111.html", (err, bufferPDF) => {
      pdfPromise.toBuffer((err, bufferPDF) => {
          console.log('END');
          if (err) {
              responseBody.status = 500;
              responseBody.error = true;
              responseBody.errorMsg = "Ha ocurrido un error al generar el PDF." + err;
              console.log('Error ', err);
          } else {
              // responseBody.pdfFile = "OK";
              responseBody.pdfFile = bufferPDF.toString('base64');
          }
          console.log('Respondiendo ', responseBody.status, responseBody.errorMsg);
          return resolve(responseBody);
      });
  });
}

module.exports = router;
