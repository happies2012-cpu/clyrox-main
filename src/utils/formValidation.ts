export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export class FormValidator {
  private errors: ValidationError[] = [];

  static create(): FormValidator {
    return new FormValidator();
  }

  required(value: string | undefined, fieldName: string, message?: string): FormValidator {
    if (!value || value.trim() === '') {
      this.errors.push({
        field: fieldName,
        message: message || `${fieldName} is required`
      });
    }
    return this;
  }

  email(value: string | undefined, fieldName: string): FormValidator {
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      this.errors.push({
        field: fieldName,
        message: `Please enter a valid email address`
      });
    }
    return this;
  }

  minLength(value: string | undefined, fieldName: string, length: number): FormValidator {
    if (value && value.length < length) {
      this.errors.push({
        field: fieldName,
        message: `${fieldName} must be at least ${length} characters long`
      });
    }
    return this;
  }

  maxLength(value: string | undefined, fieldName: string, length: number): FormValidator {
    if (value && value.length > length) {
      this.errors.push({
        field: fieldName,
        message: `${fieldName} must be no more than ${length} characters long`
      });
    }
    return this;
  }

  pattern(value: string | undefined, fieldName: string, regex: RegExp, message: string): FormValidator {
    if (value && !regex.test(value)) {
      this.errors.push({
        field: fieldName,
        message
      });
    }
    return this;
  }

  custom(value: any, fieldName: string, validator: (value: any) => boolean, message: string): FormValidator {
    if (value && !validator(value)) {
      this.errors.push({
        field: fieldName,
        message
      });
    }
    return this;
  }

  validate(): ValidationResult {
    const result = {
      isValid: this.errors.length === 0,
      errors: [...this.errors]
    };
    this.errors = [];
    return result;
  }
}

// Predefined validators
export const validateEmail = (email: string): ValidationResult => {
  return FormValidator.create()
    .required(email, 'Email')
    .email(email, 'Email')
    .validate();
};

export const validatePassword = (password: string): ValidationResult => {
  return FormValidator.create()
    .required(password, 'Password')
    .minLength(password, 'Password', 6)
    .validate();
};

export const validateName = (name: string): ValidationResult => {
  return FormValidator.create()
    .required(name, 'Name')
    .minLength(name, 'Name', 2)
    .maxLength(name, 'Name', 50)
    .pattern(name, 'Name', /^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes')
    .validate();
};

export const validatePhone = (phone: string): ValidationResult => {
  return FormValidator.create()
    .pattern(phone, 'Phone', /^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number')
    .validate();
};

// Utility to get error message for a specific field
export const getErrorMessage = (errors: ValidationError[], fieldName: string): string | undefined => {
  const error = errors.find(err => err.field === fieldName);
  return error?.message;
};

// Utility to check if a field has an error
export const hasError = (errors: ValidationError[], fieldName: string): boolean => {
  return errors.some(err => err.field === fieldName);
};