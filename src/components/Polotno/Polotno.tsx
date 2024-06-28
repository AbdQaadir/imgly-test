/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from "polotno";
import { Toolbar } from "polotno/toolbar/toolbar";
import { ZoomButtons } from "polotno/toolbar/zoom-buttons";
import { DEFAULT_SECTIONS, SidePanel } from "polotno/side-panel";
import { Workspace } from "polotno/canvas/workspace";
import { StoreType } from "polotno/model/store";

// import existing section

import MergeImages from "./components/MergeImages";
import ActionControls from "./components/ActionControls";
import { PageControls } from "./components";

type PropsType = {
  store: StoreType;
  maxPages?: number;
  canDeletePage?: boolean;
  showDownloadButton?: boolean;
  showThumbnailButton?: boolean;
  showJsonButton?: boolean;

  onUpload?: (file: string | Blob | File) => Promise<string>;
};

function Polotno({
  store,
  maxPages,
  canDeletePage,
  showDownloadButton,
  showThumbnailButton,
  showJsonButton,
}: PropsType) {
  return (
    <PolotnoContainer
      className="polotno-container"
      style={{ width: "100%", height: "100%", fontFamily: "inherit" }}
    >
      <SidePanelWrap style={{ height: "100%" }}>
        <SidePanel
          store={store}
          sections={
            [...DEFAULT_SECTIONS, MergeImages] as typeof DEFAULT_SECTIONS
          }
        />
      </SidePanelWrap>
      <WorkspaceWrap style={{ height: "100%", fontFamily: "inherit" }}>
        <Toolbar
          store={store}
          components={{
            ActionControls: (props: any) => (
              <ActionControls
                {...props}
                store={store}
                showDownloadButton={showDownloadButton}
                showThumbnailButton={showThumbnailButton}
                showJsonButton={showJsonButton}
              />
            ),
          }}
        />
        <Workspace
          store={store}
          components={{
            PageControls: (props: any) => (
              <PageControls
                {...props}
                store={store}
                maxPages={maxPages}
                canDeletePage={canDeletePage}
              />
            ),
          }}
        />
        <ZoomButtons store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
}

export default Polotno;
