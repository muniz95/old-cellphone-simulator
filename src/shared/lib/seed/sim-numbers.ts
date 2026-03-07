import { generateId } from '../helpers';

const simNumbers = [
  {
    id: generateId(),
    date: Date.now(),
    name: 'Provider',
    number: 100,
    message: 'This is your provider.',
  },
  {
    id: generateId(),
    date: Date.now(),
    name: 'P.O. Box',
    number: 222,
    message: 'You have a voice message.',
  },
];

export default simNumbers;
