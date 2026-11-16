import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  openLink: url => ipcRenderer.send('open-link', url)
});
