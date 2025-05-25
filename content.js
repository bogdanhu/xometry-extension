(async () => {
  const toast = document.createElement("div");
  toast.innerText = "Se procesează datele din Xometry...";
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.left = "20px";
  toast.style.background = "#333";
  toast.style.color = "#fff";
  toast.style.padding = "10px 20px";
  toast.style.borderRadius = "5px";
  toast.style.zIndex = "9999";
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);

  // Simulare extragere date
  const dummyData = [["Part ID", "Material", "Dimensions"], ["572507", "Steel", "62.0x35.0x15.0"]];
  const textData = dummyData.map(row => row.join("\t")).join("\n");

  try {
    await navigator.clipboard.writeText(textData);
    console.log("Datele au fost copiate în clipboard");
  } catch (e) {
    console.error("Clipboard error", e);
  }

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(dummyData);
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  const blob = XLSX.write(wb, { bookType: "xlsx", type: "blob" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "xometry_export.xlsx";
  a.click();
})();