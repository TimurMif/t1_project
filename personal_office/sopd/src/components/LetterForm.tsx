import React, { useState } from 'react';
import '../styles/LetterForm.css';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Box,
  TextField
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { Editor } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import DOMPurify from 'dompurify';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { upload } from '@/features/send_settings/settingsSlice';

interface LetterProps {
    isOpen: boolean,
    setIsOpen: (value: boolean) => void
}

interface LetterFormData {
  emailSendTo: string,
  emailSendFrom: string, 
  themeLetter: string,
  htmlContent: string,
  sopdContent: string
}

const LetterForm = ({isOpen, setIsOpen}: LetterProps) => {
    const data = useSelector((state: RootState) => state.data);
    const settings = useSelector((state: RootState) => state.settings);
    const dispatch = useDispatch();

    const [sendFormData, setSendFormData] = useState<LetterFormData>({
        emailSendTo: '',
        emailSendFrom: settings.emailSendFrom,
        themeLetter: '',
        htmlContent: settings.htmlContent,
        sopdContent: settings.sopdContent
    });

    const handleChange = (field: keyof LetterFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setSendFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
        dispatch(upload({
            [field]: e.target.value
        }));
    };

    const handleCodeChange = (code: string | undefined) => {
        setSendFormData(prev => ({
            ...prev,
            'htmlContent': code || ""
        }));
        dispatch(upload({
            'htmlContent': code || ""
        }));
    }
    const sanitizedCode = DOMPurify.sanitize(sendFormData.htmlContent);

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            maxWidth="md" // sm, md, lg, xl
            fullWidth // растягивает на всю ширину
            className='letter-dialog'
            BackdropProps={{
            style: {
                backdropFilter: 'blur(5px)', // размытие фона
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }
            }}
        >
            {/* Заголовок с крестиком */}
            <DialogTitle>
                <h2>Письмо</h2>
                <IconButton
                    aria-label="close"
                    className='close-window-button'
                    onClick={() => setIsOpen(false)}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>

            {/* Контент */}
            <DialogContent>
            <Box sx={{ p: 2 }}>
                <form action="" className='editting-form'>
                    {data.status === 'admin' && (
                        <div className='input-edit-place email-place'>
                            <label htmlFor='email-to-send-input' className='label-edit-input'>От кого</label>
                            <TextField
                                id='email-to-send-input'
                                required
                                type='email'
                                label="Email отправителя"
                                variant="outlined"
                                value={sendFormData.emailSendFrom}
                                onChange={handleChange('emailSendFrom')}
                                fullWidth
                                classes={{
                                    root: 'text-field-root edit',
                                }}
                            />
                        </div>
                    )}
                    <div className='input-edit-place email-place'>
                        <label htmlFor='email-to-send-input' className='label-edit-input'>Кому</label>
                        <TextField
                            id='email-to-send-input'
                            required
                            type='email'
                            label="Email получателя"
                            variant="outlined"
                            value={sendFormData.emailSendTo}
                            onChange={handleChange('emailSendTo')}
                            fullWidth
                            classes={{
                                root: 'text-field-root edit',
                            }}
                        />
                    </div>
                    <div className='input-edit-place email-place'>
                        <label htmlFor='email-to-send-input' className='label-edit-input'>Тема</label>
                        <TextField
                            id='email-to-send-input'
                            required
                            type='text'
                            label="Текст темы"
                            variant="outlined"
                            value={sendFormData.themeLetter}
                            onChange={handleChange('themeLetter')}
                            fullWidth
                            classes={{
                                root: 'text-field-root edit',
                            }}
                        />
                    </div>
                    {data.status === 'admin' && (
                        <div className='input-edit-place html-place'>
                            <label htmlFor='email-to-send-input' className='label-edit-input'>Содержимое письма</label>
                            <Editor
                                className='code-editor'
                                theme='vs-dark'
                                height="500px"
                                defaultLanguage="html"
                                value={sendFormData.htmlContent}
                                onChange={handleCodeChange}
                            />
                            <div>
                                <label className='label-edit-input'>Предпросмотр письма</label>
                                <div dangerouslySetInnerHTML={{ __html:  sanitizedCode}} />
                            </div>
                        </div>
                    )}
                    {data.status === 'admin' && (
                        <div className='input-edit-place text-sopd-place'>
                            <label htmlFor='textarea-input' className='label-edit-input'>Текст согласия на обработку персональных данных</label>
                            <TextField
                                id='textarea-input'
                                multiline
                                minRows={6} 
                                maxRows={10} 
                                value={sendFormData.sopdContent}
                                onChange={handleChange('sopdContent')}
                                fullWidth 
                                classes={{
                                    root: 'text-field-root edit',
                                }}
                            />
                        </div>
                    )}
                </form>
            </Box>
            </DialogContent>

            <DialogActions>
            <Button className='cancel-send-form-button' variant='outlined' onClick={() => setIsOpen(false)}>Отмена</Button>
            <Button type='submit' className='accept-send-form-button' variant="contained" onClick={() => setIsOpen(false)}>
                Отправить
            </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LetterForm;
