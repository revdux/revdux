import { Icon } from "@iconify/react";
const ipcRenderer = window.require("electron").ipcRenderer;

export default function Titlebar() {
  const minimizeHandler = () => {
    ipcRenderer.invoke("minimize");
  };

  const maximizeHandler = () => {
    ipcRenderer.invoke("maximize");
  };

  const closeHandler = () => {
    ipcRenderer.invoke("close");
  };

  return (
    <>
      <div className="flex justify-end">
        <div className="draggable"></div>
        <button
          className="flex items-center justify-center p-2 hover:bg-neutral-700 hover:bg-opacity-60"
          onClick={minimizeHandler}
        >
          <Icon icon="ic:baseline-minus" color="white" />
        </button>
        <button
          className="flex h-full items-center justify-center p-2 hover:bg-neutral-700 hover:bg-opacity-60"
          onClick={maximizeHandler}
        >
          <Icon icon="ic:round-crop-square" color="white" width="16" />
        </button>
        <button
          className="flex h-full items-center justify-center p-2 hover:bg-red-600"
          onClick={closeHandler}
        >
          <Icon icon="material-symbols:close" color="white" />
        </button>
      </div>
    </>
  );
}
