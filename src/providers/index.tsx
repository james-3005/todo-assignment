import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/stores";
import { BrowserRouter } from "react-router-dom";

export default function AppProviders({ children }: PropsWithChildren) {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}
