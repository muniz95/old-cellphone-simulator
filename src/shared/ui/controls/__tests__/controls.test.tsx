import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  UiButton,
  UiSlider,
  UiTextArea,
  UiTextInput,
} from '@/shared/ui/controls';

describe('ui controls', () => {
  it('forwards native button props and click events', () => {
    const onClick = vi.fn();
    const { getByRole } = render(
      <UiButton aria-label="save action" onClick={onClick} disabled={false}>
        Save
      </UiButton>
    );

    const button = getByRole('button', { name: /save action/i });
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('forwards text input props and change event', () => {
    const onChange = vi.fn();
    const { getByRole } = render(
      <UiTextInput aria-label="name" value="John" onChange={onChange} />
    );

    const input = getByRole('textbox', { name: /name/i });
    fireEvent.change(input, { target: { value: 'Jane' } });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('forwards textarea props', () => {
    const { getByRole } = render(
      <UiTextArea aria-label="calculator" value="1+1" readOnly />
    );

    const textarea = getByRole('textbox', { name: /calculator/i });
    expect((textarea as HTMLTextAreaElement).value).toBe('1+1');
  });

  it('forwards slider attrs and change events', () => {
    const onChange = vi.fn();
    const { getByRole } = render(
      <UiSlider
        aria-label="volume"
        min={0}
        max={100}
        step={10}
        value={50}
        onChange={onChange}
      />
    );

    const slider = getByRole('slider', { name: /volume/i });
    fireEvent.change(slider, { target: { value: '40', valueAsNumber: 40 } });

    expect(slider.getAttribute('min')).toBe('0');
    expect(slider.getAttribute('max')).toBe('100');
    expect(slider.getAttribute('step')).toBe('10');
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
