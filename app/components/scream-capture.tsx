/* eslint-disable @typescript-eslint/consistent-type-definitions */
// components/ScreamCapture.tsx
import { useEffect, useRef } from 'react';

interface ScreamCaptureProps {
    audioStream: MediaStream | null;
    onScreamDetected: (text: string) => void;
}

function ScreamCapture({ audioStream, onScreamDetected }: ScreamCaptureProps) {
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const dataArrayRef = useRef<Uint8Array | null>(null);

    useEffect(() => {
        if (audioStream) {
            audioContextRef.current = new (window.AudioContext || window.AudioContext)();
            const source = audioContextRef.current.createMediaStreamSource(audioStream);
            analyserRef.current = audioContextRef.current.createAnalyser();
            source.connect(analyserRef.current);

            analyserRef.current.fftSize = 2048;
            const bufferLength = analyserRef.current.frequencyBinCount;
            dataArrayRef.current = new Uint8Array(bufferLength);

            const detectScream = () => {
                if (analyserRef.current && dataArrayRef.current) {
                    analyserRef.current.getByteTimeDomainData(dataArrayRef.current);
                    const screamDetected = dataArrayRef.current.some((value) => value > 200);
                    if (screamDetected) {
                        onScreamDetected('Screaming detected!');
                    }
                }
                requestAnimationFrame(detectScream);
            };

            detectScream();
        }
    }, [audioStream, onScreamDetected]);

    return null; // This component doesn't render anything visible
}

export default ScreamCapture;
