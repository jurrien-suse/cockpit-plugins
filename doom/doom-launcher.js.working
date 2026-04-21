window.addEventListener("load", () => {
    // Force local path for engine files (.wasm / .js)
    if (window.emulators) {
        window.emulators.pathPrefix = "./";
    }

    const container = document.getElementById("dos-container");

    // Initialize Dos with the local ZIP bundle
    Dos(container, {
        url: "doom.jsdos",   // Reverting to the ZIP bundle
        pathPrefix: "./",
        workerThread: false, // Required for Cockpit CSP compatibility
        autoStart: true,     // Bypasses the 'Prerun' screen
        kiosk: true,         // Removes UI elements that cause stretching
        renderBackend: "webgl", 
        renderAspect: "AsIs", // Scaled to fit the container dimensions
        jsdosConf: {
            version: "js-dos-v8"
        },
        dosboxConf: `
[sdl]
autolock=true

[render]
aspect=true
scaler=none

[cpu]
cycles=max

[autoexec]
mount c .
c:
# Handles different internal ZIP structures
if exist DOOM cd DOOM
DOOM.EXE
`
    });
});
