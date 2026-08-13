import '../src/lib/theme/tokens.css';
import '../src/lib/theme/theme.css';
import '../src/lib/theme/base.css';

const parameters = {
	a11y: {
		test: 'error'
	}
};

const decorators = [
	(Story) => {
		document.documentElement.setAttribute('data-theme', 'dark');
		return Story();
	}
];

export { parameters, decorators };
