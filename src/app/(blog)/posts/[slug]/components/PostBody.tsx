"use client";

import { Check, Copy } from "lucide-react";
import Link from "next/link";
import React, { type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const CopyButton = ({ code }: { code: string }) => {
	const [copied, setCopied] = React.useState(false);

	React.useEffect(() => {
		if (!copied) return;

		const timeout = setTimeout(() => {
			setCopied(false);
		}, 2000);

		return () => clearTimeout(timeout);
	}, [copied]);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(code);
			setCopied(true);
		} catch (error) {
			console.error("Failed to copy code", error);
		}
	};

	return (
		<button
			type="button"
			onClick={handleCopy}
			className="
        flex
        items-center
        gap-1.5
        text-[10px]
        uppercase
        tracking-[0.1em]
        text-white/30
        transition-colors
        hover:text-white
      "
		>
			{copied ? (
				<>
					<Check size={12} />
					Copied
				</>
			) : (
				<>
					<Copy size={12} />
					Copy
				</>
			)}
		</button>
	);
};

interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
	inline?: boolean;
	className?: string;
	children?: ReactNode;
}

export const CodeBlock = ({
	inline,
	className,
	children,
	...props
}: CodeBlockProps) => {
	const match = /language-(\w+)/.exec(className || "");

	let language = match?.[1] || "";

	if (language === "js") language = "javascript";
	if (language === "ts") language = "typescript";
	if (language === "py") language = "python";

	const codeString = React.Children.toArray(children)
		.join("")
		.replace(/\n$/, "");

	if (inline) {
		return (
			<code
				className="
          rounded
          border
          border-white/10
          bg-white/[0.04]
          px-1.5
          py-0.5
          font-mono
          text-[0.9em]
          text-[#7c9cff]
        "
				{...props}
			>
				{children}
			</code>
		);
	}

	return (
		<div
			className="
        group
        my-10
        overflow-hidden
        border
        border-white/10
        bg-[#080808]
      "
		>
			{/* Code header */}
			<div
				className="
          flex
          items-center
          justify-between
          border-b
          border-white/10
          px-4
          py-3
        "
			>
				<span
					className="
            text-[9px]
            uppercase
            tracking-[0.14em]
            text-white/25
          "
				>
					{language || "code"}
				</span>

				<CopyButton code={codeString} />
			</div>

			<SyntaxHighlighter
				language={language || "text"}
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				style={vscDarkPlus as any}
				customStyle={{
					margin: 0,
					padding: "24px",
					background: "transparent",
					fontSize: "13px",
					lineHeight: "1.8",
				}}
				codeTagProps={{
					style: {
						fontFamily:
							"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
					},
				}}
			>
				{codeString}
			</SyntaxHighlighter>
		</div>
	);
};

export default function PostBody({ body_markdown }: { body_markdown: string }) {
	return (
		<div className="blog-body">
			<ReactMarkdown
				components={{
					code: CodeBlock,

					a: ({ children, href, ...props }) => {
						const isInternal = href?.startsWith("/posts");

						if (isInternal) {
							return (
								<Link href={href as string} className="blog-link" {...props}>
									{children}
								</Link>
							);
						}

						return (
							<a
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								className="blog-link"
								{...props}
							>
								{children}
							</a>
						);
					},

					img: ({ src, alt }) => {
						if (!src) return null;

						return (
							<img
								src={src}
								alt={alt || ""}
								className="
                  my-10
                  w-full
                  border
                  border-white/10
                "
							/>
						);
					},

					blockquote: ({ children }) => (
						<blockquote
							className="
                my-10
                border-l
                border-[#7c9cff]/50
                pl-6
                text-white/50
              "
						>
							{children}
						</blockquote>
					),
				}}
			>
				{body_markdown}
			</ReactMarkdown>
		</div>
	);
}
