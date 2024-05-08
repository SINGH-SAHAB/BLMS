import React from 'react';

const PDFPage: React.FC = () => {
  return (
    <div>
      <h1>PDF Viewer</h1>
      <embed src="/path/to/your/pdf/document.pdf" type="application/pdf" width="100%" height="600px" />
    </div>
  );
};

export default PDFPage;
