export type ToastType = 'success' | 'info' | 'error';

export interface ToastState {
	id: number;
	message: string;
	type: ToastType;
}

export interface DialogState {
	message: string;
	onconfirm: () => void;
	oncancel: () => void;
}
