export const handleDownloadCSV = (columns, data, fileName) => {
  const downloadableColumns = columns.filter((col) => col.isVisible);
  const headers = downloadableColumns.map((col) => `"${col.header}"`).join(",");
  const rows = data.map((row) =>
    downloadableColumns
      .map(
        (col) =>
          `"${(row[col.accessorKey] || "").toString().replace(/"/g, '""')}"`
      )
      .join(",")
  );

  const csvContent = [headers, ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
};

export const handleDownloadPDF = (columns, data, title) => {
  const downloadableColumns = columns.filter((col) => col.isVisible);
  const win = window.open("", "_blank");

  if (win) {
    const htmlContent = `
      <html>
        <head>
          <title>${title}</title>
        </head>
        <body>
          <h2>${title}</h2>
          <table border="1" style="border-collapse: collapse; width: 100%;">
            <thead>
              <tr>
                ${downloadableColumns
                  .map(
                    (col) =>
                      `<th style="padding: 8px; text-align: left;">${col.header}</th>`
                  )
                  .join("")}
              </tr>
            </thead>
            <tbody>
              ${data
                .map(
                  (row) =>
                    `<tr>${downloadableColumns
                      .map(
                        (col) =>
                          `<td style="padding: 8px;">${
                            row[col.accessorKey] || ""
                          }</td>`
                      )
                      .join("")}</tr>`
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;
    win.document.write(htmlContent);
    win.document.close();
    win.print();
  }
};
