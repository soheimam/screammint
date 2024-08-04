/* eslint-disable @typescript-eslint/consistent-type-definitions */
// components/TextDisplay.tsx

interface TextDisplayProps {
    text: string;
}

function TextDisplay({ text }: TextDisplayProps) {
    return (
        <div className="text-center mt-4">
            <h1 className="text-4xl font-bold">{text}</h1>
        </div>
    );
}

export default TextDisplay;
