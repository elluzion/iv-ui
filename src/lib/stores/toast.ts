import { writable } from 'svelte/store';
import type { ToastState, ToastType } from '../types';

export const toastState = writable<ToastState | null>(null);

let activeToastId = 0;
let activeTimer: ReturnType<typeof setTimeout> | null = null;

export function hideToast(id?: number) {
	if (id !== undefined && id !== activeToastId) {
		return;
	}

	toastState.set(null);

	if (activeTimer) {
		clearTimeout(activeTimer);
		activeTimer = null;
	}
}

export function showToast(message: string, type: ToastType = 'info', durationMs = 5000) {
	activeToastId += 1;
	const id = activeToastId;

	if (activeTimer) {
		clearTimeout(activeTimer);
		activeTimer = null;
	}

	toastState.set({ id, message, type });

	activeTimer = setTimeout(
		() => {
			hideToast(id);
		},
		Math.max(800, durationMs)
	);
}
