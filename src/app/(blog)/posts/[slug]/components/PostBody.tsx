"use client";
import Link from 'next/link';
import React, { ReactNode } from 'react'
import { FaRegCheckCircle } from 'react-icons/fa';
import { FaRegCopy } from 'react-icons/fa6';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CopyButton = ({ code }: { code: string }) => {
    const [copied, setCopied] = React.useState(false);

    React.useEffect(() => {
        if (copied) {
            const timeout = setTimeout(() => setCopied(false), 2000);
            return () => clearTimeout(timeout);
        }
    }, [copied]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className="ml-2 transition-opacity duration-200 hover:text-white rounded text-white/80 text-xs font-medium shadow-sm"
            title="Copy code"
        >

            {copied ? <span>
                <FaRegCheckCircle className="inline-block mr-1" />
                Copied!
            </span> : <span>
                <FaRegCopy className="inline-block mr-1" />
                Copy
            </span>
            }
        </button>
    );
};

interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
    inline?: boolean;
    className?: string;
    children?: ReactNode; // make optional
}
// Custom code block component
const CodeBlock = ({ inline, className, children, ...props }: CodeBlockProps) => {
    const match = /language-(\w+)/.exec(className || '');
    let language = match ? match[1] : '';
    if (language === 'js') language = 'javascript';
    if (language === 'ts') language = 'typescript';
    if (language === 'py') language = 'python';

    const codeString = React.Children.toArray(children).join('').replace(/\n$/, '');

    if (inline) {
        return (
            <code className="px-1.5 py-0.5 rounded bg-white/5 text-[#ff6b6b] text-sm" {...props}>
                {children}
            </code>
        );
    }

    return (
        <div className="group my-6 bg-slate-900 rounded-lg overflow-hidden p-2">
            <div className="flex w-full justify-between text-xs text-white/40 font-mono px-3 items-center">
                <span>
                    {language || 'code'}
                </span>
                <CopyButton code={codeString} />
            </div>
            <SyntaxHighlighter
                language={language || 'text'}

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                style={darcula as any}
                customStyle={
                    {
                        backgroundColor: "transparent",
                    }
                }
                {...props}
            >
                {codeString}
            </SyntaxHighlighter>
        </div>
    );
};
export default function PostBody({ body_markdown }: { body_markdown: string }) {
    return (
        <ReactMarkdown
            components={{
                code: CodeBlock,
                a: ({ children, href, ...props }) => {
                    // Handle internal links
                    const isInternal = href?.startsWith('/posts');
                    if (isInternal) {
                        return <Link href={href as string} {...props}>{children}</Link>;
                    }
                    return (
                        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                            {children}
                        </a>
                    );
                },
            }}
        >
            {body_markdown}
        </ReactMarkdown>
    )
}
