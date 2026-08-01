import { writable } from 'svelte/store';
import type { DialogState } from '../types';

export const dialogState = writable<DialogState | null>(null);

export function showDialog(message: string, onconfirm: () => void, oncancel: () => void) {
	dialogState.set({ message, onconfirm, oncancel });
}
