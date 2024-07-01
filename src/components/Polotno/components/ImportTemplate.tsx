/* eslint-disable @typescript-eslint/no-explicit-any */
import { observer } from "mobx-react-lite";
// import default tab component
import { SectionTab } from "polotno/side-panel";

import { FolderOpen } from "phosphor-react";

type SectionTabProps = {
  onClick: any;
  active: boolean;
};

const ImportTemplateSection = {
  name: "loadTemplate",
  Tab: ({ active, onClick }: SectionTabProps) => {
    return (
      <SectionTab name="Load Template" active={active} onClick={onClick}>
        <FolderOpen size={32} />
      </SectionTab>
    );
  },
  // we need observer to update component automatically on any store changes
  Panel: observer(({ store }: { store: any }) => {
    const handleLoadTemplate = (template: JSON) => {
      // Load template
      store.loadJSON(template);
    };
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {/* Upload file as json format */}
        <input
          type="file"
          accept=".json"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => {
                const content = e.target?.result;
                if (typeof content === "string") {
                  handleLoadTemplate(JSON.parse(content));
                }
              };
              reader.readAsText(file);
            }
          }}
        />
      </div>
    );
  }),
};

export default ImportTemplateSection;
