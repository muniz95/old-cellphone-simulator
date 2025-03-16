import en from './en';
import pt from './pt';

export type ResourcesType = keyof typeof en;

const resources = {
  en,
  pt,
};

export default resources;
