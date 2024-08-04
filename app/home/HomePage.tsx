'use client';
import { useState } from 'react';

import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/header/Header';
import MicrophoneAccess from 'app/components/microphone-access';
import ScreamCapture from 'app/components/scream-capture';
import TextDisplay from 'app/components/text-display';



/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */
export default function HomePage() {
  // const account = useAccount();

  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [text, setText] = useState<string>('');

  const handlePermissionGranted = (stream: MediaStream) => {
    setAudioStream(stream);
  };

  const handleScreamDetected = (generatedText: string) => {
    setText(generatedText);
  };

  return (
    <>
      <Header />
      <main className="container mx-auto flex flex-col px-8 py-16">
        <MicrophoneAccess onPermissionGranted={handlePermissionGranted} />
        {audioStream && (
          <ScreamCapture audioStream={audioStream} onScreamDetected={handleScreamDetected} />
        )}
        <TextDisplay text={text} />
      </main>
      <Footer />
    </>
  );
}
