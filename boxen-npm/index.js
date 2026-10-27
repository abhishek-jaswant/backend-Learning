// +------------ Hurray!!! -------------+
// |I am using my first external module!|
// +------------------------------------+

// ╓──────────── Hurray!!! ─────────────╖
// ║I am using my first external module!║
// ╙────────────────────────────────────╜

// ╭───── Hurray!!! ──────╮
// │unicorns love rainbows│
// ╰──────────────────────╯


const boxen = require('boxen');

    
console.log(boxen('I am using my first external module!', { title: 'Hurray!!!', titleAlignment: 'center', textAlignment: 'center' }));
console.log(boxen('I am using my first external module!', { title: 'Hurray!!!', titleAlignment: 'center', textAlignment: 'center', padding: 1 }));
console.log(boxen('unicorns love rainbows', { title: 'Hurray!!!', titleAlignment: 'center', textAlignment: 'center', margin: 1 }));