import React, { useState } from 'react';
import '../../styles/MainPage.css';
import Header from '../Header';
import Queries from './Queries';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SettingsIcon from '@mui/icons-material/Settings';
import Edit from './Edit';

function MainPage() {
    const [currentPage, setCurPage] = useState('queries');
    const handleToggleButton = (event: React.MouseEvent<HTMLElement>, newPage: React.SetStateAction<string> | null) => {
        if (newPage != null) {
            setCurPage(newPage);
        }
    }
    const statusProfile = "Менеджер";
    return (
        <div className="main-page">
            <header>
                <Header></Header>
            </header>
            <section className="main-content">
                <div className="menu">
                    <section className='statusbar'>
                        <p>Статус профиля: <span className='status'>{statusProfile}</span></p>
                    </section>
                    <nav>
                        <ToggleButtonGroup orientation='vertical' value={currentPage} exclusive aria-label='navigation'>
                            <ToggleButton className='menu-point'  value='queries' aria-label='queries' onClick={handleToggleButton}>
                                <SendIcon className='icon'></SendIcon>
                                Отправленные
                            </ToggleButton>
                            <ToggleButton className='menu-point' value='edit' aria-label='edit' onClick={handleToggleButton}>
                                <SettingsIcon className='icon'></SettingsIcon>
                                Редактирование
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </nav>
                </div>
                <div className="content">
                    <div className="content-wrapper">
                        {
                            (() => {
                                switch(currentPage) {
                                    case 'queries': return <Queries></Queries>;
                                    case 'edit': return <Edit></Edit>;
                                }
                            })()
                        }
                    </div>
                </div>
            </section>
        </div>
    );
}

export default MainPage;
