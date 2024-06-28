/* eslint-disable @typescript-eslint/no-explicit-any */
import { observer } from "mobx-react-lite";
// import default tab component
import { SectionTab } from "polotno/side-panel";

import { Newspaper } from "phosphor-react";
import { StoreType } from "polotno/model/store";

type SectionTabProps = {
  onClick: any;
  active: boolean;
};

const QRCodeSection = ({ store }: { store: StoreType }) => {
  return (
    <div
      style={{
        width: "150px",
        height: "150px",
        overflow: "hidden",
      }}
      role="button"
      tabIndex={0}
      aria-hidden="true"
      onClick={() => {
        // Check if there exists a qr-code element
        // const qrCodeElement = store.activePage.children.find(
        //   (element: any) => element.custom?.variable === "qr-code"
        // );

        // if (qrCodeElement) {
        //   alert(
        //     `You can only have one QR code element on the page. Page number: ${1}`
        //   );
        //   return;
        // }

        store.activePage.addElement({
          type: "image",
          src: "https://res.cloudinary.com/dt4bove91/image/upload/v1719589626/qrCode_NotRounded_mo1d9j.png",
          x: 100,
          y: 100,
          custom: {
            variable: "qr-code",
          },
          width: 150,
          height: 150,
          // can element be moved and rotated
          draggable: true,
          // can we change content of element?
          contentEditable: false,
          // can we change style of element?
          styleEditable: false,
          // can we resize element?
          resizable: true,
        });
      }}
    >
      <img
        src="https://res.cloudinary.com/dt4bove91/image/upload/v1719589626/qrCode_NotRounded_mo1d9j.png"
        alt=""
        width="100%"
        height="100%"
      />
    </div>
  );
};

const VideoThumbnailSection = ({ store }: { store: StoreType }) => {
  return (
    <div
      style={{
        width: "150px",
        height: "150px",
        overflow: "hidden",
      }}
      role="button"
      tabIndex={0}
      aria-hidden="true"
      onClick={() => {
        store.activePage.addElement({
          type: "image",
          src: "https://res.cloudinary.com/dt4bove91/image/upload/v1719589627/videoThumbnail_NotRounded_yh5cd7.png",
          x: 100,
          y: 100,
          custom: {
            variable: "video-thumbnail",
          },
          width: 150,
          height: 150,
          // can element be moved and rotated
          draggable: true,
          // can we change content of element?
          contentEditable: false,
          // can we change style of element?
          styleEditable: false,
          // can we resize element?
          resizable: true,
        });
      }}
    >
      <img
        src="https://res.cloudinary.com/dt4bove91/image/upload/v1719589627/videoThumbnail_NotRounded_yh5cd7.png"
        alt=""
        width="100%"
        height="100%"
      />
    </div>
  );
};

const WorkspaceLogoSection = ({ store }: { store: StoreType }) => {
  return (
    <div
      style={{
        width: "150px",
        height: "150px",
        overflow: "hidden",
        display: "block",
      }}
      role="button"
      tabIndex={0}
      aria-hidden="true"
      onClick={() => {
        store.activePage.addElement({
          type: "image",
          src: "https://res.cloudinary.com/dt4bove91/image/upload/v1719589626/workspaceLogo_NotRounded_z0ighr.png",
          x: 100,
          y: 100,
          custom: {
            variable: "workspace-logo",
          },
          width: 150,
          height: 150,
          // can element be moved and rotated
          draggable: true,
          // can we change content of element?
          contentEditable: false,
          // can we change style of element?
          styleEditable: false,
          // can we resize element?
          resizable: true,
        });
      }}
    >
      <img
        src="https://res.cloudinary.com/dt4bove91/image/upload/v1719589626/workspaceLogo_NotRounded_z0ighr.png"
        alt=""
        width="100%"
        height="100%"
      />
    </div>
  );
};

const MergeImagesSection = {
  name: "mergeImages",
  Tab: ({ active, onClick }: SectionTabProps) => {
    return (
      <SectionTab name="Merge Images" active={active} onClick={onClick}>
        <Newspaper size={32} />
      </SectionTab>
    );
  },
  // we need observer to update component automatically on any store changes
  Panel: observer(({ store }: { store: any }) => {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <QRCodeSection store={store} />
        <VideoThumbnailSection store={store} />
        <WorkspaceLogoSection store={store} />
      </div>
    );
  }),
};

export default MergeImagesSection;
