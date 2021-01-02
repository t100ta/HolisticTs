const videoElement: HTMLVideoElement | null = document.querySelector(
  ".input_video"
);

const canvasElement: HTMLCanvasElement | null = document.querySelector(
  ".output_canvas"
);

const canvasCtx:
  | CanvasRenderingContext2D
  | null
  | undefined = canvasElement?.getContext("2d");

function onResults(results: any) {
  const width: number = canvasElement?.width ?? 0;
  const height: number = canvasElement?.height ?? 0;

  canvasCtx?.save();
  canvasCtx?.clearRect(0, 0, width, height);
  canvasCtx?.drawImage(results.image, 0, 0, width, height);

  // eslint-disable-next-line
  // @ts-ignore
  drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
    color: "#00FF00",
    lineWidth: 4,
  });

  // eslint-disable-next-line
  // @ts-ignore
  drawLandmarks(canvasCtx, results.poseLandmarks, {
    color: "#FF0000",
    lineWidth: 2,
  });

  // eslint-disable-next-line
  // @ts-ignore
  drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_TESSELATION, {
    color: "#C0C0C070",
    lineWidth: 1,
  });

  // eslint-disable-next-line
  // @ts-ignore
  drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS, {
    color: "#CC0000",
    lineWidth: 5,
  });

  // eslint-disable-next-line
  // @ts-ignore
  drawLandmarks(canvasCtx, results.leftHandLandmarks, {
    color: "#00FF00",
    lineWidth: 2,
  });

  // eslint-disable-next-line
  // @ts-ignore
  drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS, {
    color: "#00CC00",
    lineWidth: 5,
  });

  // eslint-disable-next-line
  // @ts-ignore
  drawLandmarks(canvasCtx, results.rightHandLandmarks, {
    color: "#FF0000",
    lineWidth: 2,
  });
  canvasCtx?.restore();
}

// eslint-disable-next-line
// @ts-ignore
const holistic: any = new Holistic({
  locateFile: (file: string) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
  },
});

holistic?.setOptions({
  upperBodyOnly: false,
  smoothLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});
holistic.onResults(onResults);

// eslint-disable-next-line
// @ts-ignore
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await holistic.send({ image: videoElement });
  },
  width: 1280,
  height: 720,
});
camera.start();
