import type { Profile } from "@/stores/useProfileStore";


export function validateProfile(profile: Partial<Profile>): boolean {
    
    // Валидация маркера
    if ('marker' in profile) {
        return profile.marker?.every(item => item.text.trim().length > 0 && item.text.trim().length <= 50) || false;

    }
    // Валидация логина
    if ('login' in profile) {
        return (typeof profile.login === 'string' && profile.login !== '' && profile.login.length <= 100);    
    }
    // Валидация пароля
    if ('password' in profile) {
        return (typeof profile.password === 'string' && profile.password !== '' && profile.password.length <= 100);
    }

    return false;
}