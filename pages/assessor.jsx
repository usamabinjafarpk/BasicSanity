// pages/assessor.js
import React from 'react'
import { useState } from 'react';

export default function Adm() {
    const [url, setUrl] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/assessorcheck', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url, username, password }),
            });
            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error testing the URL.');
        }
    };
    const downloadImages = async () => {
        // const imageUrl = '/screenshot1.png';

        try {
            for (let i = 1; i < 7; i++) {
                const link = document.createElement('a');
                link.href = `/screenshot${i}.png`;
                link.download = `/screenshot${i}.png`;
                link.click();
            }

        } catch (error) {
            console.error('Error downloading image:', error);
            alert('Failed to download the image. Please check your internet connection.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter a website URL"
                    required
                />
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                />
                <button type="submit">Test URL</button>
            </form>
            {message && <p>{message}</p>}
            {message=="Screenshots taken" ? <button onClick={downloadImages}>Download</button>:""}
        </div>
    );
}
