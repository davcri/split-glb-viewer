export function HelpText() {
  return (
    <>
      <p>
        This is a simple tool to compare two 3D models. <br />
        Drag and drop GLB files from your computer into the left and right panels.
        <br />
        Source:{" "}
        <a
          className="text-blue-900 hover:cursor-pointer pointer-events-auto"
          href="https://github.com/davcri/split-glb-viewer"
        >
          github.com/davcri/split-glb-viewer
        </a>
      </p>
      <br />

      <p>
        <ul>
          <li>
            <b>Left click</b>: rotate
          </li>
          <li>
            <b>Right click</b>: pan
          </li>
          <li>
            <b>Mouse Wheel</b>: zoom in/out
          </li>
        </ul>
      </p>
    </>
  );
}
