import { app, BrowserWindow, ipcMain, protocol } from 'electron';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { autoUpdater } from 'electron-updater';

const isDev = process.env.NODE_ENV === 'development';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Auto-updater setup
autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = true;

let mainWindow = null;
let serverProcess = null;

function startServer() {
  try {
    const serverScript = path.join(__dirname, 'dist', 'index.js');

    // If the built server exists, run it. Otherwise, attempt to run `npm run dev` (dev mode)
    if (require('fs').existsSync(serverScript)) {
      serverProcess = spawn(process.execPath, [serverScript], { stdio: 'inherit' });
    } else {
      // fallback to running the dev server (requires deps installed)
      serverProcess = spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'dev'], { cwd: path.join(__dirname), stdio: 'inherit' });
    }

    serverProcess.on('close', (code) => {
      console.log(`Backend exited with code ${code}`);
      serverProcess = null;
    });
  } catch (err) {
    console.error('Failed to start backend:', err);
  }
}

function createSplashScreen() {
  const splash = new BrowserWindow({
    width: 400,
    height: 300,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
  });

  splash.loadFile(path.join(__dirname, 'build', 'splash.html'));
  return splash;
}

function createWindow() {
  // Create main window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false, // Hide until ready
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
    icon: path.join(__dirname, 'build', 'icon.ico')
  });

  // Load the app
  const indexHtml = path.join(__dirname, 'dist', 'public', 'index.html');
  if (fs.existsSync(indexHtml)) {
    mainWindow.loadFile(indexHtml);
  } else {
    // In development, fallback to Vite dev server
    mainWindow.loadURL('http://localhost:5173');
  }

  // Show window when ready
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    if (splashScreen) {
      splashScreen.close();
      splashScreen = null;
    }
  });

  // Handle saga:// protocol
  if (!isDev) {
    protocol.registerFileProtocol('saga', (request, callback) => {
      const url = request.url.substring(7);
      try {
        callback({ path: path.normalize(`${__dirname}/${url}`) });
      } catch (error) {
        console.error('Protocol handler error:', error);
      }
    });
  }

  // Check for updates
  if (!isDev) {
    autoUpdater.checkForUpdatesAndNotify();
  }
}

app.whenReady().then(() => {
  startServer();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('before-quit', () => {
  if (serverProcess) {
    try { serverProcess.kill(); } catch (e) {}
  }
});

app.on('window-all-closed', () => {
  // quit on all windows closed (except macOS app behavior)
  if (process.platform !== 'darwin') app.quit();
});
