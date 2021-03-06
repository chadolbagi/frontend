const WAV_SAMPLE_RATE = 44100;

const ERR_NOT_SUPPORTED = "ERR_NOT_SUPPORTED";
const ERR_PERMISSION_DENIED = "ERR_PERMISSION_DENIED";

export const AudioManagerErrorType = {
  [ERR_NOT_SUPPORTED]: "This environment doesn't support user media.",
  [ERR_PERMISSION_DENIED]: "Permission for microphone is not allowed",
};

export default class AudioManager {
  static _instance;

  // (event: AudioProcessingEvent) => void
  onAudioFragmentHandler;
  audioStream;
  audioContext;
  audioAnalyser;
  stream;

  constructor() {
    this.onAudioFragmentHandler = (_) => {};
  }

  static getInstance = () => {
    if (AudioManager._instance == null) {
      AudioManager._instance = new AudioManager();
    }
    return AudioManager._instance;
  };

  /**
   * Request the permission of a microphone
   *
   * @returns Promise<string>, returns error code when rejected and "Success" when resolved
   */
  requestMicrophonePermission = () => {
    return new Promise((resolve, reject) => {
      // check already obtained
      if (this.audioStream) {
        return resolve();
      }

      // Check compat
      if (!navigator.getUserMedia) {
        console.log("This environment doesn't support user media.");
        reject(ERR_NOT_SUPPORTED);
      }

      navigator.getUserMedia(
        { audio: true },
        (stream) => {
          this.onPermissionAllowed(stream);
          resolve("Success");
        },
        () => {
          console.log("Permission for microphone is not allowed");
          reject(ERR_PERMISSION_DENIED);
        }
      );
    });
  };

  playAudioChunk = (dataChunk) => {
    if (this.audioContext != null) {
      const audioBuffer = this.audioContext.createBuffer(
        1,
        dataChunk.length,
        WAV_SAMPLE_RATE
      );
      audioBuffer.getChannelData(0).set(dataChunk);

      const source = this.audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.audioContext.destination);
      source.start(0);
    }
  };

  close = () => {
    if (this.stream != null) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.audioContext.close();

      this.audioStream = null;
      this.audioContext = null;
      this.audioAnalyser = null;
      this.stream = null;
    }
  };

  /**
   * A handler function that will be executed when an audio stream is obtained.
   *
   * User-defined handler function (onAudioFragmentHandler) will
   * be executed with a channelData(Float32Array) parameter.
   */
  onPermissionAllowed = (stream) => {
    this.stream = stream;

    console.log("Permission for microphone is granted", stream);
    this.audioContext = new AudioContext({ sampleRate: WAV_SAMPLE_RATE });
    this.audioStream = this.audioContext.createMediaStreamSource(stream);

    this.audioAnalyser = this.audioContext.createAnalyser();
    this.audioAnalyser.fftSize = 1024;
    this.audioStream.connect(this.audioAnalyser);

    // const processor = this.audioContext.createScriptProcessor(16384, 1, 1);
    const processor = this.audioContext.createScriptProcessor(4096, 1, 1);
    this.audioStream.connect(processor);
    processor.connect(this.audioContext.destination);

    processor.onaudioprocess = (e) => {
      // e: https://developer.mozilla.org/en-US/docs/Web/API/AudioProcessingEvent
      // We have only 1 channel
      this.onAudioFragmentHandler(e);
    };
  };
}
