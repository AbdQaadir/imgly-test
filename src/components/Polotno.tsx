/* eslint-disable @typescript-eslint/no-explicit-any */
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from "polotno";
import { Toolbar } from "polotno/toolbar/toolbar";
import { ZoomButtons } from "polotno/toolbar/zoom-buttons";
import { SidePanel } from "polotno/side-panel";
import { Workspace } from "polotno/canvas/workspace";
import { StoreType } from "polotno/model/store";
import { DownloadButton } from "polotno/toolbar/download-button";
import { Button } from "@blueprintjs/core";

type PropsType = {
  store: StoreType;
};

const ActionControls = ({ store }: PropsType) => {
  const handleSaveTemplate = async () => {
    const json = store.toJSON();

    console.log({ json });

    const blob = new Blob([JSON.stringify(json)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a: any = document.createElement("a");
    a.href = url;
    a.download = "template.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveTemplateThumbnail = async () => {
    store
      .saveAsImage()
      .then((response) => {
        console.log({ response });
      })
      .catch((error) => {
        console.log({ error });
      });
  };
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      <DownloadButton store={store} />
      <Button intent="primary" onClick={() => handleSaveTemplate()}>
        Save JSON
      </Button>

      <Button intent="primary" onClick={() => handleSaveTemplateThumbnail()}>
        Save thumbnail
      </Button>
    </div>
  );
};

function Polotno({ store }: PropsType) {
  return (
    <PolotnoContainer style={{ width: "100%", height: "100%" }}>
      <SidePanelWrap style={{ height: "100%" }}>
        <SidePanel store={store} />
      </SidePanelWrap>
      <WorkspaceWrap style={{ height: "100%" }}>
        <Toolbar store={store} components={{ ActionControls }} />
        <Workspace store={store} />
        <ZoomButtons store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
}

export default Polotno;
