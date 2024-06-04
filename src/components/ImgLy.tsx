/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import CreativeEditorSDK, {
  CompleteAssetResult,
  CreateConfiguration,
} from "@cesdk/cesdk-js";

const allowedElements = [
  "ly.img.template",
  // "ly.img.upload",
  "ly.img.image",
  "ly.img.text",
  // "ly.img.vectorpath",
  // "ly.img.sticker",
  // "ly.img.shape",
];
const config: CreateConfiguration = {
  license: "Ja05s_xlFGJAebMqY-4s1easrjfR1Iui2Zc2a5Bbkz2B_ziuuw1tyjnBakc5w9B7",
  userId: "guides-user",
  role: "Creator",
  ui: {
    pageFormats: {
      "4x6 inches": {
        default: true,
        width: 6,
        height: 4,
        unit: "Inch",
        fixedOrientation: false,
      },
      "6x9 inches": {
        width: 9,
        height: 6,
        unit: "Inch",
        fixedOrientation: false,
      },
      "6x11 inches": {
        width: 11,
        height: 6,
        unit: "Inch",
        fixedOrientation: false,
      },
    },
    elements: {
      view: "default", // 'default' or 'advanced'
      navigation: {
        show: true, // 'false' to hide the navigation completely
        position: "top" as any, // 'top' or 'bottom'
        action: {
          close: false, // true or false
          back: false, // true or false
          load: true, // true or false
          save: true, // true or false
          export: {
            show: true,
            format: ["application/pdf", "image/png"],
          },
          download: true, // true  or false
          custom: [
            {
              label: "common.custom", // string or i18n key
              iconName: "default", // one of 'default', 'download', 'upload', or 'save'
              callback: () => {
                // callback signature is `() => void | Promise<void>`
                // place custom functionality here
              },
            },
          ],
        },
      },
      panels: {
        inspector: {
          show: true, // true or false
          position: "left" as any, // 'left' or 'right'
          floating: false, // true or false
        },
        assetLibrary: {
          show: true, // true or false
          position: "left" as any, // 'left' or 'right'
        },
        settings: {
          show: true, // true or false
        },
      },
      dock: {
        iconSize: "large", // 'large' or 'normal'
        hideLabels: false, // false or true
        groups: [
          // {
          //   id: "ly.img.sticker", // string
          //   entryIds: ["ly.img.sticker"], // string[]
          //   showOverview: true, // true or false
          // },
          // {
          //   id: "ly.img.template", // string
          //   entryIds: ["ly.img.template"], // string[]
          // },
          {
            id: "ly.img.defaultGroup", // string
            showOverview: false, // true or false QL. Show the overview in the dock i.e a section that shows all the elements in the group
          },
        ],
        // defaultGroupId: "ly.img.defaultGroup", // string
      },
      libraries: {
        insert: {
          entries: (defaultEntries) => {
            return [
              {
                id: "my-templates",
                sourceIds: ["my-templates"],
                title: "My Templates",
              },
              ...defaultEntries.filter((entry) =>
                allowedElements.includes(entry.id)
              ),
            ];
          },
          floating: true, // true or false
          autoClose: false, // true or false
        },
        replace: {
          entries: (defaultEntries) => {
            console.log({ defaultEntries });

            return defaultEntries;
          },
          floating: true, // true or false
          autoClose: false, // true or false
        },
      },
      blocks: {
        opacity: false, // true  or false
        transform: false, // true  or false"
        "//ly.img.ubq/graphic": {
          adjustments: false, // true  or false
          filters: false, // true  or false
          effects: false, // true  or false
          blur: false, // true  or false
          crop: false, // true  or false
        },
        "//ly.img.ubq/page": {
          manage: true, // QL. Controls if you can add, remove, and reorder pages
          format: false,
          // maxDuration: 30 * 60, //QL. Only needed in video mode
        },
      },
    },
  },
  // Enable local uploads in Asset Library
  callbacks: {
    // onUpload: "local",
    onBack: () => {
      window.alert("Back callback!");
    },
    onClose: () => {
      window.alert("Close callback!");
    },
    onSave: (scene) => {
      window.alert("Save callback!");
      console.info(scene);
    },
    onDownload: (scene) => {
      window.alert("Download callback!");
      console.info(scene);

      // Save the scene to a .scene file
      const sceneFile = new Blob([JSON.stringify(scene)], {
        type: "application/json",
      });
      const sceneUrl = URL.createObjectURL(sceneFile);
      const a = document.createElement("a");
      a.href = sceneUrl;
      a.download = "scene.scene";
      a.click();
      URL.revokeObjectURL(sceneUrl);
    },
    onExport: (blobs, options) => {
      const file = blobs[0];
      const url = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = `exported.${options.mimeType.split("/")[1]}`;
      a.click();
      URL.revokeObjectURL(url);

      return Promise.resolve();
    },
    onUpload: (file, onProgress) => {
      const newImage = {
        id: "exampleImageIdentifier",
        meta: {
          uri: "https://YOURSERVER/images/file.jpg",
          thumbUri: "https://YOURSERVER/images/thumb.jpg",
        },
      };

      console.log({
        file,
        onProgress,
      });
      return Promise.resolve(newImage);
    },
  },
};

