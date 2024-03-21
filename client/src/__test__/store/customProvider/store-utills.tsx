import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import type { AppStore, RootState } from '../../../store/index'
import { setupStore } from '../../../store/index';
import { Provider } from 'react-redux';


interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: AppStore
  router?: React.ReactElement;
}



export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {

    },
   
    store = setupStore(preloadedState),
    router,
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {

  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {

    
    return <Provider store={store}>{children}</Provider>;
    // return <Provider store={store}>{router ? <Router>{children}</Router> : children}</Provider>;
  }


  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

