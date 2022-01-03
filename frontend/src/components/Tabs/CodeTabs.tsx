import React from "react";
import { AppBar, Box, Tab, Tabs } from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch } from "react-redux";
import {
  changeCurrentTab,
  deleteCode,
  newTemplateCode,
} from "../../state/actionCreators";
import { useConfirm } from "material-ui-confirm";

let maxTabIndex = 0;

export default function CodeTabs() {
  const [currentTabId, setTabId] = React.useState(0);
  const [tabs, setAddTab] = React.useState<{ codeTabId: number }[]>([]);
  const dispatch = useDispatch();
  const confirm = useConfirm();
  const handleTabChange = (
    _event: React.SyntheticEvent,
    newTabId: number | string
  ) => {
    if (newTabId === "newTab") {
      handleAddTab();
    } else {
      if (
        typeof newTabId === "number" &&
        (tabs.find((tab) => tab.codeTabId === newTabId) || newTabId === 0)
      ) {
        setTabId(newTabId);
        dispatch(changeCurrentTab(newTabId));
      }
    }
  };

  const handleRemoveTab = (id: number) => {
    confirm({
      description: "You might lose all the code from the current tab!",
    })
      .then(() => {
        const isLastTabWithTwoOrMoreTabs =
          id === maxTabIndex && tabs.length > 1;
        const hasOnlyOneTab = tabs.length === 1;
        const isMiddleTabWithTwoOrMoreTabs =
          id < maxTabIndex && tabs.length > 1;
        if (isLastTabWithTwoOrMoreTabs) {
          maxTabIndex = tabs[tabs.length - 2].codeTabId;
          setTabId(maxTabIndex);
          dispatch(changeCurrentTab(maxTabIndex));
        } else if (hasOnlyOneTab) {
          setTabId(0);
          maxTabIndex = 0;
          dispatch(changeCurrentTab(0));
        } else if (isMiddleTabWithTwoOrMoreTabs) {
          maxTabIndex = tabs[tabs.length - 1].codeTabId;
          setTabId(maxTabIndex);
          dispatch(changeCurrentTab(maxTabIndex));
        }
        setAddTab(tabs.filter((tab) => tab.codeTabId !== id));
        dispatch(deleteCode(id));
      })
      .catch(() => {
        return;
      });
  };

  const handleAddTab = () => {
    maxTabIndex = maxTabIndex + 1;
    const id = maxTabIndex;
    const sortedTabs = [...tabs, { codeTabId: id }];
    sortedTabs.sort(function (a, b) {
      if (a.codeTabId < b.codeTabId) return -1;
      if (a.codeTabId > b.codeTabId) return 1;
      return 0;
    });
    setAddTab(sortedTabs);
    setTabId(id);
    dispatch(changeCurrentTab(id));
    dispatch(newTemplateCode());
  };

  return (
    <Box sx={{ bgcolor: "#505050", flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#505050",
        }}
      >
        <Tabs
          value={currentTabId}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons={true}
        >
          <Tab
            id="main-tab"
            label="Main"
            value={0}
            sx={{ color: "white", fontSize: 16 }}
          />
          {tabs.length > 0 &&
            tabs.map((tab) => {
              return (
                <Tab
                  id={`code-tab-${tab.codeTabId}`}
                  key={tab.codeTabId}
                  label={`Code ${tab.codeTabId}`}
                  value={tab.codeTabId}
                  icon={
                    <ClearIcon
                      id={`clear-tab-${tab.codeTabId}`}
                      fontSize="small"
                      sx={{
                        marginLeft: "10px",
                        "&:hover": {
                          color: "red",
                          backgroundColor: "#797D7F",
                        },
                      }}
                      onClick={() => {
                        handleRemoveTab(tab.codeTabId);
                      }}
                    />
                  }
                  iconPosition="end"
                  sx={{
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    minHeight: "15px",
                    color: "white",
                    fontSize: 16,
                  }}
                />
              );
            })}
          <Tab
            id="new-tab"
            icon={<PostAddIcon />}
            value="newTab"
            sx={{ color: "white" }}
          />
        </Tabs>
      </AppBar>
    </Box>
  );
}
