import { Button } from "@mui/material";

interface PrimaryButtonProps {
    onClick: () => void;
    children: React.ReactNode;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ onClick, children }) => {
    return (
        <Button fullWidth variant="contained" color="primary" onClick={onClick}>
            {children}
        </Button>
    );
}