const PDFDocument = require('pdfkit');
module.exports = function createSanPdf({ name, san, bankName }) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({size:'A4', margin:50});
      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.fontSize(22).text('Okrika Grammar School (OGS)', { align: 'center' });
      doc.moveDown(0.5);
      doc.fontSize(14).text('Perseverantia Vincit', { align: 'center' });
      doc.moveDown(1.5);
      doc.fontSize(16).text('Student Account Number (SAN) Slip', { underline: true });
      doc.moveDown();
      doc.fontSize(12).text(`Student Name: ${name}`);
      doc.moveDown(0.5);
      doc.fontSize(12).text(`SAN (Account No): ${san}`);
      doc.moveDown(0.5);
      doc.fontSize(12).text(`Bank: ${bankName}`);
      doc.moveDown(1);
      doc.fontSize(12).text('Congratulations! This SAN will serve as your unique code until graduation. Keep this slip safe.');
      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};
