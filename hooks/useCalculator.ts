import { useCalculatorStore } from '@/stores/calculatorStore';

export const useCalculator = () => {
  const store = useCalculatorStore();
  
  const handleButtonPress = (value: string, type: string) => {
    switch (value) {
      case 'clear':
        store.clear();
        break;
      case 'delete':
        store.deleteLast();
        break;
      case '=':
        store.calculate();
        break;
      case 'MC':
        store.memoryClear();
        break;
      case 'MR':
        store.memoryRecall();
        break;
      case 'M+':
        store.memoryAdd();
        break;
      case 'M-':
        store.memorySubtract();
        break;
      default:
        store.append(value);
        break;
    }
  };

  return {
    ...store,
    handleButtonPress,
  };
};
