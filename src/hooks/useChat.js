import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');

export const useChat = (roomId) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (roomId) {
            socket.emit('join_room', roomId);
        }

        socket.on('receive_message', (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.off('receive_message');
        };
    }, [roomId]);

    const sendMessage = (messageData) => {
        socket.emit('send_message', messageData);
    };

    return { messages, sendMessage };
};
