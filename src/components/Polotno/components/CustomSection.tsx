/* eslint-disable @typescript-eslint/no-explicit-any */
import { observer } from "mobx-react-lite";
// import default tab component
import { SectionTab } from "polotno/side-panel";
// import our own icon
import { PlusCircle, QrCode } from "phosphor-react";

type SectionTabProps = {
  onClick: any;
  active: boolean;
};

const CustomSection = {
  name: "custom",
  Tab: ({ active, onClick }: SectionTabProps) => {
    return (
      <SectionTab name="Custom" active={active} onClick={onClick}>
        <PlusCircle size={24} />
      </SectionTab>
    );
  },
  // we need observer to update component automatically on any store changes
  Panel: observer(({ store }: { store: any }) => {
    return (
      <div>
        <p>Here we will define our own custom tab.</p>
        <p>Elements on the current page: {store.activePage?.children.length}</p>

        <div
          onClick={() => {
            const json = store.toJSON();

            console.log({ json: json });
            // Check if there exists a qr-code element
            const qrCodeElement = store.activePage.children.find(
              (element: any) => element.custom?.variable === "qr-code"
            );

            if (qrCodeElement) {
              alert(
                `You can only have one QR code element on the page. Page number: ${1}`
              );
              return;
            }

            store.activePage.addElement({
              type: "image",
              src: "https://res.cloudinary.com/dt4bove91/image/upload/v1717487800/Example-QR-code_jd14mf.jpg",
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
              resizable: false,
            });
          }}
        >
          <QrCode size={100} />
        </div>
      </div>
    );
  }),
};

export default CustomSection;
