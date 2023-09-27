import { StyledPrimaryButton } from "./styles";

interface PrimaryButtonProps {
    onClick: () => void;
    children: React.ReactNode;
}

export function PrimaryButton({ onClick, children }: PrimaryButtonProps) {
    return (
        <StyledPrimaryButton fullWidth variant="contained" color="primary" onClick={onClick}>
            {children}
        </StyledPrimaryButton>
    );
}
