import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
import {  Visibility, VisibilityOff } from '@mui/icons-material';
import Logo from '../Logo';
import '../../styles/FormAuth.css';
import { isLogin, upload } from '../../features/form_data/userSlice';
import { useNavigate } from 'react-router-dom';

interface FormState {
  login: string;
  password: string;
}

function Form() {
    const navigate = useNavigate();

    const [formAuthData, setFormAuthData] = useState<FormState>({
        login: '',
        password: '',
    });

    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

    const data = useSelector((state: RootState) => state.data);
    const dispatch = useDispatch();

    const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormAuthData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (validateForm()) {
            dispatch(upload({
                ...formAuthData,
            }));
            dispatch(isLogin(true));
            console.log(formAuthData);
            navigate('/lk');
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof FormState, string>> = {};

        const login = "tim";
        const password = "1233";
        
        if (!formAuthData.login.trim()) {
            newErrors.login = 'Введите логин';
        } else if (formAuthData.login != login) {
            newErrors.password = 'Неверный логин или пароль';
        }

        if (!formAuthData.password.trim()) {
            newErrors.password = 'Введите пароль';
        } else if (formAuthData.password != password) {
            newErrors.password = 'Неверный логин или пароль';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

  return (
    <form action="" onSubmit={handleSubmit} className='auth-form'>
        <Logo></Logo>
        <TextField 
        id="outlined-basic" 
        label="Логин" 
        value={formAuthData.login}
        error={!!errors.login}
        helperText={errors.login}
        onChange={handleChange('login')}
        classes={{
            root: 'text-field-root first-input-field',
        }}
        required
        variant="outlined" />
        <TextField
            id="outlined-password"
            label="Пароль"
            type={showPassword ? 'text' : 'password'}
            value={formAuthData.password}
            error={!!errors.password}
            helperText={errors.password}
            onChange={handleChange('password')}
            required
            variant="outlined"
            className="text-field-root"
            InputProps={{
                endAdornment: (
                <InputAdornment position="end">
                    <IconButton
                    className='icon-eye'
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                ),
            }}
        />
        
        <Button className='button-submit' type='submit' sx={{ textTransform: 'none' }} variant="contained">Войти</Button>
    </form>
  );
}

export default Form;