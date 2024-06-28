import { setUploadFunc } from "polotno/config";
import Polotno from "./components/Polotno/Polotno";

import "@blueprintjs/core/lib/css/blueprint.css";
import createStore from "polotno/model/store";

const store = createStore({
  key: "dtO7WTTyLFznFivtFBSn",
  showCredit: false,
});

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

// Set the size of the canvas
store.setSize(900, 600, true);

// Add the pages
store.addPage({
  custom: { name: "Front" },
});

store.addPage({
  custom: { name: "Back" },
});

store.setSize(900, 600, true);

// define our upload function
// you have to write your own logic, that fits your API
async function upload(localFile: string | Blob | File) {
  const formData = new FormData();
  formData.append("file", localFile);
  formData.append("upload_preset", "general-assets");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const json = await res.json();

  const { url } = json;
  // return simple and short url
  return url;
}

// set new function
setUploadFunc(upload);

function App() {
  return (
    <div id="container">
      <Polotno
        store={store}
        maxPages={2}
        canDeletePage={true}
        showDownloadButton={true}
        showThumbnailButton={true}
        showJsonButton={true}
      />
    </div>
  );
}

export default App;
