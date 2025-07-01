import { createRoot } from 'react-dom/client'
import './index.css'
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from './App.tsx'
import {Provider} from "react-redux";
import {store} from "./store";
import {ThemeProvider} from "./context/ThemeContext.tsx";
import {AppWrapper} from "./components/common/PageMeta.tsx";
import {GoogleOAuthProvider} from "@react-oauth/google";

createRoot(document.getElementById('root')!).render(
    <>
        <ThemeProvider>
            <AppWrapper>
                <Provider store={store}>
                    <GoogleOAuthProvider clientId={'1040298597778-102kmv773ju5esa0lm2h4g6ticqtu5ko.apps.googleusercontent.com'}>
                        <App/>
                    </GoogleOAuthProvider>

                </Provider>,
            </AppWrapper>
        </ThemeProvider>,
    </>
)