import React from "react";
import '../constants/colors.css';
import '../styles/Header.css';
import Logo from "./Logo";
import { Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { resetData, upload } from "@/features/form_data/userSlice";

function Header() {
    const navigate = useNavigate();
    const data = useSelector((state: RootState) => state.data);
    const dispatch = useDispatch();
    
    const logout = () => {
        dispatch(resetData());
        navigate('/');
    }
    return (
        <div className="header-wrapper">
            <Logo></Logo>
            <Button className="exit-btn" title="Выход" color="primary" onClick={logout}>
                <LogoutIcon></LogoutIcon>
                Выход
            </Button>
        </div>
    )
}

export default Header;