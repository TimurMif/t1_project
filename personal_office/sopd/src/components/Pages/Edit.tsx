import React, { useState } from 'react';
import '../../styles/Edit.css';
import { TextField } from '@mui/material';
import Editor from '@monaco-editor/react';
import DOMPurify from 'dompurify';

interface FormState {
  emailToSend: string;
  htmlContent: string;
  sopdContent: string;
}

function Edit() {
    const [errors, setErrors] = useState<FormState>({
        emailToSend: '',
        htmlContent: '',
        sopdContent: '',
    });

    const [editFormData, setEditFormData] = useState<FormState>({
        emailToSend: '',
        htmlContent: '',
        sopdContent: '',
    });

    const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const handleCodeChange = (code: string | undefined) => {
        setEditFormData(prev => ({
            ...prev,
            'htmlContent': code || ""
        }));
    }
    const sanitizedCode = DOMPurify.sanitize(editFormData.htmlContent);

    return (
        <div className='edit-form-place'>
            <h1>Редактирование формы отправки писем</h1>
            <form action="" className='editting-form'>
                <div className='input-edit-place email-place'>
                    <label htmlFor='email-to-send-input' className='label-edit-input'>Почта для отправки писем</label>
                    <TextField
                        id='email-to-send-input'
                        required
                        type='email'
                        label="Email"
                        variant="outlined"
                        value={editFormData.emailToSend}
                        onChange={handleChange('emailToSend')}
                        error={!!errors.emailToSend}
                        helperText={errors.emailToSend}
                        fullWidth
                        classes={{
                            root: 'text-field-root edit',
                        }}
                    />
                </div>
                <div className='input-edit-place html-place'>
                    <label htmlFor='email-to-send-input' className='label-edit-input'>Редактор письма</label>
                    <Editor
                        height="500px"
                        defaultLanguage="html"
                        value={editFormData.htmlContent}
                        onChange={handleCodeChange}
                    />
                    <div>
                        <label className='label-edit-input'>Предпросмотр письма</label>
                        <div dangerouslySetInnerHTML={{ __html:  sanitizedCode}} />
                    </div>
                </div>
                <div className='input-edit-place text-sopd-place'>
                    <label htmlFor='textarea-input' className='label-edit-input'>Текст согласия на обработку персональных данных</label>
                    <TextField
                        id='textarea-input'
                        label="Многострочный текст"
                        multiline
                        minRows={6} 
                        maxRows={10} 
                        value={editFormData.sopdContent}
                        onChange={handleChange('sopdContent')}
                        fullWidth 
                        classes={{
                            root: 'text-field-root edit',
                        }}
                    />
                </div>
            </form>
        </div>
    );
}

export default Edit;