import React, { useState } from "react";
import '../../styles/Queries.css';
import { Button, FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import LetterForm from "../letterForm";

function Queries() {
    const [sortBy, setSortBy] = useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setSortBy(event.target.value);
    };

    const [openWindow, setOpenWindow] = useState(false);
    return (
        <div className="content-wrapper-1">
            <h1>Отправленные письма</h1>
            <div className="content-place">
                <div className="info">
                    <div>
                        <p className="sort-by">Сортировать по
                            <span>
                                <FormControl>
                                    <Select 
                                        className="selector-sort-by"
                                        value={sortBy}
                                        onChange={handleChange}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                    <MenuItem value="">умолчанию</MenuItem>
                                    <MenuItem value={'status'}>статусу</MenuItem>
                                    <MenuItem value={'name'}>имени</MenuItem>
                                    <MenuItem value={'sername'}>фамилии</MenuItem>
                                    <MenuItem value={'birthday'}>дате рождения</MenuItem>
                                    </Select>
                                </FormControl>
                            </span>
                        </p>
                    </div>
                    <Button className="write-btn" onClick={() => {setOpenWindow(true)}}>
                        <EditIcon></EditIcon>
                        Написать
                    </Button>
                    <LetterForm isOpen={openWindow} setIsOpen={setOpenWindow}></LetterForm>
                </div>
                <div className="table-place">
                    <table>
                        <thead>
                            <tr>
                                <th>Почта получателя</th>
                                <th>Фамилия</th>
                                <th>Имя</th>
                                <th>Отчество</th>
                                <th>Номер телефона</th>
                                <th>Email</th>
                                <th>Статус</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>alexboul@gmail.comsdsvsdvsdvdsvsvsdvsvsdvdsv</td>
                                <td>Бурунов</td>
                                <td>Александр</td>
                                <td>Анатольевич</td>
                                <td>79277587575</td>
                                <td>alexboul@gmail.com</td>
                                <td className={`status ${'Согласие'}`}>Согласие</td>
                            </tr>
                            <tr>
                                <td>miimfort@gmail.com</td>
                                <td>Милезин</td>
                                <td>Кирилл</td>
                                <td>Викторович</td>
                                <td>79278762537</td>
                                <td>fortgold@yandex.ru</td>
                                <td className={`status ${'Согласие'}`}>Согласие</td>
                            </tr>
                            <tr>
                                <td>krosvik@gmail.com</td>
                                <td>Кросова</td>
                                <td>Виктория</td>
                                <td>Андреевна</td>
                                <td>79279809021</td>
                                <td>krosvik@gmail.com</td>
                                <td className={`status ${'Отказ'}`}>Отказ</td>
                            </tr>
                            <tr>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td className={`status ${'Ожидание'}`}>Ожидание</td>
                            </tr>
                            <tr>
                                <td>alexboul@gmail.com</td>
                                <td>Бурунов</td>
                                <td>Александр</td>
                                <td>Анатольевич</td>
                                <td>79277587575</td>
                                <td>alexboul@gmail.com</td>
                                <td className={`status ${'Согласие'}`}>Согласие</td>
                            </tr>
                            <tr>
                                <td>miimfort@gmail.com</td>
                                <td>Милезин</td>
                                <td>Кирилл</td>
                                <td>Викторович</td>
                                <td>79278762537</td>
                                <td>fortgold@yandex.ru</td>
                                <td className={`status ${'Согласие'}`}>Согласие</td>
                            </tr>
                            <tr>
                                <td>krosvik@gmail.com</td>
                                <td>Кросова</td>
                                <td>Виктория</td>
                                <td>Андреевна</td>
                                <td>79279809021</td>
                                <td>krosvik@gmail.com</td>
                                <td className={`status ${'Отказ'}`}>Отказ</td>
                            </tr>
                            <tr>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td className={`status ${'Ожидание'}`}>Ожидание</td>
                            </tr>
                            <tr>
                                <td>alexboul@gmail.com</td>
                                <td>Бурунов</td>
                                <td>Александр</td>
                                <td>Анатольевич</td>
                                <td>79277587575</td>
                                <td>alexboul@gmail.com</td>
                                <td className={`status ${'Согласие'}`}>Согласие</td>
                            </tr>
                            <tr>
                                <td>miimfort@gmail.com</td>
                                <td>Милезин</td>
                                <td>Кирилл</td>
                                <td>Викторович</td>
                                <td>79278762537</td>
                                <td>fortgold@yandex.ru</td>
                                <td className={`status ${'Согласие'}`}>Согласие</td>
                            </tr>
                            <tr>
                                <td>krosvik@gmail.com</td>
                                <td>Кросова</td>
                                <td>Виктория</td>
                                <td>Андреевна</td>
                                <td>79279809021</td>
                                <td>krosvik@gmail.com</td>
                                <td className={`status ${'Отказ'}`}>Отказ</td>
                            </tr>
                            <tr>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td className={`status ${'Ожидание'}`}>Ожидание</td>
                            </tr>
                            <tr>
                                <td>miimfort@gmail.com</td>
                                <td>Милезин</td>
                                <td>Кирилл</td>
                                <td>Викторович</td>
                                <td>79278762537</td>
                                <td>fortgold@yandex.ru</td>
                                <td className={`status ${'Согласие'}`}>Согласие</td>
                            </tr>
                            <tr>
                                <td>krosvik@gmail.com</td>
                                <td>Кросова</td>
                                <td>Виктория</td>
                                <td>Андреевна</td>
                                <td>79279809021</td>
                                <td>krosvik@gmail.com</td>
                                <td className={`status ${'Отказ'}`}>Отказ</td>
                            </tr>
                            <tr>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td className={`status ${'Ожидание'}`}>Ожидание</td>
                            </tr>
                            <tr>
                                <td>miimfort@gmail.com</td>
                                <td>Милезин</td>
                                <td>Кирилл</td>
                                <td>Викторович</td>
                                <td>79278762537</td>
                                <td>fortgold@yandex.ru</td>
                                <td className={`status ${'Согласие'}`}>Согласие</td>
                            </tr>
                            <tr>
                                <td>krosvik@gmail.com</td>
                                <td>Кросова</td>
                                <td>Виктория</td>
                                <td>Андреевна</td>
                                <td>79279809021</td>
                                <td>krosvik@gmail.com</td>
                                <td className={`status ${'Отказ'}`}>Отказ</td>
                            </tr>
                            <tr>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                                <td className={`status ${'Ожидание'}`}>Ожидание</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Queries;