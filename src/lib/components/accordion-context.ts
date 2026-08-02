export interface AccordionContext {
	isOpen: (itemValue: string) => boolean;
	toggle: (itemValue: string) => void;
}

export const accordionContextKey = Symbol('iv-accordion');
