import React from 'react';
import "../App.css";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const projects = () => {
        navigate("/");
    };

    return (
        <header>
            <div className="header-left">
                Kanban Board
            </div>
            <div className="header-right">
              
            </div>
        </header>
    );
}

export default Header;
