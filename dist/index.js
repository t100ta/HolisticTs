"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
const videoElement = document.querySelector(".input_video");
const canvasElement = document.querySelector(".output_canvas");
const canvasCtx =
  canvasElement === null || canvasElement === void 0
    ? void 0
    : canvasElement.getContext("2d");
function onResults(results) {
  var _a, _b;
  const width =
    (_a =
      canvasElement === null || canvasElement === void 0
        ? void 0
        : canvasElement.width) !== null && _a !== void 0
      ? _a
      : 0;
  const height =
    (_b =
      canvasElement === null || canvasElement === void 0
        ? void 0
        : canvasElement.height) !== null && _b !== void 0
      ? _b
      : 0;
  canvasCtx === null || canvasCtx === void 0 ? void 0 : canvasCtx.save();
  canvasCtx === null || canvasCtx === void 0
    ? void 0
    : canvasCtx.clearRect(0, 0, width, height);
  canvasCtx === null || canvasCtx === void 0
    ? void 0
    : canvasCtx.drawImage(results.image, 0, 0, width, height);
  // eslint-disable-next-line
  drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
    color: "#00FF00",
    lineWidth: 4,
  });
  // eslint-disable-next-line
  drawLandmarks(canvasCtx, results.poseLandmarks, {
    color: "#FF0000",
    lineWidth: 2,
  });
  // eslint-disable-next-line
  drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_TESSELATION, {
    color: "#C0C0C070",
    lineWidth: 1,
  });
  // eslint-disable-next-line
  drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS, {
    color: "#CC0000",
    lineWidth: 5,
  });
  // eslint-disable-next-line
  drawLandmarks(canvasCtx, results.leftHandLandmarks, {
    color: "#00FF00",
    lineWidth: 2,
  });
  // eslint-disable-next-line
  drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS, {
    color: "#00CC00",
    lineWidth: 5,
  });
  // eslint-disable-next-line
  drawLandmarks(canvasCtx, results.rightHandLandmarks, {
    color: "#FF0000",
    lineWidth: 2,
  });
  canvasCtx === null || canvasCtx === void 0 ? void 0 : canvasCtx.restore();
}
// eslint-disable-next-line
const holistic = new Holistic({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
  },
});
holistic === null || holistic === void 0
  ? void 0
  : holistic.setOptions({
      upperBodyOnly: false,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
holistic.onResults(onResults);
// eslint-disable-next-line
const camera = new Camera(videoElement, {
  onFrame: () =>
    __awaiter(void 0, void 0, void 0, function* () {
      yield holistic.send({ image: videoElement });
    }),
  width: 1280,
  height: 720,
});
camera.start();
