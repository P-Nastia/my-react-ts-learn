import { createRoot } from 'react-dom/client'
import './index.css'
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from './App.tsx'
import {Provider} from "react-redux";
import {store} from "./store";
import {ThemeProvider} from "./context/ThemeContext.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import {AppWrapper} from "./components/common/PageMeta.tsx";

createRoot(document.getElementById('root')!).render(
    <>
        <ThemeProvider>
            <AppWrapper>
                <Provider store={store}>
                    <UserProvider>
                        <App />
                    </UserProvider>
                </Provider>
            </AppWrapper>
        </ThemeProvider>
    </>
)