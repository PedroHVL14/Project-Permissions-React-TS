import { validCNPJ } from '../../validations/regexCNPJ';
import { CompanyProps, UserProps } from './SignupTypes';
import { isValidEmail } from './isValidEmail';

export const isCompanyDataValid = (companyData: CompanyProps): string => {
    if (!companyData.companyName || !companyData.cnpj || !companyData.segment) {
        return "Todos os campos são obrigatórios!";
    }
    if (!validCNPJ(companyData.cnpj)) {
        return "CNPJ inválido. Por favor, insira um CNPJ válido.";
    }
    return "";
}

export const isUserDataValid = (userData: UserProps): string => {
    if (!userData.userName || !userData.email || !userData.password || !userData.phone) {
        return "Todos os campos são obrigatórios!";
    }
    if (!isValidEmail(userData.email)) {
        return "Por favor, insira um e-mail válido.";
    }
    return "";
}
