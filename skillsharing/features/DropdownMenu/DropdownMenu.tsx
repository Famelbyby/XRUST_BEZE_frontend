import React, { useState } from 'react';
import './DropdownMenu.scss';
import { CapitalizeString } from '../../shared/Functions/FormatStrings';

interface DropdownMenuProps {
    callback: (newSkill: string) => void;
    menu: string[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ callback, menu }) => {
    //const [isChosen, setIsChosen] = useState(false);
    const [input, setInput] = useState('');
    const filteredMenu = menu.filter((item) => item.startsWith(CapitalizeString(input)));

    return (
        <div className="dropdown-menu">
            <input
                className="dropdown-menu__input"
                type="text"
                placeholder="Навык"
                value={input}
                onChange={(event) => {
                    setInput(event.target.value);
                }}
            />
            <div className="dropdown-menu-filtered">
                {filteredMenu.map((item) => {
                    return (
                        <div
                            key={item}
                            className="dropdown-menu-filtered__item"
                            onClick={() => {
                                callback(item);
                                setInput('');
                            }}
                        >
                            {item}
                        </div>
                    );
                })}
                {filteredMenu.length === 0 && (
                    <div className="dropdown-menu-filtered__no-items">Ничего не найдено</div>
                )}
            </div>
        </div>
    );
};

export default DropdownMenu;
