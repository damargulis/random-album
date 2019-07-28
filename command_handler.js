chrome.commands.onCommand.addListener((command) => {
    switch (command) {
        case "next-album":
            chrome.tabs.query({url: "*://*.google.com/music/listen*"}, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, {'type': 'next-album'});
            });
            break;
        case "prev-album":
            chrome.tabs.query({url: "*://*.google.com/music/listen*"}, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, {'type': 'prev-album'});
            });
            break;
        default:
            console.log("Command not recognized");
            console.log(command);
    }
})
