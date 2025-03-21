'use client'
import React, { useState, useEffect, useRef } from "react";

// Chatbot Component
const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<{ sender: string; message: string; source?: string }[]>([])
    const [userMessage, setUserMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const toggleChat = () => setIsOpen(!isOpen)

    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSendMessage = async (event: React.FormEvent) => {
        event.preventDefault()
        if (userMessage.trim()) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'You', message: userMessage },
            ])
            setUserMessage('')
            getBotResponse(userMessage)
        }
    }

    const getBotResponse = async (userMessage: string) => {
        setIsLoading(true)

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [{ role: 'user', content: userMessage }],
                    category: 'Botswana Indigenous Knowledge',
                }),
            })

            const data = await response.json()

            if (response.ok) {
                // Handle case where data.message might be an object with content
                const botMessage = typeof data.message === 'object' && data.message.content 
                    ? data.message.content 
                    : data.message || 'No content received'
                const source = data.source || 'No source available'

                setMessages((prevMessages) => [
                    ...prevMessages,
                    { sender: 'AI', message: botMessage, source },
                ])
            } else {
                console.error('API Error:', data)
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { sender: 'AI', message: "Sorry, I couldn't process that request." },
                ])
            }
        } catch (error) {
            console.error('Error fetching AI response:', error)
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'AI', message: 'An error occurred. Please try again.' },
            ])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <button
                id="openChatBtn"
                className="fixed bottom-2 right-2 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-black hover:bg-gray-700 m-0 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900 overflow-y-auto"
                type="button"
                onClick={toggleChat}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white block border-gray-200 align-middle"
                >
                    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" className="border-gray-200" />
                </svg>
            </button>

            {/* Chat Modal */}
            {isOpen && (
                <div
                    id="chatContainer"
                    className="fixed bottom-[calc(3.5rem)] right-9 mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] md:w-[400px] md:h-[550px] w-[440px] h-[634px]"
                >
                    <div className="flex flex-col space-y-1.5 pb-6">
                        <h2 className="font-semibold text-lg tracking-tight">Kitso Ai</h2>
                        <p className="text-sm text-[#6b7280] leading-3">Powered by openAi and KitsoAi</p>
                    </div>

                    <div
                        id="chatMessages"
                        className="pr-4 md:h-[405px] h-[474px] overflow-y-auto"
                    >
                        {messages.map((message, index) => (
                            <div key={index} className="flex gap-3 my-4 text-sm flex-1">
                                <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                                    <div className="rounded-full bg-gray-100 border p-1">
                                        <svg
                                            stroke="none"
                                            fill="black"
                                            strokeWidth="1.5"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                            height="20"
                                            width="20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                                            />
                                        </svg>
                                    </div>
                                </span>
                                <p className="leading-relaxed">
                                    <span className="block font-bold text-gray-700">{message.sender}</span>
                                    {message.message}
                                    {message.source && (
                                        <span className="block text-xs text-gray-500 mt-2">Source: {message.source}</span>
                                    )}
                                </p>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="flex items-center pt-0">
                        <form
                            id="chatForm"
                            className="flex items-center justify-center w-full space-x-2"
                            onSubmit={handleSendMessage}
                        >
                            <input
                                id="userMessage"
                                className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
                                placeholder="Type your message"
                                value={userMessage}
                                onChange={(e) => setUserMessage(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                className="bg-[#000] text-white font-semibold px-4 py-2 rounded-lg"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Sending...' : 'Send'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chatbot;