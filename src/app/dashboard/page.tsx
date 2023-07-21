'use client'
import FooterContext from "@/context/footerContext";
import Home from "./home/page";

export default function Page() {
  return (
    <FooterContext.Provider value={{showFooter: false}}>
      <Home />
    </FooterContext.Provider>
  )
}
