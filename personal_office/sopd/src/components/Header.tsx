import React from "react";
import '../constants/colors.css';
import '../styles/Header.css';
import Logo from "./Logo";
import { Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

function Header() {
    return (
        <div className="header-wrapper">
            <Logo></Logo>
            <Button className="exit-btn" title="Выход" color="primary">
                <LogoutIcon></LogoutIcon>
                Выход
            </Button>
        </div>
    )
}

export default Header;