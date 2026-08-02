export interface TabsContext {
	uid: string;
	size: 'sm' | 'md';
	bordered: boolean;
	isActive: (value: string) => boolean;
	select: (value: string) => void;
}

export const tabsContextKey = Symbol('iv-tabs');
