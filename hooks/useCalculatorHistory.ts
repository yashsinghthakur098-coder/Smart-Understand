import { useCalculatorStore } from '@/stores/calculatorStore';

export const useCalculatorHistory = () => {
  const history = useCalculatorStore((state) => state.history);
  const addToHistory = useCalculatorStore((state) => state.addToHistory);
  const clearHistory = useCalculatorStore((state) => state.clearHistory);

  return {
    history,
    addToHistory,
    clearHistory,
  };
};
