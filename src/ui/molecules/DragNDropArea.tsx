import { useEffect } from "react";
import { textLead } from "./DragNDropArea.style";
import { showError } from "../../utils/showError";
import { loadItemList } from "./DragNDropArea.logic";
import { useAppStore } from "../../store/app.store";

type DragNDropAreaProps = {
  onLeftDropped: (ev: DragEvent) => void;
  onRightDropped: (ev: DragEvent) => void;
};

export function DragNDropArea({ onLeftDropped, onRightDropped }: DragNDropAreaProps) {
  const leftModelSet = useAppStore((s) => s.modelLeft) !== undefined;
  console.log("🚀 ~ leftModelSet:", leftModelSet);
  const rightModelSet = useAppStore((s) => s.modelRight) !== undefined;
  console.log("🚀 ~ rightModelSet:", rightModelSet);

  useEffect(() => {
    const onDragOver = (event: DragEvent) => {
      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "copy";
      }
    };

    const onDrop = (event: DragEvent) => {
      event.preventDefault();
      // if (event.dataTransfer.types[0] === "text/plain") return; // Outliner drop
      if (event.dataTransfer?.items) {
        const side = event.clientX < window.innerWidth / 2 ? "left" : "right";
        loadItemList(event.dataTransfer.items, side);
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
