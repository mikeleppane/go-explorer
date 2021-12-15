import React from "react";
import { AppBar, Box, Tab, Tabs } from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ClearIcon from "@mui/icons-material/Clear";

let maxTabIndex = 0;
//let currentTabIndex = 0;

export default function CodeTabs() {
  const [tabId, setTabId] = React.useState(0);
  //const [tabs, setAddTab] = React.useState<ReturnType<typeof Tab>[]>([]);
  const [tabs, setAddTab] = React.useState<{ codeTabId: number }[]>([]);
  const handleTabChange = (
    _event: React.SyntheticEvent,
    newTabId: number | string
  ) => {
    console.log(`handleTabChange: ${newTabId} ==> ${typeof newTabId}`);
    if (newTabId === "newTab") {
      handleAddTab();
    } else {
      if (
        typeof newTabId === "number" &&
        (tabs.find((tab) => tab.codeTabId === newTabId) || newTabId === 0)
      ) {
        //currentTabIndex = newTabId;
        setTabId(newTabId);
      }
    }
  };

  const handleTabRemove = (id: number) => {
    if (id !== tabId) {
      return;
    }
    if (tabId === maxTabIndex && tabId > 1) {
      console.log("STEP 1");
      setTabId(maxTabIndex - 1);
    } else if (tabId === 1 && tabs.length === 1) {
      console.log("STEP 2");
      setTabId(0);
    } else if (tabId < maxTabIndex && tabs.length > 0) {
      console.log("STEP 3");
      setTabId(tabId + 1);
    }
    setAddTab(tabs.filter((tab) => tab.codeTabId !== tabId));
  };

  const handleAddTab = () => {
    maxTabIndex = maxTabIndex + 1;
    const id = maxTabIndex;
    setAddTab([...tabs, { codeTabId: id }]);
    setTabId(id);
  };

  return (
    <Box sx={{ bgcolor: "#505050", flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{
          backgroundColor: "#505050",
        }}
      >
        <Tabs
          value={tabId}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons={true}
        >
          <Tab label="Main" value={0} sx={{ color: "white" }} />
          {tabs.length > 0 &&
            tabs.map((tab) => {
              return (
                <Tab
                  key={tab.codeTabId}
                  label={`Code ${tab.codeTabId}`}
                  value={tab.codeTabId}
                  icon={
                    <ClearIcon
                      fontSize="small"
                      style={{
                        marginLeft: "10px",
                      }}
                      onClick={() => handleTabRemove(tab.codeTabId)}
                    />
                  }
                  iconPosition="end"
                  sx={{
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    minHeight: "15px",
                    color: "white",
                  }}
                />
              );
            })}
          <Tab
            icon={<PostAddIcon />}
            value="newTab"
            style={{ color: "white" }}
          />
        </Tabs>
      </AppBar>
    </Box>
  );
}
