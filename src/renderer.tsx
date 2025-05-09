/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import MainLayout from './components/MainLayout'
import List from './pages/List';
import Entry from './pages/Entry';
import Login from './pages/Login';
import ScrollToTop from './utils/ScrollToTop';
import Add from './pages/Add';

console.log('👋 This message is being logged by "renderer.ts", included via Vite');


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HashRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<List/>}></Route>
                    <Route path="/login" element={<Login/>}></Route>
                    <Route path="/add" element={<Add/>}></Route>
                </Route> 
            </Routes>
        </HashRouter>
    </StrictMode>
);