export const addNewCode = (code: string) => {
  return {
    type: "NEW_CODE",
    payload: code,
  };
};
