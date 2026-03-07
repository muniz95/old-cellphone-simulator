import { ComponentType, ReactNode } from 'react';
import { RouteObject } from 'react-router-dom';

export interface ModuleMenuEntry {
  path: string;
  titleKey: string;
  namespace?: string;
}

export interface FeatureModule {
  id: string;
  basePath: string;
  routes: RouteObject[];
  registerMenuEntry?: () => ModuleMenuEntry[];
  Provider?: ComponentType<{ children: ReactNode }>;
}
