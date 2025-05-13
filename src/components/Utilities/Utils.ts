export function getGravatarUserIcon(email: string, size: number = 80): Promise<string> {
    const normalizedEmail = email.trim().toLowerCase();
    const encoder = new TextEncoder();
    const data = encoder.encode(normalizedEmail);

    return crypto.subtle.digest('SHA-256', data).then(hashBuffer => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        return `https://www.gravatar.com/avatar/${hashHex}?d=identicon`;
    }).catch(() => {
        return `https://www.gravatar.com/avatar/0?d=identicon`;
    });
}