import { useAppStore } from "../../store/app.store";
import { showError } from "../../utils/showError";

export function loadItemList(items: DataTransferItemList, side: "left" | "right") {
  if (items.length > 1) {
    showError("Files drop is not implemented");
  }

  const item = items[0];
  if (item.kind === "file") {
    const itemFile = item.getAsFile();
    if (!itemFile) {
      return showError("File not found");
    }
    const droppedFile = URL.createObjectURL(itemFile);
    useAppStore.setState({
      [side === "left" ? "modelLeft" : "modelRight"]: droppedFile,
    });
  } else {
    showError("Only files are supported");
  }
}
