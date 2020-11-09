import React from 'react';
import { AnimatingProvider, LoadingProvider, MenuProvider } from "./src/hooks"
import "./src/styles/global.css"

export const wrapRootElement = ({ element }) => (
  <LoadingProvider>
    <AnimatingProvider>
      <MenuProvider>{element}</MenuProvider>
    </AnimatingProvider>
  </LoadingProvider>
)
