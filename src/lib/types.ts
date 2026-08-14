export type ToastType = 'success' | 'info' | 'error';

export interface ToastState {
	id: number;
	message: string;
	type: ToastType;
}

export interface AlertDialogAction {
	label: string;
	variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
	size?: 'sm' | 'md' | 'lg';
	disabled?: boolean;
	closeOnClick?: boolean;
	onClick?: () => void;
}

export interface AlertDialogState {
	title?: string;
	message?: string;
	actions?: AlertDialogAction[];
	closeOnBackdrop?: boolean;
	closeOnEscape?: boolean;
	onclose?: () => void;
}
