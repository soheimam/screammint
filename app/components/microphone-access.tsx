/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useCallback, useState } from 'react';

interface MicrophoneAccessProps {
    onPermissionGranted: (stream: MediaStream) => void;
}


function MicrophoneAccess({ onPermissionGranted }: MicrophoneAccessProps) {
    const [permission, setPermission] = useState<boolean>(false);

    const requestMicrophone = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setPermission(true);
            onPermissionGranted(stream);
        } catch (err) {
            console.error('Microphone access denied', err);
        }
    }, [onPermissionGranted]);

    return (
        <div>
            {!permission ? (
                <button className="rounded-lg p-6 bg-[#87CEFA] hover:bg-[#87CEFA]/80" onClick={requestMicrophone}>Enable Microphone</button>
            ) : (
                <p>Microphone enabled</p>
            )}
        </div>
    )
}

export default MicrophoneAccess
