import { Colors } from './theme';

export type ButtonType = 'number' | 'operator' | 'function' | 'action';

export interface CalculatorButtonConfig {
  label: string;
  value: string;
  type: ButtonType;
  gridSpan?: number;
}

export const MAIN_KEYPAD: CalculatorButtonConfig[][] = [
  [
    { label: 'C', value: 'clear', type: 'action' },
    { label: 'Del', value: 'delete', type: 'action' },
    { label: '%', value: '%', type: 'function' },
    { label: '÷', value: '/', type: 'operator' },
  ],
  [
    { label: '7', value: '7', type: 'number' },
    { label: '8', value: '8', type: 'number' },
    { label: '9', value: '9', type: 'number' },
    { label: '×', value: '*', type: 'operator' },
  ],
  [
    { label: '4', value: '4', type: 'number' },
    { label: '5', value: '5', type: 'number' },
    { label: '6', value: '6', type: 'number' },
    { label: '-', value: '-', type: 'operator' },
  ],
  [
    { label: '1', value: '1', type: 'number' },
    { label: '2', value: '2', type: 'number' },
    { label: '3', value: '3', type: 'number' },
    { label: '+', value: '+', type: 'operator' },
  ],
  [
    { label: '0', value: '0', type: 'number' },
    { label: '.', value: '.', type: 'number' },
    { label: '(', value: '(', type: 'function' },
    { label: ')', value: ')', type: 'function' },
  ],
  [
     { label: '=', value: '=', type: 'operator', gridSpan: 4 },
  ]
];

export const SCIENTIFIC_KEYPAD: CalculatorButtonConfig[][] = [
  [
    { label: 'sin', value: 'sin(', type: 'function' },
    { label: 'cos', value: 'cos(', type: 'function' },
    { label: 'tan', value: 'tan(', type: 'function' },
    { label: '%', value: '%', type: 'function' },
  ],
  [
    { label: 'log', value: 'log(', type: 'function' },
    { label: 'ln', value: 'ln(', type: 'function' },
    { label: 'x²', value: '^2', type: 'function' },
    { label: 'x³', value: '^3', type: 'function' },
  ],
  [
    { label: '√', value: 'sqrt(', type: 'function' },
    { label: '∛', value: 'cbrt(', type: 'function' },
    { label: 'xʸ', value: '^', type: 'function' },
    { label: '!', value: '!', type: 'function' },
  ],
  [
    { label: 'π', value: 'Math.PI', type: 'number' },
    { label: 'e', value: 'Math.E', type: 'number' },
    { label: 'Exp', value: 'E', type: 'function' },
    { label: '(', value: '(', type: 'function' },
  ],
];

export const MEMORY_BUTTONS: CalculatorButtonConfig[] = [
  { label: 'MC', value: 'MC', type: 'action' },
  { label: 'MR', value: 'MR', type: 'action' },
  { label: 'M+', value: 'M+', type: 'action' },
  { label: 'M-', value: 'M-', type: 'action' },
];
