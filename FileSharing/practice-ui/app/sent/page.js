'use client';

import { useState, useEffect } from 'react';
import io from 'socket.io-client';

let socket;

export default function SentPage() {
  const [fileData, setFileData] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    socket = io('http://localhost:4000');
    const myId = 'user1'; // Sender's ID
    socket.emit('join', myId);
  }, []);

  const handleSend = () => {
    if (!fileData || !receiverId) return;

    socket.emit('send-file', {
      fileData,
      to: receiverId,
    });

    setStatus('File sent!');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sent Files</h1>
      <input
        type="text"
        placeholder="Receiver ID"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
        className="border p-2 mr-2"
      />
      <input
        type="text"
        placeholder="Enter file content"
        value={fileData}
        onChange={(e) => setFileData(e.target.value)}
        className="border p-2 mr-2"
      />
      <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2">Send</button>
      {status && <p className="mt-4 text-green-600">{status}</p>}
    </div>
  );
}
