/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { observer } from "mobx-react-lite";

import { Button, Tooltip } from "@blueprintjs/core";
import { t } from "polotno/utils/l10n";
import { StoreType } from "polotno/model/store";

type PageControlsProps = {
  store: StoreType;
  page: any;
  xPadding: number;
  yPadding: number;
  maxPages: number;
  canDeletePage?: boolean;
  canSwitchPage?: boolean;
};

const PageControls = observer(
  ({
    store,
    page,
    xPadding,
    yPadding,
    maxPages,
    canDeletePage,
    canSwitchPage,
  }: PageControlsProps) => {
    const hasManyPages = store.pages.length > 1;
    const reachedMaxPages = store.pages.length >= maxPages;
    const index = store.pages.indexOf(page);

    return (
      <>
        <div
          style={{
            position: "absolute",
            top: yPadding - 35 + "px",
            left: xPadding + "px",
          }}
        >
          <p>{page.custom?.name || "Untitled page"}</p>
        </div>
        <div
          style={{
            position: "absolute",
            top: yPadding - 40 + "px",
            right: xPadding + "px",
          }}
        >
          {hasManyPages && canSwitchPage && (
            <Tooltip content={t("workspace.moveUp")} disabled={index === 0}>
              <Button
                icon="chevron-up"
                minimal
                disabled={index === 0}
                onClick={() => {
                  page.setZIndex(index - 1);
                }}
              ></Button>
            </Tooltip>
          )}
          {hasManyPages && canSwitchPage && (
            <Tooltip
              content={t("workspace.moveDown")}
              disabled={index === store.pages.length - 1}
            >
              <Button
                icon="chevron-down"
                minimal
                disabled={index === store.pages.length - 1}
                onClick={() => {
                  const index = store.pages.indexOf(page);
                  page.setZIndex(index + 1);
                }}
              ></Button>
            </Tooltip>
          )}
          {!reachedMaxPages && (
            <Tooltip content={t("workspace.duplicatePage")}>
              <Button
                icon="duplicate"
                minimal
                onClick={() => {
                  page.clone();
                }}
              ></Button>
            </Tooltip>
          )}

          {hasManyPages && canDeletePage && (
            <Tooltip content={t("workspace.removePage")}>
              <Button
                icon="trash"
                minimal
                onClick={() => {
                  store.deletePages([page.id]);
                }}
              ></Button>
            </Tooltip>
          )}
          {!reachedMaxPages && (
            <Tooltip content={t("workspace.addPage")}>
              <Button
                icon="insert"
                minimal
                onClick={() => {
                  // Check if Back page exists
                  const frontPageExists = store.pages.find(
                    (p: any) => p.custom?.name === "Front"
                  );

                  const newPage = store.addPage({
                    bleed: store.activePage?.bleed || 0,
                    custom: { name: frontPageExists ? "Back" : "Front" },
                    zIndex: frontPageExists ? 0 : 1,
                  });

                  const index = store.pages.indexOf(page);
                  newPage.setZIndex(index + 1);
                }}
              ></Button>
            </Tooltip>
          )}
        </div>
      </>
    );
  }
);

export default PageControls;
