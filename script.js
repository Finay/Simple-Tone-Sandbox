// Elements for frequency table
let addbutton = document.getElementById("addfreq");
let freqtable = document.getElementById("freqtable");

// Create Oscillator/Gain pair object list
var oscs = [];

var playing = false;

function playPause(){
    if (playing) {
        for (var i = 0; i < oscs.length; i++){
            oscs[i].start(); 
        }
        playbutton.textContent = "Stop";
    }
    else {
        for (var i = 0; i < oscs.length; i++){
            oscs[i].stop(); 
        }
        playbutton.textContent = "Play";
    }
    playing = !playing;
}

// Wave changer (All Oscillators)
function wssClicked(wave){
    for (var i = 0; i<oscs.length; i++) oscs[i].type = wave;
    let waves = ["sine", "square", "triangle", "sawtooth"];
    for (var i = 0; i < 4; i++){document.getElementById("wss"+waves[i]).classList.remove("wss-selected")};
    document.getElementById("wss"+wave).classList.add("wss-selected");
}

// Make new Oscillator
function makeOsc(freq=440){
    var osc = new Tone.Oscillator(freq, "sine").toDestination();

    return osc;
}

// Update frequency in oscillator
function freqUpdate(e) {
    let targetRow = e.target.parentElement.parentElement;
    let tableItems = freqtable.children;
    var targetIndex;
    
    for (var i = 0; i < tableItems.length; i++) {
        if (tableItems[i] == targetRow) {targetIndex = i; break}}
    targetIndex--;

    oscs[targetIndex].frequency.value = e.target.value;
}

// Update gain in oscillator
function gainUpdate(e) {
    let targetRow = e.target.parentElement.parentElement;
    let tableItems = freqtable.children;
    var targetIndex;
    
    for (var i = 0; i < tableItems.length; i++) {
        if (tableItems[i] == targetRow) {targetIndex = i; break}}
    targetIndex--;

    oscs[targetIndex].volume.value = e.target.value;
}

// Create new frequency row
function newFR(){
    let elem = document.createElement("div");
    elem.className = "freqrow";
    elem.innerHTML = '<div class="frremove"><h1 onclick="removeFR(event)"><span>-</span><span>Remove?</span></h1></div><div><input oninput="gainUpdate(event)" type="number" id="gaininput" min="0" max="2" step="0.01" value=1>x</div><div><input type="number" oninput="freqUpdate(event)" id="frequencyinput" min="1" max="10000" value=440>Hz</div>'
    return elem;
}

// Add new frequency row to table
function addFR(){
    freqtable.insertBefore(newFR(), addbutton);
    o = makeOsc();
    o.start();
    oscs.push(o);
}

// Remove frequency row from table
function removeFR(e){
    let targetRow = e.target.parentElement.parentElement.parentElement;
    let tableItems = freqtable.children;
    var targetIndex;
    
    for (var i = 0; i < tableItems.length; i++) {
        if (tableItems[i] == targetRow) {targetIndex = i; break}
    }
    targetIndex--;

    oscs[targetIndex].stop();
    oscs[targetIndex].dispose();
    oscs.splice(targetIndex, 1);
    
    targetRow.style.height = "50px";
    targetRow.style.opacity = "1";
    targetRow.style.animation = "shrink 0.5s forwards ease";
    setTimeout(function(){targetRow.remove()}, 500);
}

window.addEventListener('load', (event) => {
    // Initial oscillator
    let o = makeOsc();
    o.start();
    oscs.push(o);
    
    // Run addFR() when addbutton pressed
    addbutton.addEventListener("click", addFR);
    
    // Play and Stop
    let playbutton = document.getElementById("playbutton");
    
    playbutton.addEventListener("click", playPause);
    
    document.addEventListener('keyup', event => {
      if (event.code === 'Space') {
        playPause();
      }
    })
});