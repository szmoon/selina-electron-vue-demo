import { app, BrowserWindow, ipcMain, screen, shell } from 'electron';
import { join } from 'node:path';

let bsodWindow = null;

function loadRoute(window, route = '/') {
  if (!app.isPackaged && process.env.ELECTRON_RENDERER_URL) {
    window.loadURL(`${process.env.ELECTRON_RENDERER_URL}#${route}`);
  } else {
    window.loadFile(join(import.meta.dirname, '../renderer/index.html'), {
      hash: route
    });
  }
}

function openLinkWindow(url) {
  if (!URL.canParse(url) || new URL(url).protocol !== 'https:') return;

  const linkWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  linkWindow.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  linkWindow.loadURL(url);
}

function openBsodWindow() {
  if (bsodWindow) {
    bsodWindow.focus();
    return;
  }

  const display = screen.getDisplayNearestPoint(screen.getCursorScreenPoint());

  bsodWindow = new BrowserWindow({
    ...display.bounds,
    fullscreen: true,
    frame: false,
    backgroundColor: '#7ad2f5',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  bsodWindow.webContents.on('before-input-event', (_event, input) => {
    if (input.key === 'Escape') bsodWindow.close();
  });
  bsodWindow.on('closed', () => {
    bsodWindow = null;
  });

  loadRoute(bsodWindow, '/bsod');
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(import.meta.dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  mainWindow.once('ready-to-show', () => mainWindow.show());

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url);
    return { action: 'deny' };
  });

  loadRoute(mainWindow);
}

app.whenReady().then(() => {
  ipcMain.on('open-link', (_event, url) => openLinkWindow(url));
  ipcMain.on('open-bsod', () => openBsodWindow());
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
