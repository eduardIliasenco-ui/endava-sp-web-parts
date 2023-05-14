import React, { PropsWithChildren, useState, ReactElement } from 'react';
import { IIconSelectProps } from './IconSelect.types';
import { IconVariant } from '../../icons/Icon.constants';
import ModalIconSelect from '../ModalIconSelect';

const IconSelect = ({ onSelect, children }: PropsWithChildren<IIconSelectProps>): ReactElement => {
    const [menuOpened, setMenuOpened] = useState(false);

    return (
        <div
            style={{ cursor: 'pointer' }}
            tabIndex={0}
            onClick={!menuOpened && ((event) => {
                event.preventDefault();
                event.stopPropagation();
                setMenuOpened(true);
            })}
            title="Click to change the icon"
        >
            {children}
            {
                menuOpened &&
                (
                    <ModalIconSelect
                        onSelect={(value: typeof IconVariant) => {
                            onSelect?.(value);
                            setMenuOpened(false);
                        }}
                        onClose={() => setMenuOpened(false)}
                    />
                )
            }
        </div>
    );
};

export default IconSelect;