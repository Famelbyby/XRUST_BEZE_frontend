import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { createSelectorHook, Provider } from 'react-redux'
import { appStore } from './AppStore.tsx'

export const sel1 = createSelectorHook();

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Provider store={appStore}>
            <App />
        </Provider>
    </BrowserRouter>
)
