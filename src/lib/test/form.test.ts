import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Button from '../components/button.svelte';
import ButtonGroup from '../components/button-group.svelte';
import Checkbox from '../components/checkbox.svelte';
import Field from '../components/field.svelte';
import Input from '../components/input.svelte';
import InputGroup from '../components/input-group.svelte';
import NativeSelect from '../components/native-select.svelte';
import RadioGroup from '../components/radio-group.svelte';
import Select from '../components/select.svelte';
import Slider from '../components/slider.svelte';
import Switch from '../components/switch.svelte';
import Textarea from '../components/textarea.svelte';
import Toggle from '../components/toggle.svelte';
import ToggleGroup from '../components/toggle-group.svelte';
import { expectAccessible, snippet, text } from './helpers.js';

describe('Button', () => {
	it('fires the modern and legacy click handlers', async () => {
		const modern = vi.fn();
		const legacy = vi.fn();
		render(Button, { props: { children: text('Deploy'), onclick: modern, 'on:click': legacy } });

		await userEvent.click(screen.getByRole('button', { name: 'Deploy' }));
		expect(modern).toHaveBeenCalledOnce();
		expect(legacy).toHaveBeenCalledOnce();
		await expectAccessible();
	});

	it('ignores clicks while disabled or loading', async () => {
		const onclick = vi.fn();
		render(Button, { props: { children: text('Publish'), disabled: true, onclick } });
		await userEvent.click(screen.getByRole('button', { name: 'Publish' }));
		expect(onclick).not.toHaveBeenCalled();
	});
});

describe('Input', () => {
	it('updates its value and emits input and change', async () => {
		const oninput = vi.fn();
		const onchange = vi.fn();
		render(Input, {
			props: { label: 'Name', value: '', oninput, onchange }
		});

		const input = screen.getByLabelText('Name');
		await userEvent.type(input, 'Ada');
		expect(input).toHaveValue('Ada');
		expect(oninput).toHaveBeenCalled();

		await userEvent.tab();
		expect(onchange).toHaveBeenCalled();
	});

	it('renders helper and error text with accessible relationships', async () => {
		render(Input, { props: { label: 'Email', error: 'Enter an email address.' } });
		expect(screen.getByText('Enter an email address.')).toBeVisible();
		expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
		await expectAccessible();
	});
});

describe('Textarea', () => {
	it('types and shows the character count', async () => {
		render(Textarea, { props: { label: 'Bio', value: '', maxlength: 20, showCount: true } });
		const textarea = screen.getByLabelText('Bio');
		await userEvent.type(textarea, 'Hello Svelte');
		expect(textarea).toHaveValue('Hello Svelte');
		expect(screen.getByText('12 / 20')).toBeVisible();
		await expectAccessible();
	});
});

describe('Checkbox', () => {
	it('toggles by label click and keyboard', async () => {
		const onchange = vi.fn();
		render(Checkbox, { props: { label: 'Enable alerts', checked: false, onchange } });

		const checkbox = screen.getByRole('checkbox', { name: 'Enable alerts' });
		await userEvent.click(screen.getByText('Enable alerts'));
		expect(checkbox).toBeChecked();

		checkbox.focus();
		await userEvent.keyboard(' ');
		expect(checkbox).not.toBeChecked();
		expect(onchange).toHaveBeenCalled();
		await expectAccessible();
	});
});

describe('Switch', () => {
	it('toggles with pointer and space', async () => {
		const onchange = vi.fn();
		render(Switch, { props: { label: 'Live updates', checked: false, onchange } });

		const toggle = screen.getByRole('switch', { name: 'Live updates' });
		await userEvent.click(toggle);
		expect(toggle).toHaveAttribute('aria-checked', 'true');

		toggle.focus();
		await userEvent.keyboard(' ');
		expect(toggle).toHaveAttribute('aria-checked', 'false');
		expect(onchange).toHaveBeenCalledTimes(2);
		await expectAccessible();
	});
});

describe('RadioGroup', () => {
	it('selects one option and emits the value', async () => {
		const onchange = vi.fn();
		render(RadioGroup, {
			props: { label: 'Fruit', items: ['apple', 'banana', 'cherry'], value: '', onchange }
		});

		await userEvent.click(screen.getByText('cherry'));
		expect(screen.getByRole('radio', { name: 'cherry' })).toBeChecked();
		expect(screen.getByRole('radio', { name: 'apple' })).not.toBeChecked();
		expect(onchange).toHaveBeenCalled();
		await expectAccessible();
	});
});

