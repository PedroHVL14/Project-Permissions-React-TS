import { Button } from "@mui/material";

interface PrimaryButtonProps {
    onClick: () => void;
    children: React.ReactNode;
}

export function PrimaryButton({ onClick, children }: PrimaryButtonProps) {
    return (
        <Button fullWidth variant="contained" color="primary" onClick={onClick}>
            {children}
        </Button>
    );
}
