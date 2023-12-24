import { useEffect } from "react";
import { textLead } from "./DragNDropArea.style";
import { showError } from "../../utils/showError";
import { useAppStore } from "../../store/app.store";

type DragNDropAreaProps = {
  onLeftDropped: (ev: DataTransferItemList) => void;
  onRightDropped: (ev: DataTransferItemList) => void;
};

export function DragNDropArea({ onLeftDropped, onRightDropped }: DragNDropAreaProps) {
  const leftModelSet = useAppStore((s) => s.modelLeft) !== undefined;
  const rightModelSet = useAppStore((s) => s.modelRight) !== undefined;

  useEffect(() => {
    const onDragOver = (event: DragEvent) => {
      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "copy";
      }
    };

    const onDrop = (event: DragEvent) => {
      event.preventDefault();

      if (event.dataTransfer?.items) {
        const side = event.clientX < window.innerWidth / 2 ? "left" : "right";

        if (side === "left") onLeftDropped(event.dataTransfer.items);
        else onRightDropped(event.dataTransfer.items);
      } else {
        showError("DataTransfer.items is not supported"); // https://developer.mozilla.org/en-US/docs/Web/API/DragEvent/dataTransfer#browser_compatibility
      }
    };

    document.addEventListener("dragover", onDragOver);
    document.addEventListener("drop", onDrop);

    return () => {
      document.removeEventListener("dragover", onDragOver);
      document.removeEventListener("drop", onDrop);
    };
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-1/2 h-screen  flex justify-center items-center">
        {!leftModelSet && <h1 className={textLead}>Drag n Drop</h1>}
      </div>
      <div className="fixed top-0 left-1/2 w-1/2 h-screen  flex justify-center items-center">
        {!rightModelSet && <h1 className={textLead}> Drag n Drop</h1>}
      </div>
    </>
  );
}
