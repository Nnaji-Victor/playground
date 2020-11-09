import React from 'react';
import { AnimatingProvider, LoadingProvider, MenuProvider } from "./src/hooks"
import "./src/styles/global.css"

export const wrapRootElement = ({ element }) => (
  <AnimatingProvider>
    <LoadingProvider>
      <MenuProvider>{element}</MenuProvider>
    </LoadingProvider>
  </AnimatingProvider>
)