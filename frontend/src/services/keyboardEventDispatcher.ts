import React from "react";

export const dispatchKeyboardEvent = (
  e: React.KeyboardEvent<HTMLDivElement>
) => {
  const isCodeFormatRequested = e.ctrlKey && e.altKey && e.key === "f";
  const isCodeLintRequested = e.ctrlKey && e.altKey && e.key === "l";
  const isCodeBuildRequested = e.ctrlKey && e.altKey && e.key === "b";
  const isCodeTestingRequested = e.ctrlKey && e.altKey && e.key === "t";
  const isCodeRunRequested = e.ctrlKey && e.altKey && e.key === "Enter";
  const isCodeShareRequested = e.ctrlKey && e.altKey && e.key === "s";
  if (isCodeFormatRequested) {
    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "f",
        keyCode: 70,
        code: "KeyF",
        which: 70,
        altKey: true,
        ctrlKey: true,
        metaKey: false,
      })
    );
  }
  if (isCodeLintRequested) {
    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "l",
        keyCode: 76,
        code: "KeyL",
        which: 76,
        altKey: true,
        ctrlKey: true,
        metaKey: false,
      })
    );
  }
  if (isCodeTestingRequested) {
    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "t",
        keyCode: 84,
        code: "KeyT",
        which: 84,
        altKey: true,
        ctrlKey: true,
        metaKey: false,
      })
    );
  }
  if (isCodeShareRequested) {
    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "s",
        keyCode: 83,
        code: "KeyS",
        which: 83,
        altKey: true,
        ctrlKey: true,
        metaKey: false,
      })
    );
  }
  if (isCodeBuildRequested) {
    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "b",
        keyCode: 66,
        code: "KeyB",
        which: 66,
        altKey: true,
        ctrlKey: true,
        metaKey: false,
      })
    );
  }
  if (isCodeRunRequested) {
    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Enter",
        keyCode: 13,
        code: "Enter",
        which: 13,
        altKey: true,
        ctrlKey: true,
        metaKey: false,
      })
    );
  }
};
