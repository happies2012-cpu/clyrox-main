import { useState, useRef } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Image, 
  Link, 
  Quote, 
  Code, 
  Minus,
  Youtube,
  FileText
} from 'lucide-react';

interface ContentEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function ContentEditor({ 
  value, 
  onChange, 
  placeholder = 'Start typing...',
  className = ''
}: ContentEditorProps) {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertText = (text: string) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    const newValue = value.substring(0, start) + text + value.substring(end);
    onChange(newValue);
    
    // Set cursor position after inserted text
    setTimeout(() => {
      if (textareaRef.current) {
        const newCursorPos = start + text.length;
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
        textareaRef.current.focus();
      }
    }, 0);
  };

  const formatText = (prefix: string, suffix: string = prefix) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    // If no text is selected, insert the prefix and suffix with cursor in between
    if (start === end) {
      const newValue = value.substring(0, start) + prefix + suffix + value.substring(end);
      onChange(newValue);
      
      // Set cursor between prefix and suffix
      setTimeout(() => {
        if (textareaRef.current) {
          const newCursorPos = start + prefix.length;
          textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
          textareaRef.current.focus();
        }
      }, 0);
    } else {
      // If text is selected, wrap it with prefix and suffix
      const selectedText = value.substring(start, end);
      const newValue = value.substring(0, start) + prefix + selectedText + suffix + value.substring(end);
      onChange(newValue);
      
      // Set selection around the wrapped text
      setTimeout(() => {
        if (textareaRef.current) {
          const newStart = start + prefix.length;
          const newEnd = newStart + selectedText.length;
          textareaRef.current.setSelectionRange(newStart, newEnd);
          textareaRef.current.focus();
        }
      }, 0);
    }
  };

  const toolbarActions = [
    { icon: Bold, action: () => formatText('**', '**'), title: 'Bold' },
    { icon: Italic, action: () => formatText('*', '*'), title: 'Italic' },
    { icon: Underline, action: () => formatText('__', '__'), title: 'Underline' },
    { icon: Quote, action: () => formatText('> '), title: 'Quote' },
    { icon: Code, action: () => formatText('`', '`'), title: 'Code' },
    { icon: Link, action: () => formatText('[', '](url)'), title: 'Link' },
    { icon: Image, action: () => formatText('![', '](image-url)'), title: 'Image' },
    { icon: List, action: () => insertText('\n- '), title: 'Bullet List' },
    { icon: ListOrdered, action: () => insertText('\n1. '), title: 'Numbered List' },
    { icon: Minus, action: () => insertText('\n---\n'), title: 'Horizontal Rule' },
  ];

  return (
    <div className={`border border-white/20 rounded-xl overflow-hidden ${className}`}>
      <div className="bg-white/5 border-b border-white/10 p-2 flex flex-wrap gap-1">
        {toolbarActions.map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            className="p-2 rounded-lg hover:bg-white/10 transition-all text-white/70 hover:text-white"
            title={item.title}
            type="button"
          >
            <item.icon className="w-4 h-4" />
          </button>
        ))}
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="w-full bg-transparent text-white placeholder-white/50 px-4 py-3 min-h-[200px] focus:outline-none resize-none"
      />
      {isFocused && (
        <div className="bg-white/5 border-t border-white/10 px-4 py-2 text-xs text-white/50">
          Use Markdown for formatting. Press Tab for autocomplete.
        </div>
      )}
    </div>
  );
}