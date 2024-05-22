import { createRoot } from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import { store, persistor } from "./redux/store"
import { PersistGate } from "redux-persist/integration/react"
import { StyledEngineProvider } from "@mui/material/styles"
import { HelmetProvider } from "react-helmet-async"
import App from "./App"
import "./css/style.css"
import "./css/loader.css"


const container = document.getElementById("root")
const root = createRoot(container) 

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <StyledEngineProvider injectFirst>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </StyledEngineProvider>
      </Router>
    </PersistGate>
  </Provider>
)

// Support for Hot Module Replacement (HMR)
if (import.meta.hot) {
  import.meta.hot.accept(["./App"], async () => {
    const NextApp = (await import("./App")).default
    root.render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <StyledEngineProvider injectFirst>
              <HelmetProvider>
                <NextApp />
              </HelmetProvider>
            </StyledEngineProvider>
          </Router>
        </PersistGate>
      </Provider>
    )
  })
}