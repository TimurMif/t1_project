import React from "react";
import '../constants/colors.css';
import '../styles/Header.css';
import Logo from "./Logo";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { resetData, upload } from "@/features/form_data/userSlice";
import { useState } from 'react';
import { Drawer, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SendIcon from '@mui/icons-material/Send';
import EditDocumentIcon from '@mui/icons-material/EditDocument';

interface PageState {
    currentPage: string,
    handleToggleButton: (event: React.MouseEvent<HTMLElement>, newPage: React.SetStateAction<string> | null) => void
}

function Header({currentPage, handleToggleButton}: PageState) {
    const navigate = useNavigate();
    const data = useSelector((state: RootState) => state.data);
    const dispatch = useDispatch();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    
    const logout = () => {
        dispatch(resetData());
        navigate('/');
    }
    return (
        <div className="header-wrapper">
            <div className="main-logo">
                <Logo></Logo>
            </div>
            <Button className="exit-btn" title="Выход" color="primary" onClick={logout}>
                <LogoutIcon></LogoutIcon>
                Выход
            </Button>

            <IconButton
                className="burger-menu"
                color="inherit"
                aria-label="open menu"
                onClick={toggleMenu}
                sx={{ display: { xs: 'block', md: 'none' } }} // показываем только на мобильных
            >
                <MenuIcon className="burger-menu-icon"/>
            </IconButton>

            <Drawer
                className="draw-menu"
                anchor="right"
                open={isMenuOpen}
                onClose={toggleMenu}
                sx={{
                    display: { xs: 'block', md: 'none' }, // только на мобильных
                    '& .MuiDrawer-paper': {
                        width: 250,
                        padding: 2,
                    },
                }}
            >
                <ToggleButtonGroup orientation='vertical' value={currentPage} exclusive aria-label='navigation'>
                    <ToggleButton className='menu-point' value='queries' aria-label='queries' onClick={(e) => { handleToggleButton(e, 'queries'); toggleMenu(); }}>
                        <SendIcon className='icon' />
                        Отправленные
                    </ToggleButton>
                    {data.status === 'admin' && (
                        <ToggleButton className='menu-point' value='edit' aria-label='edit' onClick={(e) => { handleToggleButton(e, 'edit'); toggleMenu(); }}>
                            <EditDocumentIcon className='icon' />
                            Редактирование
                        </ToggleButton>
                    )}
                </ToggleButtonGroup>
                <Button className="exit-btn-mobile" title="Выход" color="primary" onClick={logout}>
                    <LogoutIcon></LogoutIcon>
                    Выход
                </Button>
            </Drawer>  
        </div>
    )
}

export default Header;


