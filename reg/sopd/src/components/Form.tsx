import React, { ChangeEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { TextField, MenuItem, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { IMaskInput } from 'react-imask';
import { ru } from 'date-fns/locale';
import Logo from './Logo';
import '../styles/Form.css';
import { update } from '../features/form_data/slice';

interface FormState {
  surname: string;
  name: string;
  midName?: string;
  dateOfBirth: Date | null;
  phoneNumber: string; 
  email: string;
}

interface FormProps {
  onFormSubmit: () => void; // Колбэк, который вызовется при успешном сабмите
}

function Form({ onFormSubmit }: FormProps) {
    const [formData, setFormData] = useState<FormState>({
        surname: '',
        name: '',
        midName: '',
        dateOfBirth: null,
        phoneNumber: '',
        email: ''
    });

    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
    const data = useSelector((state: RootState) => state.data);
    const dispatch = useDispatch();

    const [countryCode, setCountryCode] = useState('+7');

    const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const handleDateChange = (date: Date | null) => {
        setFormData(prev => ({
            ...prev,
            dateOfBirth: date
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (validateForm()) {
            dispatch(update({
                ...formData,
                // Преобразуем телефон в число (если нужно)
                phoneNumber: countryCode + formData.phoneNumber,
                // Преобразуем дату (если null - текущая дата)
                dateOfBirth: formData.dateOfBirth || new Date(),
            }));
            console.log(formData);
            onFormSubmit();
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof FormState, string>> = {};

        const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\-]+$/;
        
        if (!formData.surname.trim()) {
            newErrors.surname = 'Введите фамилию';
        } else if (!nameRegex.test(formData.surname)) {
            newErrors.surname = 'Фамилия содержит недопустимые символы';
        }

        if (!formData.name.trim()) {
            newErrors.name = 'Введите имя';
        } else if (!nameRegex.test(formData.name)) {
            newErrors.name = 'Имя содержит недопустимые символы';
        }

        if (formData.midName && !nameRegex.test(formData.midName)) {
            newErrors.midName = 'Отчество содержит недопустимые символы';
        }

        if (!formData.dateOfBirth) {
            newErrors.dateOfBirth = 'Укажите дату рождения';
        } else if (formData.dateOfBirth > new Date()) {
            newErrors.dateOfBirth = 'Дата рождения не может быть в будущем';
        } else {
            const minDate = new Date();
            minDate.setFullYear(minDate.getFullYear() - 120);
            if (formData.dateOfBirth < minDate) {
            newErrors.dateOfBirth = 'Укажите реальную дату рождения';
            }
        }
        console.log((countryCode+formData.phoneNumber).trim());
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Введите номер телефона';
        } else if (formData.phoneNumber.replace(/\D/g, '').length < 10 && countryCode === '+7') {
            newErrors.phoneNumber = 'Номер слишком короткий';
        } else if (formData.phoneNumber.replace(/\D/g, '').length < 9 && countryCode === '+375') {
            newErrors.phoneNumber = 'Номер слишком короткий';
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
        const popularDomains = [
            'gmail.com',
            'yandex.ru',
            'mail.ru',
            'ya.ru',
            'rambler.ru',
            'outlook.com',
            'hotmail.com',
            'icloud.com'
        ];
        
        if (!formData.email.trim()) {
            newErrors.email = 'Введите email';
        } else {
            if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Некорректный формат email';
            } else {
            const domain = formData.email.split('@')[1];
            if (!popularDomains.some(d => domain.includes(d))) {
                newErrors.email = 'Используйте популярный почтовый сервис';
            }
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

  return (
    <form action="" onSubmit={handleSubmit}>
        <Logo></Logo>
        <TextField 
            id="outlined-basic" 
            label="Фамилия" 
            value={formData.surname}
            error={!!errors.surname}
            helperText={errors.surname}
            onChange={handleChange('surname')}
            classes={{
                root: 'text-field-root first-input-field',
            }}
            required
            variant="outlined" />
        <TextField 
            id="outlined-basic" 
            label="Имя" 
            value={formData.name}
            error={!!errors.name}
            helperText={errors.name}
            onChange={handleChange('name')}
            classes={{
                root: 'text-field-root',
            }}
            required
            variant="outlined" />
        <TextField 
            id="outlined-basic" 
            label="Отчество (при наличии)" 
            value={formData.midName}
            error={!!errors.midName}
            helperText={errors.midName}
            onChange={handleChange('midName')}
            classes={{
                root: 'text-field-root',
            }}
            variant="outlined" />
        <LocalizationProvider 
            dateAdapter={AdapterDateFns} 
            adapterLocale={ru} 
        >
            <DatePicker
                label="Дата рождения"
                value={formData.dateOfBirth}
                onChange={handleDateChange}
                slotProps={{
                    textField: {
                        required: true,
                        className: "my-custom-picker",
                        error: !!errors.dateOfBirth,
                        helperText: errors.dateOfBirth
                    }
                }}
            />
        </LocalizationProvider>
        <TextField
            label="Номер телефона"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange('phoneNumber')}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
            required
            classes={{ root: 'text-field-root' }}
            InputProps={{
                startAdornment: (
                    <TextField
                        select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        sx={{ width: '120px', mr: 1 }}
                        className="country-code-selector"
                    >
                        {/* Коды стран с флагами */}
                        <MenuItem value="+7">+7 🇷🇺</MenuItem>
                        <MenuItem value="+375">+375 🇧🇾</MenuItem>
                    </TextField>
                ),
                inputComponent: IMaskInput,
                inputProps: {
                    // Маска ввода в зависимости от кода страны
                    mask: countryCode === '+7' ? '(000) 000-00-00' : // Россия
                        countryCode === '+375' ? '(00) 000-00-00' : // Беларусь
                        '0000 000000', // Дефолтная маска (на всякий случай)
                    definitions: {
                        '0': /[0-9]/ // Разрешаем только цифры
                    }
                },
            }}
            fullWidth
        />  
        <TextField
            required
            type='email'
            label="Email"
            variant="outlined"
            value={formData.email}
            onChange={handleChange('email')}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            classes={{
                root: 'text-field-root',
            }}
        />
        <Button className='button-submit' type='submit' sx={{ textTransform: 'none' }} variant="contained">Продолжить</Button>
    </form>
  );
}

export default Form;
