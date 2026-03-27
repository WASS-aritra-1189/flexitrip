import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import loaderSlice from "./slice/loaderSlice";
import accountVendorSlice from "./slice/accountVendorSlice";
import faqSlice from "./slice/faqSlice";
import stateSlice from "./slice/stateSlice";
import citySlice from "./slice/citySlice";
import propertyTypeSlice from "./slice/propertyTypeSlice";
import propertyAmenitySlice from "./slice/propertyAmenitySlice";
import roomSlice from "./slice/roomSlice";
import policySlice from "./slice/policySlice";
import currencySlice from "./slice/currencySlice";
import languageSlice from "./slice/languageSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    loader: loaderSlice,
    accountVendor: accountVendorSlice,
    faq: faqSlice,
    state: stateSlice,
    city: citySlice,
    propertyType: propertyTypeSlice,
    propertyAmenity: propertyAmenitySlice,
    room: roomSlice,
    policy: policySlice,
    currency: currencySlice,
    language: languageSlice,
  },
});

export default store;
