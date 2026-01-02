import { useCalculatorStore } from '@/stores/calculatorStore';

export const useCalculatorMemory = () => {
  const memory = useCalculatorStore((state) => state.memory);
  const memoryAdd = useCalculatorStore((state) => state.memoryAdd);
  const memorySubtract = useCalculatorStore((state) => state.memorySubtract);
  const memoryRecall = useCalculatorStore((state) => state.memoryRecall);
  const memoryClear = useCalculatorStore((state) => state.memoryClear);

  return {
    memory,
    memoryAdd,
    memorySubtract,
    memoryRecall,
    memoryClear,
  };
};
