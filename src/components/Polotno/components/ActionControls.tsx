/* eslint-disable @typescript-eslint/no-explicit-any */
import { StoreType } from "polotno/model/store";
import DownloadButton from "polotno/toolbar/download-button";
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
    store.saveAsImage({
      pageId: store.pages[0].id,
      fileName: `${store.pages[0]?.custom?.name || "Front"}.png`,
    });
    store.saveAsImage({
      pageId: store.pages[1].id,
      fileName: `${store.pages[1]?.custom?.name || "Back"}.png`,
    });
  };
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      <DownloadButton store={store} />
      <Button intent="primary" onClick={() => handleSaveTemplate()}>
        Save JSON
      </Button>

      <Button intent="primary" onClick={() => handleSaveTemplateThumbnail()}>
        Save thumbnails
      </Button>
    </div>
  );
};

export default ActionControls;
