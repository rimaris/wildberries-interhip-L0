export function getCardLogo(cardType) {
    switch (cardType) {
        case 'mir':
            return "/assets/icons/mir-logo.svg";
        case 'visa':
            return '/assets/icons/visa-logo.svg';
        case 'mc':
            return '/assets/icons/mc-logo.svg';
        case 'maestro':
            return 'assets/icons/maestro-logo.svg';
    }
}
