import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { createSelectorHook, Provider } from 'react-redux';
import { appStore } from './AppStore.tsx';

import { Workbox } from 'workbox-window';

if ('serviceWorker' in navigator) {
    const wb = new Workbox('/sw.js'); // Путь к SW

    wb.register();
}

export const sel1 = createSelectorHook();

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Provider store={appStore}>
            <App />
        </Provider>
    </BrowserRouter>,
);
