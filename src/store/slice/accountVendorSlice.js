import { createSlice } from "@reduxjs/toolkit";
import { setUploading, setLoading } from "./loaderSlice";
import { services } from "../../shared/_services/api_services";
import {
  errorHandler,
  successHandler,
} from "../../shared/_helper/response_helper";

const initialState = {
  vendorList: [],
  vendorListCount: 0,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setVendorList: (state, action) => {
      state.vendorList = action.payload.result;
      state.vendorListCount = action.payload.total;
    },
  },
});

export const { setVendorList } = accountSlice.actions;

export default accountSlice.reducer;

export function fetchVendorList(payload) {
  return async function fetchVendorListThunk(dispatch) {
    dispatch(setLoading(true));
    try {
      await services.vendorList(payload).then(
        (response) => {
          dispatch(setLoading(false));
          dispatch(setVendorList(response.data));
        },
        (error) => {
          dispatch(setLoading(false));
          errorHandler(error.response);
        },
      );
    } catch (err) {}
  };
}

export function changeVendorStatus(body, filters) {
  return async function changeVendorStatusThunk(dispatch) {
    dispatch(setUploading(true));
    try {
      await services.changeVendorStatus(body).then(
        (response) => {
          dispatch(setUploading(false));
          dispatch(fetchVendorList(filters));
          successHandler("Status Updated Successfully!");
        },
        (error) => {
          dispatch(setUploading(false));
          errorHandler(error.response);
        },
      );
    } catch (err) {}
  };
}

// Commented out until backend API is ready
// export function fetchVendorById(id) {
//   return async function fetchVendorByIdThunk(dispatch) {
//     dispatch(setLoading(true));
//     try {
//       await services.getVendorById(id).then(
//         (response) => {
//           dispatch(setLoading(false));
//           dispatch(setSelectedVendor(response.data));
//         },
//         (error) => {
//           dispatch(setLoading(false));
//           errorHandler(error.response);
//         },
//       );
//     } catch (err) {}
//   };
// }
