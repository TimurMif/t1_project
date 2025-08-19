import React from 'react';
import '../styles/Sopd.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { Button } from '@mui/material';
import Logo from './Logo';
import { update_sopd } from '../features/form_data/slice';

interface EndProps {
  onShowEndPage: () => void; // Колбэк, который вызовется при успешном сабмите
}

function Sopd({ onShowEndPage }: EndProps) {
    const data = useSelector((state: RootState) => state.data);
    const currentData = useSelector((state: RootState) => state.data); 
    const dispatch = useDispatch();

    const handleClickAccept = () => {
        console.log(currentData);
        dispatch(update_sopd(true));
        onShowEndPage();
    };
    const handleClickFault = () => {
        console.log(currentData);
        dispatch(update_sopd(false));
        onShowEndPage();
    };

    return (
        <div className='sopd-place'>
            <Logo></Logo>
            <h1>Соглашение на обработку персональных данных</h1>
            <div className='text-place'>
                <p>ООО «ГК Иннотех» является разработчиком программного обеспечения для собственных нужд и партнеров.
                    При организации разработки программного обеспечения мы обрабатываем персональные данные лиц, приглашаемых к участию и/или участвующих в разработке ПО, включая как потенциальных кандидатов, так и собственных работников, и представителей сторонних подрядчиков.
                    Обработка персональных данных осуществляется на условиях политики конфиденциальности, с которой можно ознакомиться здесь.
                    Для выполнения требований законодательства РФ в области обработки персональных данных, предлагаем Вам дать согласие на обработку персональных данных (см. здесь), нажав соответствующую кнопку ниже.
                </p>
            </div>
            <div className='button-place'>
                <Button size='large' onClick={handleClickAccept} className='button-accept' type='submit' sx={{ textTransform: 'none' }} variant="contained">Согласиться</Button>
                <Button size='large' onClick={handleClickFault} className='button-fault' type='submit' sx={{ textTransform: 'none' }} variant="contained">Отказаться</Button>
            </div>
        </div>
    );
}

export default Sopd;