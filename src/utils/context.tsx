import React, { Dispatch, SetStateAction } from 'react';
import { TypeSetState } from './type';

interface defoultValueContextProgress {
  setProgress: TypeSetState<boolean>;
  progress: boolean;
}

interface IShadowContext {
  setColorShadow: TypeSetState<string>;
  colorShadow: string;
}

export const ContextProgress = React.createContext<defoultValueContextProgress>({
  setProgress: () => {},
  progress: false,
});

export const ContextColorShadow = React.createContext<IShadowContext>({
  setColorShadow: () => {},
  colorShadow: '',
});
