import React, { Suspense, useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { addNewCode } from "./state/actionCreators";
import { fromBinary } from "./services/binaryHandler";
import { Route, Routes } from "react-router-dom";
import Main from "./components/MainView";

const AppGuide = React.lazy(() => import("./components/Guide"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const share = query.get("share");
    if (share) {
      const decodedCode = fromBinary(window.atob(share));
      dispatch(addNewCode(decodedCode));
    }
  }, []);

  return (
    <Box
      sx={{
        margin: 0,
        padding: 0,
        top: 0,
        left: 0,
      }}
    >
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/help"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AppGuide />
            </Suspense>
          }
        />
      </Routes>
    </Box>
  );
}

export default App;
