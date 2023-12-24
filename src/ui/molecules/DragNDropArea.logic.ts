import { useAppStore } from "../../store/app.store";
import { showError } from "../../utils/showError";

function handleFileDropped(fileUrl: string, side: "left" | "right") {
  useAppStore.setState({
    [side === "left" ? "modelLeft" : "modelRight"]: fileUrl,
  });
}
export function loadItemList(items: DataTransferItemList, side: "left" | "right") {
  if (items.length > 1) {
    showError("Files drop is not implemented");
  }

  const item = items[0];
  if (item.kind === "file") {
    const droppedFile = URL.createObjectURL(item.getAsFile()!);
    handleFileDropped(droppedFile, side);
  }
}
