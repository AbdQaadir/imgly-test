import { createPolotnoApp } from "polotno";
import Polotno from "./components/Polotno";

import "@blueprintjs/core/lib/css/blueprint.css";
import { StoreType } from "polotno/model/store";

const { store }: { store: StoreType } = createPolotnoApp({
  container: document.getElementById("root"),
  key: "dtO7WTTyLFznFivtFBSn",
  showCredit: false,
  sections: ["photos", "text", "templates"],
});

// add page and element instantly
store.addPage();

function App() {
  return (
    <div id="container">
      <Polotno store={store} />
    </div>
  );
}

export default App;
