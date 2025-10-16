import { useState } from 'react';
import ContentEditor from './ContentEditor';
import MediaLibrary from './MediaLibrary';
import { Image, Link as LinkIcon } from 'lucide-react';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'content' | 'image';
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  defaultValue?: any;
}

interface ContentFormProps {
  fields: FormField[];
  initialValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>) => void;
  onCancel: () => void;
  submitLabel?: string;
  isSubmitting?: boolean;
}

export default function ContentForm({
  fields,
  initialValues = {},
  onSubmit,
  onCancel,
  submitLabel = 'Save',
  isSubmitting = false,
}: ContentFormProps) {
  const [values, setValues] = useState<Record<string, any>>(initialValues);
  const [mediaLibraryOpen, setMediaLibraryOpen] = useState(false);
  const [currentContentField, setCurrentContentField] = useState<string | null>(null);

  const handleChange = (name: string, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (name: string, value: string) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleMediaSelect = (url: string) => {
    if (currentContentField) {
      const currentValue = values[currentContentField] || '';
      const newValue = currentValue + `\n![Image](${url})\n`;
      handleContentChange(currentContentField, newValue);
    }
    setMediaLibraryOpen(false);
    setCurrentContentField(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-white mb-2 font-semibold">
              {field.label} {field.required && <span className="text-red-400">*</span>}
            </label>
            
            {field.type === 'text' && (
              <input
                type="text"
                id={field.name}
                value={values[field.name] || field.defaultValue || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                required={field.required}
                placeholder={field.placeholder}
                className="w-full backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-white/50 px-4 py-3 rounded-xl focus:outline-none focus:border-white/40"
              />
            )}
            
            {field.type === 'textarea' && (
              <textarea
                id={field.name}
                value={values[field.name] || field.defaultValue || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                required={field.required}
                placeholder={field.placeholder}
                rows={4}
                className="w-full backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-white/50 px-4 py-3 rounded-xl focus:outline-none focus:border-white/40 resize-none"
              />
            )}
            
            {field.type === 'select' && field.options && (
              <select
                id={field.name}
                value={values[field.name] || field.defaultValue || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                required={field.required}
                className="w-full backdrop-blur-xl bg-white/10 border border-white/20 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-white/40"
              >
                <option value="" className="bg-slate-800">Select an option</option>
                {field.options.map((option) => (
                  <option key={option.value} value={option.value} className="bg-slate-800">
                    {option.label}
                  </option>
                ))}
              </select>
            )}
            
            {field.type === 'checkbox' && (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={field.name}
                  checked={values[field.name] || field.defaultValue || false}
                  onChange={(e) => handleChange(field.name, e.target.checked)}
                  className="w-5 h-5 text-primary bg-slate-800 border-white/20 rounded focus:ring-primary focus:ring-2"
                />
                <label htmlFor={field.name} className="ml-2 text-white/70">
                  {field.placeholder || field.label}
                </label>
              </div>
            )}
            
            {field.type === 'content' && (
              <div className="space-y-2">
                <ContentEditor
                  value={values[field.name] || field.defaultValue || ''}
                  onChange={(value) => handleContentChange(field.name, value)}
                  placeholder={field.placeholder}
                  className="min-h-[300px]"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentContentField(field.name);
                      setMediaLibraryOpen(true);
                    }}
                    className="flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors"
                  >
                    <Image className="w-4 h-4" />
                    Add Image
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const currentValue = values[field.name] || '';
                      const newValue = currentValue + '\n[](url)\n';
                      handleContentChange(field.name, newValue);
                    }}
                    className="flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors"
                  >
                    <LinkIcon className="w-4 h-4" />
                    Add Link
                  </button>
                </div>
              </div>
            )}
            
            {field.type === 'image' && (
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  id={field.name}
                  value={values[field.name] || field.defaultValue || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className="flex-grow backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-white/50 px-4 py-3 rounded-xl focus:outline-none focus:border-white/40"
                />
                <button
                  type="button"
                  onClick={() => {
                    setCurrentContentField(field.name);
                    setMediaLibraryOpen(true);
                  }}
                  className="backdrop-blur-xl bg-white/20 hover:bg-white/30 text-white px-4 py-3 rounded-xl font-semibold transition-all"
                >
                  Browse
                </button>
              </div>
            )}
          </div>
        ))}
        
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="backdrop-blur-xl bg-white text-slate-900 px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : submitLabel}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="backdrop-blur-xl bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
      
      <MediaLibrary
        isOpen={mediaLibraryOpen}
        onClose={() => {
          setMediaLibraryOpen(false);
          setCurrentContentField(null);
        }}
        onMediaSelect={handleMediaSelect}
      />
    </>
  );
}