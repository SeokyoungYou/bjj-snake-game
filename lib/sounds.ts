import * as Tone from "tone";

let backgroundMusicSequence: Tone.Pattern<string> | null = null;
let mainPattern: Tone.Pattern<string> | null = null;
let bassPattern: Tone.Pattern<string> | null = null;
let harmonyPattern: Tone.Pattern<string> | null = null;
let drumPattern: Tone.Pattern<string> | null = null;

// 오디오 컨텍스트 상태 관리
let isAudioContextInitialized = false;

// Tone.js 초기화
const initTone = async () => {
  try {
    if (!isAudioContextInitialized) {
      await Tone.start();
      await Tone.loaded();
      Tone.Transport.start();
      isAudioContextInitialized = true;
      console.log("Tone.js initialized successfully");
    }
  } catch (error) {
    console.error("Failed to initialize Tone.js:", error);
  }
};

// 사운드 생성 헬퍼 함수
const createSynth = (options: Partial<Tone.FMSynthOptions> = {}) => {
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
    ...options,
  }).toDestination();

  // 볼륨 제한 설정
  synth.volume.value = -10;
  return synth;
};

// 게임 시작 소리
const createStartSound = () => {
  const synth = createSynth();
  const now = Tone.now();

  try {
    synth.triggerAttackRelease("C5", "16n", now);
    synth.triggerAttackRelease("E5", "16n", now + 0.1);
    synth.triggerAttackRelease("G5", "16n", now + 0.2);
    synth.triggerAttackRelease("C6", "8n", now + 0.3);
  } catch (error) {
    console.error("Error playing start sound:", error);
  }
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
  synth.triggerAttackRelease("G5", "16n", now);
  synth.triggerAttackRelease("G5", "16n", now + 0.1);
  synth.triggerAttackRelease("C6", "16n", now + 0.2);
  synth.triggerAttackRelease("E6", "16n", now + 0.3);
};

// 키보드 클릭 소리
const createControlKeySound = (change: "CHANGE" | "MAINTAIN") => {
  const synth = new Tone.FMSynth({
    oscillator: {
      type: "pulse",
    },
    envelope: {
      attack: 0.01,
      decay: 0,
      sustain: 0.1,
      release: 0.1,
    },
  }).toDestination();

  const now = Tone.now();

  switch (change) {
    case "CHANGE":
      synth.triggerAttackRelease("C3", "32n", now);
      break;
    case "MAINTAIN":
      synth.triggerAttackRelease("C2", "32n", now);
  }
  synth.volume.value = -8;
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

  try {
    // 메인 멜로디를 위한 신스
    const mainSynth = new Tone.Synth({
      oscillator: {
        type: "square",
      },
      envelope: {
        attack: 0.1,
        decay: 0.1,
        sustain: 0.6,
        release: 0.8,
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
        sustain: 0.2,
        release: 0.2,
      },
    }).toDestination();

    // 볼륨 조절
    mainSynth.volume.value = -15;
    bassSynth.volume.value = -8;

    // 메인 멜로디 패턴
    mainPattern = new Tone.Pattern(
      (time, note) => {
        try {
          mainSynth.triggerAttackRelease(note, "8n", time);
        } catch (error) {
          console.error("Error in main pattern:", error);
        }
      },
      [
        "C4",
        "C4",
        "C4",
        "D4",
        "E4",
        "E4",
        "E4",
        "E4",
        "E4",
        "D4",
        "E4",
        "F4",
        "G4",
        "G4",
        "G4",
        "G4",
      ],
      "up"
    );

    // 베이스 라인 패턴
    bassPattern = new Tone.Pattern(
      (time, note) => {
        try {
          bassSynth.triggerAttackRelease(note, "4n", time);
        } catch (error) {
          console.error("Error in bass pattern:", error);
        }
      },
      ["C3", "G2", "C3", "C2", "G2", "E1", "G2", "G1"],
      "upDown"
    );

    // 패턴 시작
    mainPattern.start(0);
    bassPattern.start(0);
    backgroundMusicSequence = mainPattern;
  } catch (error) {
    console.error("Error creating background music:", error);
    stopBackgroundMusic();
  }
};

// 배경 음악 중지
const stopBackgroundMusic = () => {
  try {
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
  } catch (error) {
    console.error("Error stopping background music:", error);
  }
};

// 게임 효과음 객체
// FIXME: sound muted when mutiple sound occurs
export const gameSounds = {
  init: initTone,
  start: async () => {
    await initTone();
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
  controlKey: createControlKeySound,
};
