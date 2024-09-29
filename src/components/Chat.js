import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { marked } from 'marked';

const Chat = () => {
    const endRef = useRef(null);
    const location = useLocation();
    const { artist } = location.state || {};

    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    const userId = Cookies.get('userId');

    const createMarkup = (html) => {
        return { __html: marked(html) };
    };

    useEffect(() => {
        if (artist) {
            const fetchChatHistory = async () => {
                try {
                    const response = await axios.post('http://localhost:5000/api/chat/history', {
                        artistId: artist.id
                    }, {
                        headers: {
                            cookie: userId
                        }
                    });
                    setMessages(response.data.messages);
                } catch (error) {
                    console.error("Error fetching chat history:", error);
                }
            };

            fetchChatHistory();
        }
    }, [artist, userId]);

    // Scroll to the bottom when messages change
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const compressImage = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const MAX_WIDTH = 800; // Set your desired width
                    const scaleSize = MAX_WIDTH / img.width;
                    canvas.width = MAX_WIDTH;
                    canvas.height = img.height * scaleSize;

                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    const dataUrl = canvas.toDataURL('image/jpeg', 0.7); // Adjust quality here
                    resolve(dataUrl);
                };
            };
            reader.readAsDataURL(file);
        });
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!inputMessage && !image) return;

        try {
            const base64Image = image ? await compressImage(image) : null;

            const response = await axios.post('http://localhost:5000/api/chat', {
                message: inputMessage,
                artistId: artist.id,
                artistName: artist.name,
                genre: artist.genre,
                image: base64Image
            }, {
                headers: {
                    userId: userId
                }
            });

            const responseData = response.data || {};
            const responseMessage = responseData.response || "No response from the AI.";

            setMessages(prevMessages => [
                ...prevMessages,
                { userMessage: inputMessage },
                { aiResponse: responseMessage }
            ]);
            setInputMessage('');
            setImage(null);
            setImagePreview('');
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            handleSendMessage(e);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handlePaste = (e) => {
        const items = e.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.kind === 'file') {
                const file = item.getAsFile();
                if (file) {
                    setImage(file);
                    setImagePreview(URL.createObjectURL(file));
                }
            }
        }
    };

    return (
        <div className="bg-black min-h-[85vh] flex flex-col p-4">
            <div className="overflow-y-auto flex-grow mb-4">
                {messages.map((msg, index) => (
                    <div key={index} className="mb-2 flex flex-col justify-between">
                        {msg.userMessage && (
                            <div className="flex justify-end">
                                <div className="bg-lightBlue text-navyBlue font-semibold p-2 rounded-xl max-w-2xl mb-5">
                                    {msg.userMessage}
                                </div>
                            </div>
                        )}
                        {msg.aiResponse && (
                            <div className="flex justify-start">
                                <div className="bg-white text-navyBlue font-semibold p-2 rounded-xl max-w-2xl mb-5">
                                    <div dangerouslySetInnerHTML={createMarkup(msg.aiResponse)} />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                <div ref={endRef} />
            </div>

            {imagePreview && (
                <div className="mb-4 max-w-[150px] max-h-[150px]">
                    <img src={imagePreview} alt="Preview" className="w-full h-auto rounded" />
                </div>
            )}

            <div className="relative">
                <form
                    onSubmit={handleSendMessage}
                    className="bg-extraLightGray border border-extraLightBlue rounded-lg p-2 shadow-md w-full"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    <div className="flex items-center border border-extraLightBlue p-3 rounded-lg">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onPaste={handlePaste}
                            placeholder="Type text, or upload, paste, and drag an image here."
                            className="flex-1 p-2 font-semibold placeholder-semibold text-formGray placeholder-formGray focus:outline-none border-0"
                        />
                        <button
                            type="submit"
                            className="flex items-center bg-formBlue text-sm text-white py-2 px-4 rounded-3xl hover:bg-formBlue-600 focus:outline-none"
                        >
                            <span className='pr-2'>Send</span>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.88111 13.5548C8.5262 13.4559 8.34769 13.2089 8.23614 12.8658C7.77988 11.4625 7.30723 10.0645 6.83728 8.66571C6.82234 8.62762 6.81793 8.58623 6.8245 8.54586C6.83108 8.50548 6.84839 8.46762 6.87464 8.43621C7.79607 7.12333 8.71572 5.8092 9.63359 4.49382C9.66681 4.4508 9.69093 4.40148 9.70446 4.34886C9.66921 4.3714 9.63318 4.3928 9.59884 4.41664C8.27796 5.33355 6.9577 6.25135 5.63805 7.17004C5.54268 7.23662 5.46701 7.25239 5.3533 7.21409C3.93111 6.73509 2.50647 6.26336 1.08309 5.78789C0.484504 5.58794 0.314681 4.88272 0.773703 4.4852C0.874803 4.40354 0.9909 4.34237 1.11548 4.30512C2.85859 3.73947 4.6027 3.17688 6.3478 2.61735C8.4045 1.9557 10.4613 1.29428 12.5181 0.633094C12.5287 0.629696 12.5367 0.618391 12.5459 0.610779H12.8239C12.8785 0.630538 12.934 0.64836 12.9877 0.670388C13.2466 0.77663 13.3795 0.986722 13.4558 1.24281V1.49563C13.4364 1.55528 13.4171 1.61494 13.3977 1.6746C12.1993 5.39533 11.0024 9.11653 9.80696 12.8382C9.69499 13.1881 9.52473 13.451 9.15913 13.5548H8.88111Z" fill="white" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Chat;
