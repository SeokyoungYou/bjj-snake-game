import * as Tone from "tone";

let backgroundMusicSequence: Tone.Pattern<string> | null = null;
let mainPattern: Tone.Pattern<string> | null = null;
let bassPattern: Tone.Pattern<string> | null = null;
let harmonyPattern: Tone.Pattern<string> | null = null;
let drumPattern: Tone.Pattern<string> | null = null;

// 오디오 컨텍스트 상태 관리
let isAudioContextInitialized = false;

// 공통으로 사용할 신스 인스턴스들
let controlSynth: Tone.FMSynth | null = null;
let gameSynth: Tone.FMSynth | null = null;

// Tone.js 초기화
const initTone = async () => {
  try {
    if (!isAudioContextInitialized) {
      await Tone.start();
      await Tone.loaded();
      Tone.Transport.start();

      // 공통 신스 인스턴스 초기화
      controlSynth = new Tone.FMSynth({
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
      controlSynth.volume.value = -8;

      gameSynth = new Tone.FMSynth({
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
      gameSynth.volume.value = -10;

      isAudioContextInitialized = true;
      console.log("Tone.js initialized successfully");
    }
  } catch (error) {
    console.error("Failed to initialize Tone.js:", error);
  }
};

// 게임 시작 소리
const createStartSound = () => {
  if (!gameSynth) return;
  const now = Tone.now();

  try {
    gameSynth.triggerAttackRelease("C5", "16n", now);
    gameSynth.triggerAttackRelease("E5", "16n", now + 0.1);
    gameSynth.triggerAttackRelease("G5", "16n", now + 0.2);
    gameSynth.triggerAttackRelease("C6", "8n", now + 0.3);
  } catch (error) {
    console.error("Error playing start sound:", error);
  }
};

// 먹이 먹기 소리
const createEatSound = () => {
  if (!gameSynth) return;
  const now = Tone.now();

  try {
    gameSynth.triggerAttackRelease("C6", "32n", now);
    gameSynth.triggerAttackRelease("E6", "32n", now + 0.05);
    gameSynth.triggerAttackRelease("G6", "32n", now + 0.1);
  } catch (error) {
    console.error("Error playing eat sound:", error);
  }
};

// 게임 오버 소리
const createGameOverSound = () => {
  if (!gameSynth) return;
  const now = Tone.now();

  try {
    gameSynth.triggerAttackRelease("C4", "8n", now);
    gameSynth.triggerAttackRelease("B3", "8n", now + 0.1);
    gameSynth.triggerAttackRelease("A3", "8n", now + 0.2);
    gameSynth.triggerAttackRelease("G3", "4n", now + 0.3);
  } catch (error) {
    console.error("Error playing game over sound:", error);
  }
};

// 특수 아이템 소리
const createSpecialItemSound = () => {
  if (!gameSynth) return;
  const now = Tone.now();

  try {
    gameSynth.triggerAttackRelease("G5", "16n", now);
    gameSynth.triggerAttackRelease("G5", "16n", now + 0.1);
    gameSynth.triggerAttackRelease("C6", "16n", now + 0.2);
    gameSynth.triggerAttackRelease("E6", "16n", now + 0.3);
  } catch (error) {
    console.error("Error playing special item sound:", error);
  }
};

// 키보드 클릭 소리
const createControlKeySound = (change: "CHANGE" | "MAINTAIN") => {
  if (!controlSynth) return;
  const now = Tone.now();

  try {
    switch (change) {
      case "CHANGE":
        controlSynth.triggerAttackRelease("C3", "32n", now);
        break;
      case "MAINTAIN":
        controlSynth.triggerAttackRelease("C2", "32n", now);
    }
  } catch (error) {
    console.error("Error playing control key sound:", error);
  }
};

// 승급 소리
const createPromotionSound = () => {
  if (!gameSynth) return;
  const now = Tone.now();

  try {
    gameSynth.triggerAttackRelease("C5", "8n", now);
    gameSynth.triggerAttackRelease("E5", "8n", now + 0.1);
    gameSynth.triggerAttackRelease("G5", "8n", now + 0.2);
    gameSynth.triggerAttackRelease("C6", "8n", now + 0.3);
    gameSynth.triggerAttackRelease("E6", "8n", now + 0.4);
    gameSynth.triggerAttackRelease("G6", "8n", now + 0.5);
    gameSynth.triggerAttackRelease("C7", "8n", now + 0.6);
    gameSynth.triggerAttackRelease("E7", "8n", now + 0.7);
    gameSynth.triggerAttackRelease("G7", "8n", now + 0.8);
  } catch (error) {
    console.error("Error playing promotion sound:", error);
  }
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
    // createBackgroundMusic();
  },
  createBackgroundMusic,
  stopBackgroundMusic,
  eat: createEatSound,
  gameOver: () => {
    createGameOverSound();
    // stopBackgroundMusic();
  },
  specialItem: createSpecialItemSound,
  promotion: createPromotionSound,
  controlKey: createControlKeySound,
};
