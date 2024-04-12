import React, { FC } from "react";

type Props = {
  onSelectFormatting: (formatting: string) => void; // Function to handle formatting selection
};

const FormattingDetails: FC<Props> = ({ onSelectFormatting }) => {
  // Function to handle bulleted list
  const handleBulletedList = () => {
    onSelectFormatting("<ul><li></li></ul>");
  };

  // Function to handle numbered list
  const handleNumberedList = () => {
    onSelectFormatting("<ol><li></li></ol>");
  };

  // Function to handle checklist
  const handleChecklist = () => {
    onSelectFormatting("<ul><li><input type=\"checkbox\" /> </li></ul>");
  };

  // Function to handle table
  const handleTable = () => {
    onSelectFormatting("<table><tr><th></th><th></th></tr><tr><td></td><td></td></tr></table>");
  };

  // Function to handle separator
  const handleSeparator = () => {
    onSelectFormatting("<hr>");
  };

  // Function to handle quote
  const handleQuote = () => {
    onSelectFormatting("<blockquote></blockquote>");
  };

  // Function to handle code block
  const handleCode = () => {
    onSelectFormatting("<pre><code></code></pre>");
  };

  // Function to handle 2 columns
  const handle2Columns = () => {
    onSelectFormatting("<div style=\"display: grid; grid-template-columns: 1fr 1fr;\"></div>");
  };

  // Function to handle 3 columns
  const handle3Columns = () => {
    onSelectFormatting("<div style=\"display: grid; grid-template-columns: 1fr 1fr 1fr;\"></div>");
  };

  // Function to handle 4 columns
  const handle4Columns = () => {
    onSelectFormatting("<div style=\"display: grid; grid-template-columns: 1fr 1fr 1fr 1fr;\"></div>");
  };

  return (
    <div>
      {/* Buttons for formatting options */}
      <button onClick={handleBulletedList}>Bulleted List</button>
      <button onClick={handleNumberedList}>Numbered List</button>
      <button onClick={handleChecklist}>Checklist</button>
      <button onClick={handleTable}>Table</button>
      <button onClick={handleSeparator}>Separator</button>
      <button onClick={handleQuote}>Quote</button>
      <button onClick={handleCode}>Code</button>
      <button onClick={handle2Columns}>2 Columns</button>
      <button onClick={handle3Columns}>3 Columns</button>
      <button onClick={handle4Columns}>4 Columns</button>
    </div>
  );
};

export default FormattingDetails;
