import * as Tone from "tone";

let backgroundMusicSequence: Tone.Pattern<string> | null = null;
let mainPattern: Tone.Pattern<string> | null = null;
let bassPattern: Tone.Pattern<string> | null = null;
let harmonyPattern: Tone.Pattern<string> | null = null;
let drumPattern: Tone.Pattern<string> | null = null;

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
  synth.triggerAttackRelease("C5", "8n", now);
  synth.triggerAttackRelease("E5", "8n", now + 0.1);
  synth.triggerAttackRelease("G5", "8n", now + 0.2);
  synth.triggerAttackRelease("C6", "8n", now + 0.3);
  synth.triggerAttackRelease("E6", "8n", now + 0.4);
  synth.triggerAttackRelease("G6", "8n", now + 0.5);
  synth.triggerAttackRelease("C7", "8n", now + 0.6);
  synth.triggerAttackRelease("E7", "8n", now + 0.7);
  synth.triggerAttackRelease("G7", "8n", now + 0.8);
};

// 배경 음악 생성
const createBackgroundMusic = () => {
  if (backgroundMusicSequence) {
    return;
  }

  // 메인 멜로디를 위한 신스
  const mainSynth = new Tone.Synth({
    oscillator: {
      type: "square",
    },
    envelope: {
      attack: 0.01,
      decay: 0.1,
      sustain: 0.1,
      release: 0.1,
    },
  }).toDestination();

  // 베이스 라인을 위한 신스
  const bassSynth = new Tone.Synth({
    oscillator: {
      type: "triangle",
    },
    envelope: {
      attack: 0.01,
      decay: 0.2,
      sustain: 0.1,
      release: 0.2,
    },
  }).toDestination();

  // 메인 멜로디 패턴 (더 다양한 패턴)
  mainPattern = new Tone.Pattern(
    (time, note) => {
      mainSynth.triggerAttackRelease(note, "8n", time);
    },
    [
      // 첫 번째 구간: C 메이저 스케일
      "C4",
      "E4",
      "G4",
      "C5",
      "E5",
      "G5",
      "E5",
      "C5",
      // 두 번째 구간: G 메이저 스케일
      "G4",
      "B4",
      "D5",
      "G5",
      "B5",
      "D6",
      "B5",
      "G5",
      // 세 번째 구간: A 마이너 스케일
      "A4",
      "C5",
      "E5",
      "A5",
      "C6",
      "E6",
      "C6",
      "A5",
      // 네 번째 구간: F 메이저 스케일
      "F4",
      "A4",
      "C5",
      "F5",
      "A5",
      "C6",
      "A5",
      "F5",
    ],
    "upDown"
  );

  // 베이스 라인 패턴 (더 다양한 진행)
  bassPattern = new Tone.Pattern(
    (time, note) => {
      bassSynth.triggerAttackRelease(note, "4n", time);
    },
    [
      // C 메이저 구간
      "C2",
      "G2",
      "C3",
      "G2",
      // G 메이저 구간
      "G2",
      "D3",
      "G2",
      "D3",
      // A 마이너 구간
      "A2",
      "E3",
      "A2",
      "E3",
      // F 메이저 구간
      "F2",
      "C3",
      "F2",
      "C3",
    ],
    "upDown"
  );

  // 볼륨 조절
  mainSynth.volume.value = -8;
  bassSynth.volume.value = -12;

  // 패턴 시작
  mainPattern.start(0);
  bassPattern.start(0);
  backgroundMusicSequence = mainPattern;
};

// 배경 음악 중지
const stopBackgroundMusic = () => {
  // 모든 패턴 중지 및 정리
  if (mainPattern) {
    mainPattern.stop();
    mainPattern.dispose();
    mainPattern = null;
  }
  if (bassPattern) {
    bassPattern.stop();
    bassPattern.dispose();
    bassPattern = null;
  }
  if (backgroundMusicSequence) {
    backgroundMusicSequence.stop();
    backgroundMusicSequence.dispose();
    backgroundMusicSequence = null;
  }
};

// 게임 효과음 객체
export const gameSounds = {
  init: initTone,
  start: () => {
    createStartSound();
    createBackgroundMusic();
  },
  createBackgroundMusic,
  stopBackgroundMusic,
  eat: createEatSound,
  gameOver: () => {
    createGameOverSound();
    stopBackgroundMusic();
  },
  specialItem: createSpecialItemSound,
  promotion: createPromotionSound,
};
