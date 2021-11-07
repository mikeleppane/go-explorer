import { useDispatch } from "react-redux";
import { AppDispatch } from "../types";

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const useAppDispatch = () => useDispatch<AppDispatch>();
