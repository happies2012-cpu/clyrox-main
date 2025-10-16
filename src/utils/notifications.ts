import toast from 'react-hot-toast';

export interface NotificationOptions {
  duration?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  icon?: React.ReactNode;
  id?: string;
}

export class NotificationManager {
  static success(message: string, options: NotificationOptions = {}) {
    return toast.success(message, {
      duration: options.duration || 5000,
      position: options.position || 'top-right',
      id: options.id,
    });
  }

  static error(message: string, options: NotificationOptions = {}) {
    return toast.error(message, {
      duration: options.duration || 5000,
      position: options.position || 'top-right',
      id: options.id,
    });
  }

  static warning(message: string, options: NotificationOptions = {}) {
    return toast(message, {
      duration: options.duration || 5000,
      position: options.position || 'top-right',
      icon: options.icon || '⚠️',
      style: {
        background: 'rgba(202, 138, 4, 0.9)',
        color: '#fffbeb',
        border: '1px solid rgba(161, 98, 7, 0.7)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        padding: '16px',
      },
      id: options.id,
    });
  }

  static info(message: string, options: NotificationOptions = {}) {
    return toast(message, {
      duration: options.duration || 5000,
      position: options.position || 'top-right',
      icon: options.icon || 'ℹ️',
      style: {
        background: 'rgba(59, 130, 246, 0.9)',
        color: '#eff6ff',
        border: '1px solid rgba(37, 99, 235, 0.7)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        padding: '16px',
      },
      id: options.id,
    });
  }

  static loading(message: string, options: NotificationOptions = {}) {
    return toast.loading(message, {
      duration: options.duration || Infinity,
      position: options.position || 'top-right',
      id: options.id,
    });
  }

  static dismiss(toastId?: string) {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  }

  static promise<T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    },
    options: NotificationOptions = {}
  ) {
    return toast.promise(
      promise,
      {
        loading: messages.loading,
        success: messages.success,
        error: messages.error,
      },
      {
        duration: options.duration,
        position: options.position || 'top-right',
        id: options.id,
      }
    );
  }
}

// Predefined notification templates
export const notify = {
  success: {
    save: () => NotificationManager.success('Changes saved successfully!'),
    delete: () => NotificationManager.success('Item deleted successfully!'),
    create: () => NotificationManager.success('Item created successfully!'),
    update: () => NotificationManager.success('Item updated successfully!'),
    send: () => NotificationManager.success('Message sent successfully!'),
  },
  error: {
    save: () => NotificationManager.error('Failed to save changes. Please try again.'),
    delete: () => NotificationManager.error('Failed to delete item. Please try again.'),
    create: () => NotificationManager.error('Failed to create item. Please try again.'),
    update: () => NotificationManager.error('Failed to update item. Please try again.'),
    load: () => NotificationManager.error('Failed to load data. Please try again.'),
    network: () => NotificationManager.error('Network error. Please check your connection.'),
    unauthorized: () => NotificationManager.error('Unauthorized access. Please log in.'),
    validation: (message: string) => NotificationManager.error(message),
  },
  warning: {
    confirm: () => NotificationManager.warning('Please confirm this action before proceeding.'),
    limit: () => NotificationManager.warning('You have reached the limit for this feature.'),
    incomplete: () => NotificationManager.warning('Please complete all required fields.'),
  },
  info: {
    reminder: (message: string) => NotificationManager.info(message),
    tip: (message: string) => NotificationManager.info(message),
  },
  loading: {
    saving: () => NotificationManager.loading('Saving changes...'),
    deleting: () => NotificationManager.loading('Deleting item...'),
    creating: () => NotificationManager.loading('Creating item...'),
    updating: () => NotificationManager.loading('Updating item...'),
    loading: () => NotificationManager.loading('Loading data...'),
  }
};