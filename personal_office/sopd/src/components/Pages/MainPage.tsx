import React, { useState } from 'react';
import '../../styles/MainPage.css';
import Header from '../Header';
import Queries from './Queries';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import Edit from './Edit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';

function MainPage() {
    const [currentPage, setCurPage] = useState('queries');
    const handleToggleButton = (event: React.MouseEvent<HTMLElement>, newPage: React.SetStateAction<string> | null) => {
        if (newPage != null) {
            setCurPage(newPage);
        }
    }
    const data = useSelector((state: RootState) => state.data);
    const dispatch = useDispatch();

    const statusProfile = data.status === 'admin' ? 'Администратор' : 'Менеджер';
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
                            {data.status === 'admin' && (
                                <ToggleButton className='menu-point' value='edit' aria-label='edit' onClick={handleToggleButton}>
                                    <EditDocumentIcon className='icon'></EditDocumentIcon>
                                    Редактирование
                                </ToggleButton>
                            )}
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
