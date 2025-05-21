'use client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

export default function ReceivedPage() {
  const [receivedFiles, setReceivedFiles] = useState([]);

  useEffect(() => {
    socket = io('http://localhost:4000');
    const myId = 'user2'; // Receiver's ID
    socket.emit('join', myId);

    socket.on('receive-file', ({ fileData, from }) => {
      setReceivedFiles((prev) => [...prev, { fileData, from }]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Received Files</h1>
      <ul className="list-disc pl-5">
        {receivedFiles.map((file, index) => (
          <li key={index}>
            From <b>{file.from}</b>: <code>{file.fileData}</code>
          </li>
        ))}
      </ul>
    </div>
  );
}
