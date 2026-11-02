import '@testing-library/svelte/vitest';
import '@testing-library/jest-dom/vitest';
import '../theme/tokens.css';
import '../theme/theme.css';
import '../theme/base.css';
import { afterEach } from 'vitest';
import { alertDialogState } from '../stores/alert-dialog.js';
import { hideToast } from '../stores/toast.js';

// Every component test runs on the dark theme; individual tests can switch it.
document.documentElement.dataset.theme = 'dark';

afterEach(() => {
	hideToast();
	alertDialogState.set(null);
	document.body.style.removeProperty('overflow');
});
