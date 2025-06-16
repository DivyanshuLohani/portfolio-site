"use client";
import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

export const N8NChat = ({ webhookUrl }: Readonly<{ webhookUrl: string }>) => {
    useEffect(() => {
        createChat({
            webhookUrl,
        });
    }, [webhookUrl]);

    return <style>
        {`
        :root {
	--chat--color-primary: #222222;
	--chat--color-primary-shade-50: #db4061;
	--chat--color-primary-shade-100: #dddddd;
	--chat--color-secondary: #20b69e;
	--chat--color-secondary-shade-50: #1ca08a;
	--chat--color-white: #000000;
	--chat--color-light: #1a1a1a;
	--chat--color-light-shade-50: #262626;
	--chat--color-light-shade-100: #333333;
	--chat--color-medium: #404040;
	--chat--color-dark: #000000;
	--chat--color-disabled: #666666;
	--chat--color-typing: #ffffff;

	--chat--spacing: 1rem;
	--chat--border-radius: 0.25rem;
	--chat--transition-duration: 0.15s;

	--chat--window--width: 400px;
	--chat--window--height: 600px;

	--chat--header-height: auto;
	--chat--header--padding: var(--chat--spacing);
	--chat--header--background: var(--chat--color-dark);
	--chat--header--color: #ffffff;
	--chat--header--border-top: none;
	--chat--header--border-bottom: none;
	--chat--header--border-bottom: none;
	--chat--header--border-bottom: none;
	--chat--heading--font-size: 2em;
	--chat--header--color: #ffffff;
	--chat--subtitle--font-size: inherit;
	--chat--subtitle--line-height: 1.8;

	--chat--textarea--height: 50px;
    --chat--body--background: #000000;

	--chat--message--font-size: 0.8rem;
	--chat--message--padding: var(--chat--spacing);
	--chat--message--border-radius: var(--chat--border-radius);
	--chat--message-line-height: 1.8;
	--chat--message--bot--background: #111827;
	--chat--message--bot--color: #ffffff;
	--chat--message--bot--border: none;
	--chat--message--user--background: #ffffff;
	--chat--message--user--color: #000000;
	--chat--message--user--border: none;
	--chat--message--pre--background: rgba(255, 255, 255, 0.1);

	--chat--toggle--background: #ffffff;
	--chat--toggle--hover--background: #fafafa;
	--chat--toggle--active--background: var(--chat--color-primary-shade-100);
	--chat--toggle--color: var(--chat--color-white);
	--chat--toggle--size: 64px;
}
        `}
    </style>;
};