import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

// Register custom font sizes
const Size = Quill.import('attributors/style/size')
Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px', '24px', '30px', '36px']
Quill.register(Size, true)

// Register custom fonts
// const Font = Quill.import('attributors/style/font')
// Font.whitelist = ['sans-serif', 'calibri', 'arial', 'times-new-roman', 'courier-new', 'georgia', 'verdana', 'tahoma']
// Quill.register(Font, true)

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
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    // [{ 'font': ['sans-serif', 'calibri', 'arial', 'times-new-roman', 'courier-new', 'georgia', 'verdana', 'tahoma'] }],
                    [{ 'size': ['10px', '12px', '14px', '16px', '18px', '20px', '24px', '30px', '36px'] }],
                    
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'script': 'sub'}, { 'script': 'super' }],
                    
                    [{ 'color': [
                        '#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff',
                        '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff',
                        '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff',
                        '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2',
                        '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466',
                        'custom-color'
                    ] }, { 'background': [
                        '#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff',
                        '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff',
                        '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff',
                        '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2',
                        '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466',
                        'custom-color'
                    ] }],
                    
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
                    [{ 'indent': '-1'}, { 'indent': '+1' }],
                    [{ 'align': [] }],
                    
                    ['blockquote', 'code-block'],
                    ['link'],
                    
                    ['clean']
                ]
            },
            readOnly: disabled
        })

        quillRef.current = quill

        // Disable browser suggestions and spellcheck popups inside the editor.
        quill.root.setAttribute('spellcheck', 'false')
        quill.root.setAttribute('autocomplete', 'off')
        quill.root.setAttribute('autocorrect', 'off')
        quill.root.setAttribute('autocapitalize', 'off')
        quill.root.setAttribute('translate', 'no')
        quill.root.spellcheck = false

        // Add tooltips to toolbar buttons
        const toolbar = quill.getModule('toolbar')
        if (toolbar && toolbar.container) {
            const tooltips = {
                '.ql-header': 'Heading',
                // '.ql-font': 'Font Family',
                '.ql-size': 'Font Size',
                '.ql-bold': 'Bold',
                '.ql-italic': 'Italic',
                '.ql-underline': 'Underline',
                '.ql-strike': 'Strikethrough',
                '.ql-script[value="sub"]': 'Subscript',
                '.ql-script[value="super"]': 'Superscript',
                '.ql-color': 'Text Color',
                '.ql-background': 'Background Color',
                '.ql-list[value="ordered"]': 'Numbered List',
                '.ql-list[value="bullet"]': 'Bullet List',
                '.ql-list[value="check"]': 'Checklist',
                '.ql-indent[value="-1"]': 'Decrease Indent',
                '.ql-indent[value="+1"]': 'Increase Indent',
                '.ql-align': 'Text Alignment',
                '.ql-blockquote': 'Blockquote',
                '.ql-code-block': 'Code Block',
                '.ql-link': 'Insert Link',
                '.ql-clean': 'Remove Formatting'
            }

            Object.keys(tooltips).forEach((selector) => {
                const elements = toolbar.container.querySelectorAll(selector)
                elements.forEach((element) => {
                    element.setAttribute('title', tooltips[selector])
                })
            })
        }

        // Add custom color picker functionality (guard toolbar existence)
        if (toolbar && toolbar.container) {
            const colorPickers = toolbar.container.querySelectorAll('.ql-color, .ql-background')
            colorPickers.forEach((picker) => {
                const isBackground = picker.classList.contains('ql-background')
                const customColorItems = picker.querySelectorAll('.ql-picker-item[data-value="custom-color"]')
                
                customColorItems.forEach((item) => {
                    item.addEventListener('click', function(e) {
                        e.preventDefault()
                        e.stopPropagation()
                        
                        const input = document.createElement('input')
                        input.type = 'color'
                        input.style.position = 'absolute'
                        input.style.opacity = '0'
                        input.style.pointerEvents = 'none'
                        document.body.appendChild(input)
                        
                        input.addEventListener('change', function() {
                            const color = input.value
                            if (isBackground) {
                                quill.format('background', color)
                            } else {
                                quill.format('color', color)
                            }
                            document.body.removeChild(input)
                        })
                        
                        input.addEventListener('blur', function() {
                            setTimeout(() => {
                                if (document.body.contains(input)) {
                                    document.body.removeChild(input)
                                }
                            }, 100)
                        })
                        
                        input.click()
                    })
                })
            })
        }

        // Set default font size
        quill.format('size', '14px')
        // Ensure the toolbar reflects the default size selection on init
        try {
            if (toolbar && typeof toolbar.update === 'function') {
                toolbar.update()
            }
            const sizeLabel = toolbar && toolbar.container && toolbar.container.querySelector && toolbar.container.querySelector('.ql-size .ql-picker-label')
            if (sizeLabel) {
                sizeLabel.setAttribute('data-value', '14px')
            }
        } catch {
            // Non-fatal: if toolbar update fails, editor still works with 14px default
        }

        // Set initial value
        if (value) {
            quill.clipboard.dangerouslyPasteHTML(value)
        }

        // Preserve formatting on new line
        quill.keyboard.addBinding({
            key: 'Enter',
            collapsed: true
        }, function(range) {
            // Get current formats at cursor position
            const currentFormats = quill.getFormat(range.index)
            
            // Keep only inline formats (exclude block-level formats)
            const inlineFormats = {}
            const blockFormats = ['header', 'blockquote', 'list', 'code-block', 'align', 'indent', 'direction']
            
            Object.keys(currentFormats).forEach((format) => {
                if (!blockFormats.includes(format)) {
                    inlineFormats[format] = currentFormats[format]
                }
            })
            
            // Insert newline
            quill.insertText(range.index, '\n', Quill.sources.USER)
            
            // Move cursor to new line
            quill.setSelection(range.index + 1, Quill.sources.SILENT)
            
            // Apply all inline formats at the new cursor position
            Object.keys(inlineFormats).forEach((format) => {
                quill.format(format, inlineFormats[format], Quill.sources.USER)
            })
            
            // Prevent default Enter behavior since we handled it
            return false
        })

        // Update toolbar state when selection changes
        quill.on('selection-change', function(range) {
            if (range) {
                // Force toolbar to update by checking formats at current position
                const toolbar = quill.getModule('toolbar')
                if (toolbar && toolbar.controls) {
                    // Update toolbar button states
                    toolbar.update(range)
                }
            }
        })

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
                .ql-toolbar.ql-snow {
                    border: 1px solid #d1d5db;
                    border-radius: 0.5rem 0.5rem 0 0;
                    background-color: #f9fafb;
                    padding: 12px;
                    display: flex;
                    flex-wrap: wrap;
                    // overflow-x: auto;
                    // overflow-y: hidden;
                    // white-space: nowrap;
                    gap: 8px;
                }
                
                .ql-toolbar.ql-snow .ql-formats {
                    margin-right: 15px;
                    padding-right: 15px;
                    border-right: 1px solid #d1d5db;
                    flex: 0 0 auto;
                }

                .ql-toolbar.ql-snow::-webkit-scrollbar {
                    height: 8px;
                }

                .ql-toolbar.ql-snow::-webkit-scrollbar-track {
                    background: transparent;
                }

                .ql-toolbar.ql-snow::-webkit-scrollbar-thumb {
                    background-color: #d1d5db;
                    border-radius: 9999px;
                }
                
                .ql-toolbar.ql-snow .ql-formats:last-child {
                    border-right: none;
                }
                
                .ql-container.ql-snow {
                    border: 1px solid #d1d5db;
                    // border-top: none;
                    border-radius: 0 0 0.5rem 0.5rem;
                    font-family: inherit;
                }
                
                .ql-toolbar.ql-snow .ql-picker-label {
                    cursor: pointer;
                }
                
                /* .ql-toolbar.ql-snow .ql-picker.ql-font {
                    width: 150px;
                }
                
                .ql-toolbar.ql-snow .ql-picker.ql-font .ql-picker-label {
                    width: 100%;
                }
                
                .ql-toolbar.ql-snow .ql-picker.ql-font .ql-picker-options {
                    width: 100%;
                } */

                // TODO: fix this

                // .ql-picker-options {
                //     width: 100%;
                //     position: relative;
                //     left: 0;
                //     top: 100%;
                //     z-index: 1000 !important;
                // }
                
                .ql-toolbar.ql-snow button {
                    cursor: pointer;
                }
                
                .ql-toolbar.ql-snow button:hover,
                .ql-toolbar.ql-snow .ql-picker-label:hover {
                    color: #2563eb;
                }
                
                .ql-toolbar.ql-snow button:hover .ql-stroke,
                .ql-toolbar.ql-snow .ql-picker-label:hover .ql-stroke {
                    stroke: #2563eb;
                }
                
                .ql-toolbar.ql-snow button:hover .ql-fill,
                .ql-toolbar.ql-snow .ql-picker-label:hover .ql-fill {
                    fill: #2563eb;
                }
                
                .ql-toolbar.ql-snow button.ql-active,
                .ql-toolbar.ql-snow .ql-picker-label.ql-active {
                    color: #2563eb;
                }
                
                .ql-toolbar.ql-snow button.ql-active .ql-stroke,
                .ql-toolbar.ql-snow .ql-picker-label.ql-active .ql-stroke {
                    stroke: #2563eb;
                }
                
                .ql-toolbar.ql-snow button.ql-active .ql-fill,
                .ql-toolbar.ql-snow .ql-picker-label.ql-active .ql-fill {
                    fill: #2563eb;
                }
                
                .ql-editor {
                    min-height: 300px;
                    font-size: 14px;
                    line-height: 1.6;
                }
                
                .ql-editor.ql-blank::before {
                    color: #9ca3af;
                    font-style: normal;
                }
                
                .ql-snow .ql-color-picker .ql-picker-options {
                    padding: 8px;
                    width: 168px;
                }
                
                .ql-snow .ql-color-picker .ql-picker-item {
                    border: 1px solid transparent;
                    height: 20px;
                    width: 20px;
                    margin: 2px;
                }
                
                .ql-snow .ql-color-picker .ql-picker-item:hover {
                    border-color: #333;
                }
                
                .ql-snow .ql-picker.ql-color .ql-picker-item.ql-selected,
                .ql-snow .ql-picker.ql-background .ql-picker-item.ql-selected {
                    border-color: #2563eb;
                }
                
                .ql-snow .ql-picker-item[data-value="custom-color"] {
                    background: linear-gradient(45deg, 
                        red 0%, red 14.28%, 
                        orange 14.28%, orange 28.56%, 
                        yellow 28.56%, yellow 42.84%, 
                        green 42.84%, green 57.12%, 
                        blue 57.12%, blue 71.4%, 
                        indigo 71.4%, indigo 85.68%, 
                        violet 85.68%, violet 100%) !important;
                    position: relative;
                }
                
                .ql-snow .ql-picker-item[data-value="custom-color"]::after {
                    content: '+';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: white;
                    font-weight: bold;
                    font-size: 16px;
                    text-shadow: 0 0 2px black;
                }
                
                /* .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="sans-serif"]::before,
                .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="sans-serif"]::before {
                    content: 'Sans Serif';
                    font-family: sans-serif;
                }
                .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="calibri"]::before,
                .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="calibri"]::before {
                    content: 'Calibri';
                    font-family: Calibri, sans-serif;
                }
                .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="arial"]::before,
                .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="arial"]::before {
                    content: 'Arial';
                    font-family: Arial, sans-serif;
                }
                .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="times-new-roman"]::before,
                .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="times-new-roman"]::before {
                    content: 'Times New Roman';
                    font-family: 'Times New Roman', serif;
                }
                .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="courier-new"]::before,
                .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="courier-new"]::before {
                    content: 'Courier New';
                    font-family: 'Courier New', monospace;
                }
                .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="georgia"]::before,
                .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="georgia"]::before {
                    content: 'Georgia';
                    font-family: Georgia, serif;
                }
                .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="verdana"]::before,
                .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="verdana"]::before {
                    content: 'Verdana';
                    font-family: Verdana, sans-serif;
                }
                .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="tahoma"]::before,
                .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="tahoma"]::before {
                    content: 'Tahoma';
                    font-family: Tahoma, sans-serif;
                } */
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
                /* .ql-font-sans-serif {
                    font-family: sans-serif;
                }
                .ql-font-calibri {
                    font-family: Calibri, sans-serif;
                }
                .ql-font-arial {
                    font-family: Arial, sans-serif;
                }
                .ql-font-times-new-roman {
                    font-family: 'Times New Roman', serif;
                }
                .ql-font-courier-new {
                    font-family: 'Courier New', monospace;
                }
                .ql-font-georgia {
                    font-family: Georgia, serif;
                }
                .ql-font-verdana {
                    font-family: Verdana, sans-serif;
                }
                .ql-font-tahoma {
                    font-family: Tahoma, sans-serif;
                } */
            `}</style>
            <div 
                ref={editorRef} 
                className={`${disabled ? 'opacity-75 cursor-not-allowed' : ''}`}
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
