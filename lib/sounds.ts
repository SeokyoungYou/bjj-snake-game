import * as Tone from "tone";

// Tone.js 초기화
const initTone = async () => {
  try {
    await Tone.start();
    Tone.Transport.start();
    console.log("Tone.js initialized successfully");
  } catch (error) {
    console.error("Failed to initialize Tone.js:", error);
  }
};

// 게임 시작 소리
const createStartSound = () => {
  const synth = new Tone.FMSynth({
    harmonicity: 3.01,
    modulationIndex: 14,
    oscillator: {
      type: "sine",
    },
    envelope: {
      attack: 0.01,
      decay: 0.2,
      sustain: 0.1,
      release: 0.4,
    },
    modulation: {
      type: "square",
    },
    modulationEnvelope: {
      attack: 0.5,
      decay: 0.1,
      sustain: 0.2,
      release: 0.1,
    },
  }).toDestination();

  const now = Tone.now();
  // 현대적인 시작 멜로디
  synth.triggerAttackRelease("C5", "16n", now);
  synth.triggerAttackRelease("E5", "16n", now + 0.1);
  synth.triggerAttackRelease("G5", "16n", now + 0.2);
  synth.triggerAttackRelease("C6", "8n", now + 0.3);
};

// 먹이 먹기 소리
const createEatSound = () => {
  const synth = new Tone.FMSynth({
    harmonicity: 2.5,
    modulationIndex: 10,
    oscillator: {
      type: "sine",
    },
    envelope: {
      attack: 0.001,
      decay: 0.1,
      sustain: 0.1,
      release: 0.1,
    },
    modulation: {
      type: "square",
    },
    modulationEnvelope: {
      attack: 0.2,
      decay: 0.1,
      sustain: 0.1,
      release: 0.1,
    },
  }).toDestination();

  const now = Tone.now();
  // 경쾌한 먹이 먹기 소리
  synth.triggerAttackRelease("C6", "32n", now);
  synth.triggerAttackRelease("E6", "32n", now + 0.05);
  synth.triggerAttackRelease("G6", "32n", now + 0.1);
};

// 게임 오버 소리
const createGameOverSound = () => {
  const synth = new Tone.FMSynth({
    harmonicity: 2.5,
    modulationIndex: 12,
    oscillator: {
      type: "sine",
    },
    envelope: {
      attack: 0.1,
      decay: 0.3,
      sustain: 0.1,
      release: 0.5,
    },
    modulation: {
      type: "square",
    },
    modulationEnvelope: {
      attack: 0.3,
      decay: 0.2,
      sustain: 0.1,
      release: 0.4,
    },
  }).toDestination();

  const now = Tone.now();
  // 현대적인 게임 오버 소리
  synth.triggerAttackRelease("C4", "8n", now);
  synth.triggerAttackRelease("B3", "8n", now + 0.1);
  synth.triggerAttackRelease("A3", "8n", now + 0.2);
  synth.triggerAttackRelease("G3", "4n", now + 0.3);
};

// 특수 아이템 소리
const createSpecialItemSound = () => {
  const synth = new Tone.FMSynth({
    harmonicity: 3,
    modulationIndex: 15,
    oscillator: {
      type: "sine",
    },
    envelope: {
      attack: 0.01,
      decay: 0.2,
      sustain: 0.1,
      release: 0.3,
    },
    modulation: {
      type: "square",
    },
    modulationEnvelope: {
      attack: 0.2,
      decay: 0.1,
      sustain: 0.1,
      release: 0.2,
    },
  }).toDestination();

  const now = Tone.now();
  // 특수 아이템 획득 소리
  synth.triggerAttackRelease("C5", "16n", now);
  synth.triggerAttackRelease("E5", "16n", now + 0.1);
  synth.triggerAttackRelease("G5", "16n", now + 0.2);
  synth.triggerAttackRelease("C6", "16n", now + 0.3);
  synth.triggerAttackRelease("E6", "16n", now + 0.4);
};

// 승급 소리
const createPromotionSound = () => {
  const synth = new Tone.FMSynth({
    harmonicity: 3.5,
    modulationIndex: 20,
    oscillator: {
      type: "sine",
    },
    envelope: {
      attack: 0.01,
      decay: 0.2,
      sustain: 0.3,
      release: 0.4,
    },
    modulation: {
      type: "square",
    },
    modulationEnvelope: {
      attack: 0.2,
      decay: 0.2,
      sustain: 0.2,
      release: 0.3,
    },
  }).toDestination();

  const now = Tone.now();
  // 축하하는 승급 소리
  synth.triggerAttackRelease(["C5", "E5", "G5"], "8n", now);
  synth.triggerAttackRelease(["C6", "E6", "G6"], "8n", now + 0.2);
  synth.triggerAttackRelease(["C7", "E7", "G7"], "8n", now + 0.4);
};

// 게임 효과음 객체
export const gameSounds = {
  init: initTone,
  start: createStartSound,
  eat: createEatSound,
  gameOver: createGameOverSound,
  specialItem: createSpecialItemSound,
  promotion: createPromotionSound,
};
