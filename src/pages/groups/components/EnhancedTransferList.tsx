import React, { useEffect, useState } from 'react';
import {
    List, ListItem, ListItemText, Checkbox, Typography
} from '@mui/material';
import { CustomList, ListContainer, ListTitle, MoveButton, TransferGrid } from '../styles';

interface EnhancedTransferListProps {
    onPermissionsChange: (permissions: string[]) => void;
}

const data = [
    'Dashboard', 'Clientes', 'Produtos', 'Vendas', 'Marketing', 'Loja', 'Integrações', 'Ajustes'
];

export const EnhancedTransferList: React.FC<EnhancedTransferListProps> = ({ onPermissionsChange }) => {
    const [checked, setChecked] = useState<string[]>([]);
    const [left, setLeft] = useState(data);
    const [right, setRight] = useState<string[]>([]);

    const handleToggle = (value: string) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleMoveToRight = () => {
        const validItems = checked.filter(item => left.includes(item));

        if (validItems.length) {
            setRight(right.concat(validItems));
            setLeft(left.filter(value => !validItems.includes(value)));
            setChecked([]);
        }
    };

    const handleMoveToLeft = () => {
        const validItems = checked.filter(item => right.includes(item));

        if (validItems.length) {
            setLeft(left.concat(validItems));
            setRight(right.filter(value => !validItems.includes(value)));
            setChecked([]);
        }
    };

    const customList = (title: string, items: string[]) => (
        <ListContainer>
            <ListTitle>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
            </ListTitle>
            <CustomList>
                <List dense>
                    {items.map((value) => {
                        const labelId = `transfer-list-item-${value}-label`;
                        return (
                            <ListItem key={value} button onClick={() => handleToggle(value)}>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                                <ListItemText id={labelId} primary={`${value}`} />
                            </ListItem>
                        );
                    })}
                </List>
            </CustomList>
        </ListContainer>
    );

    useEffect(() => {
        onPermissionsChange(right);
    }, [right]);

    return (
        <TransferGrid container spacing={2}>
            <TransferGrid item xs={5}>
                {customList("Sem Permissão", left)}
            </TransferGrid>
            <TransferGrid item xs={2}>
                <TransferGrid container direction="column" alignItems="center" spacing={2}>
                    <MoveButton
                        variant="outlined"
                        size="small"
                        onClick={handleMoveToRight}
                        disabled={checked.length === 0 || checked.every(item => right.includes(item))}
                        aria-label="move selected right"
                    >
                        &gt;
                    </MoveButton>
                    <MoveButton
                        variant="outlined"
                        size="small"
                        onClick={handleMoveToLeft}
                        disabled={checked.length === 0 || checked.every(item => left.includes(item))}
                        aria-label="move selected left"
                    >
                        &lt;
                    </MoveButton>
                </TransferGrid>
            </TransferGrid>
            <TransferGrid item xs={5}>
                {customList("Com Permissão", right)}
            </TransferGrid>
        </TransferGrid>
    );
}
