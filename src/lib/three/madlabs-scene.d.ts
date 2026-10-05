// Types for the vendored madlabs-scene.js (see references/obj-animated/README.md).

export type MadlabsObjectKind = 'flask' | 'sun';

/** Click targets: flask → 'flask' | 'token_bitcoin' | 'token_ethereum' | 'chain_link'; sun → 'core' | `agent:${0-4}`. */
export type MadlabsClickTarget = string;

export interface MadlabsObjectOptions {
	kind?: MadlabsObjectKind;
	theme?: 'dark' | 'light';
	/** Idle turntable that resumes 3.5s after a drag. */
	autorotate?: boolean;
	/** Ground shadow opacity. */
	shadow?: number;
	/** Camera distance multiplier; lower makes the object bigger. */
	frame?: number;
	/** Live status line, e.g. "3 tokens · 2 reactions". */
	onStatus?: (text: string) => void;
	/** false under prefers-reduced-motion: a still scene that only animates briefly after interaction. */
	motion?: boolean;
}

export interface MadlabsObjectHandle {
	setTheme(theme: 'dark' | 'light'): void;
	click(target: MadlabsClickTarget): void;
	destroy(): void;
}

export function mountMadlabsObject(container: HTMLElement, opts?: MadlabsObjectOptions): MadlabsObjectHandle;
