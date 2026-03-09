import styled from 'styled-components';
import { borders, colors } from '@/shared/styles/tokens';

const Button = styled.button`
  background-color: inherit;
  color: ${colors.textPrimary};
  border-top: none;
  border-right: none;
  border-bottom: 1px ${borders.dotted} ${colors.textPrimary};
  border-left: 1px ${borders.dotted} ${colors.textPrimary};
  padding: 2px 6px;
  cursor: pointer;

  &:active,
  &:focus,
  &:focus-visible {
    font-weight: bold;
    background-color: ${colors.focusBackground};
    color: ${colors.textInverse};
  }

  &:disabled {
    cursor: not-allowed;
    color: ${colors.textMuted};
    border-bottom-color: ${colors.borderNeutral};
    border-left-color: ${colors.borderNeutral};
    font-weight: normal;
    background-color: inherit;
  }
`;

const TextInput = styled.input.attrs({ type: 'text' })`
  width: 100%;
  background: inherit;
  color: ${colors.textPrimary};
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px ${borders.dashed} ${colors.textPrimary};
  padding: 2px 4px;
  box-sizing: border-box;

  &:focus,
  &:focus-visible {
    border-bottom-style: solid;
  }

  &:disabled {
    color: ${colors.textMuted};
    border-bottom-color: ${colors.borderNeutral};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 80%;
  resize: none;
  background-color: inherit;
  color: ${colors.textPrimary};
  border-top: none;
  border-right: none;
  border-bottom: 1px ${borders.dotted} ${colors.textPrimary};
  border-left: 1px ${borders.dotted} ${colors.textPrimary};
  box-sizing: border-box;
  padding: 4px;

  &:focus,
  &:focus-visible {
    background-color: ${colors.hoverOverlay};
  }

  &:disabled {
    color: ${colors.textMuted};
    border-bottom-color: ${colors.borderNeutral};
    border-left-color: ${colors.borderNeutral};
  }
`;

const Slider = styled.input.attrs({ type: 'range' })`
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
  width: min(50vw, 280px);

  &::-webkit-slider-runnable-track {
    background: ${colors.sliderTrack};
    border: 1px ${borders.dotted} ${colors.borderDark};
    height: 6px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    margin-top: -6px;
    width: 14px;
    height: 14px;
    background: ${colors.textPrimary};
    border: 2px ${borders.dotted} ${colors.borderDark};
    border-radius: 2px;
  }

  &::-moz-range-track {
    background: ${colors.sliderTrack};
    border: 1px ${borders.dotted} ${colors.borderDark};
    height: 6px;
  }

  &::-moz-range-progress {
    background: ${colors.textPrimary};
    height: 6px;
  }

  &::-moz-range-thumb {
    width: 14px;
    height: 14px;
    background: ${colors.textPrimary};
    border: 2px ${borders.dotted} ${colors.borderDark};
    border-radius: 2px;
  }

  &:focus::-webkit-slider-thumb,
  &:focus-visible::-webkit-slider-thumb,
  &:focus::-moz-range-thumb,
  &:focus-visible::-moz-range-thumb {
    background: ${colors.focusBackground};
    border-color: ${colors.textInverse};
  }

  &:disabled {
    cursor: not-allowed;
  }

  &:disabled::-webkit-slider-runnable-track,
  &:disabled::-moz-range-track {
    background: ${colors.textMuted};
  }

  &:disabled::-webkit-slider-thumb,
  &:disabled::-moz-range-thumb {
    background: ${colors.borderNeutral};
    border-color: ${colors.textMuted};
  }
`;

const S = {
  Button,
  TextInput,
  TextArea,
  Slider,
};

export default S;
