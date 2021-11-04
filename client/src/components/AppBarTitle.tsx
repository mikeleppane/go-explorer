import React, { CSSProperties } from "react";

const containerStyle: CSSProperties = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: 0,
  margin: 0,
  height: "100%",
};

export default function AppBarTitle() {
  // const classes = useStyles;
  return (
    <div style={containerStyle}>
      <p
        style={{
          textAlign: "center",
          margin: 0,
          padding: 0,
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        Golang
      </p>
      <p
        style={{
          textAlign: "center",
          margin: 0,
          padding: 0,
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        Explorer
      </p>
    </div>
  );
}