function ImgLy() {
  const cesdk_container = useRef(null);
  const [cesdk, setCesdk] = useState<CreativeEditorSDK | null>(null);
  console.log({ cesdk });
  useEffect(() => {
    if (!cesdk_container.current) return;

    let cleanedUp = false;
    let instance: CreativeEditorSDK | null = null;
    CreativeEditorSDK.create(cesdk_container.current, config).then(
      async (_instance) => {
        instance = _instance;
        if (cleanedUp) {
          instance.dispose();
          return;
        }

        // Do something with the instance of CreativeEditor SDK, for example:
        // Populate the asset library with default / demo asset sources.
        await Promise.all([
          instance.addDefaultAssetSources({
            // excludeAssetSourceIds: ["ly.img.sticker"],
          }),
          instance.addDemoAssetSources({ sceneMode: "Design" }),
        ]);
        await instance.createDesignScene();

        // highlight-add-local-source
        instance.engine.asset.addLocalSource(
          "my-templates",
          ["image/png", "application/pdf"],
          async function applyAsset(
            asset: CompleteAssetResult
          ): Promise<number | undefined> {
            console.log({ asset });
            try {
              const response =
                await instance?.engine.scene.applyTemplateFromURL(
                  asset?.meta?.thumbUri || ""
                );
              console.log({ response });
            } catch (error) {
              console.log({ error });
            }

            return undefined;
          }
        );

        // Add variables
        instance.engine.variable.setString("first_name", "Recorder First Name");

        // highlight-add-local-source
        instance.engine.asset.addAssetToSource("my-templates", {
          id: "template1",
          label: {
            en: "Template IMAGE",
          },
          meta: {
            mimeType: "image/png",
            uri: `https://res.cloudinary.com/dt4bove91/image/upload/v1715165612/exported_or2rvk.png`,
            thumbUri: `https://res.cloudinary.com/dt4bove91/image/upload/v1715165612/exported_or2rvk.png`,
          },
        });

        instance.engine.asset.addAssetToSource("my-templates", {
          id: "template2",
          label: {
            en: "Template PDF",
          },
          meta: {
            mimeType: "application/pdf",
            uri: `https://res.cloudinary.com/dt4bove91/image/upload/v1715167130/exported_3_rerpth.pdf`,
            thumbUri: `https://res.cloudinary.com/dt4bove91/image/upload/v1715165612/exported_or2rvk.png`,
          },
        });
        instance.engine.asset.addAssetToSource("my-templates", {
          id: "template3",
          label: { en: "Template Scene url" },
          meta: {
            // mimeType: "application/pdf",
            uri: "https://res.cloudinary.com/dt4bove91/raw/upload/v1715168436/wgqfnw7c7bvygxxfqz82.scene",
            thumbUri: `https://res.cloudinary.com/dt4bove91/image/upload/v1715165612/exported_or2rvk.png`,
          },
        });

        setCesdk(instance);
      }
    );
    const cleanup = () => {
      cleanedUp = true;
      instance?.dispose();
      setCesdk(null);
    };
    return cleanup;
  }, [cesdk_container]);

  return (
    <div ref={cesdk_container} style={{ width: "100%", height: "100%" }}></div>
  );
}

export default ImgLy;
