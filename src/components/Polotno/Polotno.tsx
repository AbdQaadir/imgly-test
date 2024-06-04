/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from "polotno";
import { Toolbar } from "polotno/toolbar/toolbar";
import { ZoomButtons } from "polotno/toolbar/zoom-buttons";
import {
  ElementsSection,
  PhotosSection,
  SidePanel,
  TemplatesSection,
  UploadSection,
} from "polotno/side-panel";
import { Workspace } from "polotno/canvas/workspace";
import { StoreType } from "polotno/model/store";

// import existing section
import { TextSection } from "polotno/side-panel";
import CustomSection from "./components/CustomSection";
import ActionControls from "./components/ActionControls";

const sections: any = [
  CustomSection,
  TextSection,
  PhotosSection,
  ElementsSection,
  UploadSection,
  TemplatesSection,
];

type PropsType = {
  store: StoreType;
};

function Polotno({ store }: PropsType) {
  return (
    <PolotnoContainer style={{ width: "100%", height: "100%" }}>
      <SidePanelWrap style={{ height: "100%" }}>
        <SidePanel store={store} sections={sections} defaultSection="custom" />
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
