import { writable } from 'svelte/store';
import type { AlertDialogState } from '../types.js';

export const alertDialogState = writable<AlertDialogState | null>(null);

export function showAlertDialog(config: AlertDialogState) {
	alertDialogState.set(config);
}
