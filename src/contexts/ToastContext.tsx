// ToastContext.tsx
import {
    FC,
    ReactNode,
    createContext,
    useContext,
    useState,
} from 'react';
import Toast from '../components/common/Toast';

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

interface ToastState {
  message: string;
  type: 'success' | 'error' | undefined;
  show: boolean;
}

export const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<ToastState>({
    message: '',
    type: undefined,
    show: false,
  });

  const showToast = (
    message: string,
    type: 'success' | 'error' = 'success'
  ) => {
    setToast({ message, type, show: true });
    setTimeout(
      () => setToast({ message: '', type: undefined, show: false }),
      3000
    );
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.show && <Toast message={toast.message} type={toast.type} />}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
