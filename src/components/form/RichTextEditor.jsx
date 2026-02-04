import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

// Register custom font sizes
const Size = Quill.import('attributors/style/size')
Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px', '24px', '30px', '36px']
Quill.register(Size, true)

const RichTextEditor = ({ value, onChange, placeholder, error, label, disabled = false }) => {
    const editorRef = useRef(null)
    const quillRef = useRef(null)
    const isInitialized = useRef(false)

    useEffect(() => {
        if (!editorRef.current || isInitialized.current) return

        isInitialized.current = true

        // Initialize Quill
        const quill = new Quill(editorRef.current, {
            theme: 'snow',
            placeholder: placeholder || 'Enter text...',
            modules: {
                toolbar: disabled ? false : [
                    ['bold', 'italic', 'underline'],
                    [{ 'size': ['10px', '12px', '14px', '16px', '18px', '20px', '24px', '30px', '36px'] }],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    [{ 'align': [] }],
                    [{ 'indent': '-1'}, { 'indent': '+1' }],
                    ['clean']
                ]
            },
            readOnly: disabled
        })

        quillRef.current = quill

        // Set default font size
        quill.format('size', '14px')

        // Set initial value
        if (value) {
            quill.clipboard.dangerouslyPasteHTML(value)
        }

        // Handle changes
        quill.on('text-change', () => {
            const html = quill.root.innerHTML
            if (onChange) {
                onChange(html)
            }
        })
    }, [])

    // Update content when value changes externally
    useEffect(() => {
        if (quillRef.current && value !== quillRef.current.root.innerHTML) {
            const quill = quillRef.current
            const selection = quill.getSelection()
            quill.clipboard.dangerouslyPasteHTML(value || '')
            if (selection) {
                quill.setSelection(selection)
            }
        }
    }, [value])

    // Handle disabled state changes
    useEffect(() => {
        if (quillRef.current) {
            quillRef.current.enable(!disabled)
        }
    }, [disabled])

    return (
        <div>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}
            <style>{`
                .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="10px"]::before,
                .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="10px"]::before {
                    content: '10px';
                }
                .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="12px"]::before,
                .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="12px"]::before {
                    content: '12px';
                }
                .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="14px"]::before,
                .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="14px"]::before {
                    content: '14px';
                }
                .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="16px"]::before,
                .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="16px"]::before {
                    content: '16px';
                }
                .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="18px"]::before,
                .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="18px"]::before {
                    content: '18px';
                }
                .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="20px"]::before,
                .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="20px"]::before {
                    content: '20px';
                }
                .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="24px"]::before,
                .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="24px"]::before {
                    content: '24px';
                }
                .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="30px"]::before,
                .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="30px"]::before {
                    content: '30px';
                }
                .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="36px"]::before,
                .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="36px"]::before {
                    content: '36px';
                }
            `}</style>
            <div 
                ref={editorRef} 
                className={`bg-white border border-gray-300 rounded-b-lg ${disabled ? 'opacity-75 cursor-not-allowed' : ''}`}
                style={{ height: '350px', overflow: 'auto' }}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    )
}

RichTextEditor.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool
}

export default RichTextEditor
