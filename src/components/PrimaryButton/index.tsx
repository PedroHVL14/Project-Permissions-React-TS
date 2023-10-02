import { StyledPrimaryButton } from "./styles";

interface PrimaryButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    type?: "submit" | "button" | "reset";
    disabled?: boolean; 
}

export function PrimaryButton({ onClick, children, disabled }: PrimaryButtonProps) {
    return (
        <StyledPrimaryButton 
            fullWidth 
            variant="contained" 
            color="primary" 
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </StyledPrimaryButton>
    );
}
