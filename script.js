// AudioContext creation
let ac = new AudioContext();
let gn = ac.createGain();
gn.gain.value = 0.5;
let currGain = gn.gain.value;
var o = ac.createOscillator();
o.type = "sine";
o.connect(gn);
gn.connect(ac.destination);
o.start();

ac.suspend();

let playbutton = document.getElementById("playbutton");
var playing = false;

function playPause(){
    if (playing) {ac.resume(); playbutton.textContent = "Stop";}
    else {ac.suspend(); playbutton.textContent = "Play";}
    playing = !playing;
}

playbutton.addEventListener("click", playPause);

document.addEventListener('keyup', event => {
  if (event.code === 'Space') {
    playPause();
  }
})

let frequencyinput = document.getElementById("frequencyinput");

frequencyinput.addEventListener("input", function(e){
    o.frequency.value = e.target.value;
})

function setFreq(freq){
    o.frequency.value = freq;
    frequencyinput.value = Math.round(freq * 100)/100;
}

let gaininput = document.getElementById("gaininput");

gaininput.addEventListener("input", function(e){
    gn.gain.value = e.target.value;
})

function wssClicked(wave){
    o.type = wave;
    let waves = ["sine", "square", "triangle", "sawtooth"];
    for (var i = 0; i < 4; i++){document.getElementById("wss"+waves[i]).classList.remove("wss-selected")};
    document.getElementById("wss"+wave).classList.add("wss-selected");
}

function playFreqSeries(freqs, times){
    for (var i = 0; i < freqs.length; i++){
        setTimeout(setFreq, times[i], freqs[i]);
    }
}

function freqInc(start, multiplier, duration, count, delay=0){
    setTimeout(function(){ac.resume(); playbutton.textContent = "Stop";}, delay);
    freq = start;
    var i;
    for (i = 0; i < count; i++){
        setTimeout(setFreq, delay + duration*i, freq);
        freq *= multiplier;
    }
}