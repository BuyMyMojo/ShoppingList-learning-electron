const electron = require('electron');
const url = require('url');
const path = require('path');
 
const {app, BrowserWindow, Menu, globalShortcut} = electron;

let mainWindow;
let addWindow;

// Listen for app to be ready
app.on('ready', function(){

    // new widow
    mainWindow = new BrowserWindow({});
    // Load html
    mainWindow.loadFile('mainWindow.html');
    
    //quit app on main window close
    mainWindow.on('close', function(){
        app.quit();
    });


    //build menu from template
    const mainMenu = Menu.buildFromTemplate(menuBar);
    //inset menu
    Menu.setApplicationMenu(mainMenu);
});

// handle create add windows
function createAddWindow(){
    // new widow
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add shopping list item'
    });
    // Load html
    addWindow.loadFile('addWindow.html');

    addWindow.on('close', function(){
        addWindow = null;
    });
}

// Create menu bar templste
const menuBar = [
    
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Item',
                click(){
                    createAddWindow();
                }
            },
            {
                label: 'Clear Items'
            },
            {
                label: 'Quit',
                accelerator:   process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'Debugging',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator:   process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                },                      
            
            },
            {
                label: 'Relaunch app',
                click(item, focusedWindow){
                    app.relaunch();
                    app.quit();
                }
            },
            {
                label: 'Reload page',
                accelerator:   process.platform == 'darwin' ? 'Command+R' : 'Ctrl+R',
                click(item,focusedWindow){
                    focusedWindow.reload();
                }
            }
        ]
    }
];

// if mac, add empty menu item
if(process.platform == 'darwin'){
    mainMenu.unshift({});
}
