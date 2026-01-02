import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { evaluateExpression } from '@/utils/calculatorEngine';

interface HistoryItem {
  expression: string;
  result: string;
  timestamp: number;
}

interface CalculatorState {
  display: string;
  expression: string;
  result: string | null;
  history: HistoryItem[];
  memory: number;
  isScientific: boolean;
  
  // Actions
  setDisplay: (val: string) => void;
  setExpression: (val: string) => void;
  calculate: () => void;
  clear: () => void;
  deleteLast: () => void;
  append: (val: string) => void;
  toggleScientific: () => void;
  
  // Memory Actions
  memoryAdd: () => void;
  memorySubtract: () => void;
  memoryRecall: () => void;
  memoryClear: () => void;
  
  // History Actions
  addToHistory: (expression: string, result: string) => void;
  clearHistory: () => void;
}

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set, get) => ({
      display: '0',
      expression: '',
      result: null,
      history: [],
      memory: 0,
      isScientific: false,

      setDisplay: (display) => set({ display }),
      setExpression: (expression) => set({ expression }),
      
      append: (val) => {
        const { expression, result } = get();
        
        // If there was a previous result and a number is pressed, start new expression
        if (result !== null && !isNaN(parseInt(val))) {
          set({ expression: val, display: val, result: null });
          return;
        }

        // If there was a previous result and an operator is pressed, continue with result
        if (result !== null && isNaN(parseInt(val))) {
            set({ expression: result + val, display: result + val, result: null });
            return;
        }

        const newExpression = expression + val;
        set({ expression: newExpression, display: newExpression });
        
        // Auto-calculate for live feedback if possible
        try {
            // Only auto-calculate if it ends with a number or closing parenthesis
            if (/[\d\)]$/.test(newExpression)) {
                const res = evaluateExpression(newExpression);
                set({ display: res.toString() });
            }
        } catch (e) {
            // Ignore auto-calculation errors
        }
      },

      calculate: () => {
        const { expression } = get();
        if (!expression) return;
        
        try {
          const res = evaluateExpression(expression);
          const resStr = res.toString();
          
          get().addToHistory(expression, resStr);
          
          set({ 
            display: resStr,
            expression: expression, // Keep expression for display
            result: resStr
          });
        } catch (error: any) {
          set({ display: error.message || 'Error', result: null });
        }
      },

      clear: () => set({ display: '0', expression: '', result: null }),

      deleteLast: () => {
        const { expression } = get();
        if (expression.length > 0) {
          const newExpression = expression.slice(0, -1);
          set({ 
            expression: newExpression, 
            display: newExpression || '0',
            result: null 
          });
        }
      },

      toggleScientific: () => set((state) => ({ isScientific: !state.isScientific })),

      // Memory
      memoryAdd: () => {
        const { display, memory } = get();
        const val = parseFloat(display);
        if (!isNaN(val)) {
          set({ memory: memory + val });
        }
      },
      memorySubtract: () => {
        const { display, memory } = get();
        const val = parseFloat(display);
        if (!isNaN(val)) {
          set({ memory: memory - val });
        }
      },
      memoryRecall: () => {
        const { memory } = get();
        set({ display: memory.toString(), expression: memory.toString(), result: null });
      },
      memoryClear: () => set({ memory: 0 }),

      // History
      addToHistory: (expression, result) => {
        const newItem: HistoryItem = {
          expression,
          result,
          timestamp: Date.now(),
        };
        set((state) => ({
          history: [newItem, ...state.history].slice(0, 10),
        }));
      },
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'calculator-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ history: state.history, memory: state.memory }),
    }
  )
);