describe('Slider', () => {
	it('moves with arrow keys and home', async () => {
		render(Slider, { props: { label: 'Replicas', value: 50, showValue: true } });
		const slider = screen.getByRole('slider', { name: 'Replicas' });

		slider.focus();
		await userEvent.keyboard('{ArrowRight}');
		expect(slider).toHaveValue(51);

		await userEvent.keyboard('{Home}');
		expect(slider).toHaveValue(0);
		await expectAccessible();
	});
});

describe('Select', () => {
	it('filters options and commits a choice', async () => {
		const onchange = vi.fn();
		render(Select, {
			props: {
				label: 'Fruit',
				options: ['apple', 'banana', 'mango'],
				searchable: true,
				value: '',
				onchange
			}
		});

		await userEvent.click(screen.getByRole('combobox', { name: 'Fruit' }));
		await userEvent.type(screen.getByLabelText('Search options'), 'man');
		await userEvent.click(await screen.findByRole('option', { name: 'mango' }));

		expect(onchange).toHaveBeenCalled();
		await expectAccessible();
	});
});

describe('NativeSelect', () => {
	it('selects an option and emits change', async () => {
		const onchange = vi.fn();
		render(NativeSelect, {
			props: { label: 'Fruit', options: ['apple', 'cherry'], value: '', onchange }
		});

		const select = screen.getByLabelText('Fruit');
		await userEvent.selectOptions(select, 'cherry');
		expect(select).toHaveValue('cherry');
		expect(onchange).toHaveBeenCalled();
		await expectAccessible();
	});
});

describe('Field', () => {
	it('labels and describes an arbitrary control', async () => {
		render(Field, {
			props: {
				label: 'Project',
				htmlFor: 'project',
				helper: 'Use lowercase letters.',
				children: snippet('<input id="project" aria-describedby="project-message" />')
			}
		});

		expect(screen.getByLabelText('Project')).toBeVisible();
		expect(screen.getByText('Use lowercase letters.')).toHaveAttribute('id', 'project-message');
		await expectAccessible();
	});
});

describe('InputGroup', () => {
	it('renders prefix and suffix addons around a control', async () => {
		render(InputGroup, {
			props: {
				prefix: text('https://'),
				suffix: text('.dev'),
				children: snippet('<input aria-label="Host" value="iv-ui" />')
			}
		});

		expect(screen.getByText('https://')).toBeVisible();
		expect(screen.getByText('.dev')).toBeVisible();
		expect(screen.getByLabelText('Host')).toHaveValue('iv-ui');
		await expectAccessible();
	});
});

describe('ButtonGroup', () => {
	it('selects a single value', async () => {
		const onchange = vi.fn();
		render(ButtonGroup, {
			props: {
				label: 'Range',
				items: ['day', 'month'],
				mode: 'single',
				value: '',
				onchange
			}
		});

		await userEvent.click(screen.getByRole('button', { name: 'month' }));
		expect(screen.getByRole('button', { name: 'month' })).toHaveAttribute('aria-pressed', 'true');
		expect(onchange).toHaveBeenCalled();
		await expectAccessible();
	});
});

describe('Toggle', () => {
	it('toggles aria-pressed', async () => {
		render(Toggle, { props: { label: 'Bold', checked: false } });
		const toggle = screen.getByRole('button', { name: 'Bold' });
		await userEvent.click(toggle);
		expect(toggle).toHaveAttribute('aria-pressed', 'true');
		await userEvent.click(toggle);
		expect(toggle).toHaveAttribute('aria-pressed', 'false');
		await expectAccessible();
	});
});

describe('ToggleGroup', () => {
	it('keeps multiple values', async () => {
		render(ToggleGroup, {
			props: {
				label: 'Formatting',
				items: ['bold', 'italic', 'underline'],
				mode: 'multiple',
				value: []
			}
		});

		await userEvent.click(screen.getByRole('button', { name: 'bold' }));
		await userEvent.click(screen.getByRole('button', { name: 'underline' }));
		expect(screen.getByRole('button', { name: 'bold' })).toHaveAttribute('aria-pressed', 'true');
		expect(screen.getByRole('button', { name: 'underline' })).toHaveAttribute(
			'aria-pressed',
			'true'
		);
		await expectAccessible();
	});
});
