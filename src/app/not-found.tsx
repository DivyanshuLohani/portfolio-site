"use client"
import { useState, useEffect } from 'react';
import { Home, ArrowLeft, Github, Mail, Instagram, Linkedin } from 'lucide-react';
import Navbar from '@/components/common/Navbar';

export default function NotFoundPage() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [nodes, setNodes] = useState<{
        id: number;
        x: number;
        y: number;
        size: number;
        delay: number;
    }[]>([]);
    const [glitchText, setGlitchText] = useState('404');

    // Generate random network nodes
    useEffect(() => {
        const generateNodes = () => {
            const nodeCount = 15;
            const newNodes = [];
            for (let i = 0; i < nodeCount; i++) {
                newNodes.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 3 + 2,
                    delay: Math.random() * 2,
                });
            }
            setNodes(newNodes);
        };
        generateNodes();
    }, []);

    // Track mouse position for interactive effects
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleMouseMove = (e: any) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Glitch effect for 404 text
    useEffect(() => {
        const glitchChars = ['4', '0', '4', '♦', '●', '▲', '■'];
        const interval = setInterval(() => {
            if (Math.random() < 0.1) {
                const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
                setGlitchText(prev => {
                    const chars = prev.split('');
                    const randomIndex = Math.floor(Math.random() * chars.length);
                    chars[randomIndex] = randomChar;
                    return chars.join('');
                });
                setTimeout(() => setGlitchText('404'), 100);
            }
        }, 200);

        return () => clearInterval(interval);
    }, []);

    const NetworkBackground = () => (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {/* Animated network nodes */}
            {nodes.map((node) => (
                <div
                    key={node.id}
                    className="absolute rounded-full bg-gray-600 opacity-30"
                    style={{
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                        width: `${node.size}px`,
                        height: `${node.size}px`,
                        animation: `float ${3 + node.delay}s ease-in-out infinite alternate`,
                    }}
                />
            ))}

            {/* Connecting lines */}
            {nodes.map((node, i) =>
                nodes.slice(i + 1).map((otherNode, j) => {
                    const distance = Math.sqrt(
                        Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
                    );
                    if (distance < 25) {
                        return (
                            <div
                                key={`${i}-${j}`}
                                className="absolute h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-20"
                                style={{
                                    left: `${Math.min(node.x, otherNode.x)}%`,
                                    top: `${Math.min(node.y, otherNode.y)}%`,
                                    width: `${Math.abs(node.x - otherNode.x)}%`,
                                    transform: `rotate(${Math.atan2(otherNode.y - node.y, otherNode.x - node.x) * 180 / Math.PI}deg)`,
                                    transformOrigin: 'left center',
                                    animation: `pulse ${2 + Math.random()}s ease-in-out infinite`,
                                }}
                            />
                        );
                    }
                    return null;
                })
            )}

            {/* Mouse follower effect */}
            <div
                className="absolute w-64 h-64 rounded-full opacity-5 pointer-events-none transition-all duration-300 ease-out"
                style={{
                    left: `${mousePosition.x}%`,
                    top: `${mousePosition.y}%`,
                    background: 'radial-gradient(circle, rgba(79, 172, 254, 0.1) 0%, transparent 70%)',
                    transform: 'translate(-50%, -50%)',
                }}
            />
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            <NetworkBackground />

            <Navbar />
            {/* Main Content */}
            <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 text-center mt-20">

                {/* Glitch 404 */}
                <div className="relative">
                    <h1 className="text-9xl md:text-[12rem] font-black bg-gradient-to-r from-red-500 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
                        {glitchText}
                    </h1>
                    <div className="absolute inset-0 text-9xl md:text-[12rem] font-black text-white opacity-10 animate-ping">
                        404
                    </div>
                </div>

                {/* Error message */}
                <div className="space-y-4 mb-12">
                    <h2 className="text-2xl md:text-4xl font-bold">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            Page Not Found
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                        Looks like this page got lost in the digital void. Even my advanced algorithms
                        {"couldn't locate what you're looking for. Let's get you back on track!"}
                    </p>
                </div>

                {/* Interactive buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                    <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative flex items-center space-x-2">
                            <Home className="w-5 h-5" />
                            <span>Back to Home</span>
                        </div>
                    </button>

                    <button className="group px-8 py-4 border border-gray-700 rounded-xl font-semibold hover:border-gray-500 transition-all duration-300 hover:bg-gray-900/50" onClick={() => window.history.back()}>
                        <div className="flex items-center space-x-2">
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                            <span>Go Back</span>
                        </div>
                    </button>
                </div>

                {/* Social links */}
                <div className="flex space-x-6">
                    <a href="#" className="p-3 rounded-full bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300 hover:scale-110">
                        <Mail className="w-5 h-5" />
                    </a>
                    <a href="#" className="p-3 rounded-full bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300 hover:scale-110">
                        <Github className="w-5 h-5" />
                    </a>
                    <a href="#" className="p-3 rounded-full bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300 hover:scale-110">
                        <Instagram className="w-5 h-5" />
                    </a>
                    <a href="#" className="p-3 rounded-full bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300 hover:scale-110">
                        <Linkedin className="w-5 h-5" />
                    </a>
                </div>

                {/* Fun Easter egg */}
                <div className="mt-12 opacity-60">
                    <code className="text-sm text-gray-500 font-mono">
                        {"// TODO: Implement quantum page finder 🔍"}
                    </code>
                </div>
            </main>

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }
      `}</style>
        </div>
    );
}