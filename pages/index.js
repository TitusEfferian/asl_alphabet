import { memo, useEffect, useRef, useState } from "react"
import '@tensorflow/tfjs';
import * as automl from '@tensorflow/tfjs-automl';

const frame = (video, model, setPredictions) => {
  model.classify(video).then(prediction => {
    setPredictions(prediction);
    requestAnimationFrame(() => {
      frame(video, model, setPredictions)
    })
  })
}

const arrayOfColors = [
  'bg-red-300',
  'bg-yellow-300',
  'bg-green-300',
  'bg-blue-300',
  'bg-indigo-300',
  'bg-purple-300',
  'bg-pink-300',
  'bg-red-300',
  'bg-yellow-300',
  'bg-green-300',
  'bg-blue-300',
  'bg-indigo-300',
  'bg-purple-300',
  'bg-pink-300',
  'bg-red-300',
  'bg-yellow-300',
  'bg-green-300',
  'bg-blue-300',
  'bg-indigo-300',
  'bg-purple-300',
  'bg-pink-300',
  'bg-red-300',
  'bg-yellow-300',
  'bg-green-300',
  'bg-blue-300',
  'bg-indigo-300',
  'bg-purple-300',
  'bg-pink-300',

]

const Home = () => {
  const videoRef = useRef();
  const [predictions, setPredictions] = useState([]);
  useEffect(() => {
    const initAutoML = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({
            audio: false,
            video: {
              facingMode: "user"
            }
          })
          .then(stream => {
            window.stream = stream;
            videoRef.current.srcObject = stream;
          });
      }
    }
    initAutoML();
  }, [])
  console.log(predictions)
  return (
    <div className="w-full max-w-xl mx-auto pb-4">
      <video
        onLoadedMetadata={async () => {
          const model = await automl.loadImageClassification('model.json');
          frame(videoRef.current, model, setPredictions);
        }}
        autoPlay
        playsInline
        muted
        ref={videoRef}
        width="350"
        height="350"
        className="mx-auto"
      />
      <div className="mt-2 pl-2 pr-2">
        <div className="w-full rounded shadow border border-px border-gray-300 bg-white p-2">
          {
            predictions.map((x, y) => {
              return (
                <div style={{
                  width: `${Math.round(x.prob * 100)}%`
                }} className={arrayOfColors[y]}>
                  {x.label}
                </div>
              )
            })
          }
        </div>
      </div>

    </div>
  )
}

export default memo(Home);