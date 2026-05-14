import { createContext, useContext } from "react";

export const InquiryContext = createContext({
  open: false,
  openInquiry: () => {},
  closeInquiry: () => {},
});

export const useInquiry = () => useContext(InquiryContext);
