const electron = require('electron');
const url = require('url');
const path = require('path');
 
const {app, BrowserWindow, Menu} = electron;

let mainWindow;

// Listen for app to be ready
app.on('ready', function(){

    // new widow
    mainWindow = new BrowserWindow({});
    // Load html
    mainWindow.loadFile('mainWindow.html');

    //build menu from template
    const mainMenu = Menu.buildFromTemplate(menuBar);
    //inset menu
    Menu.setApplicationMenu(mainMenu);
});

// Create menu bar templste
const menuBar = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Item'
            },
            {
                label: 'Clear Items'
            },
            {
                label: 'Quit',
                click(){
                    app.quit();
                }
            }
        ]
    }
];