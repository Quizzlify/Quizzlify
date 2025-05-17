import { useToast } from "@/provider/ToastProvider";
import { useUser } from "@/provider/UserProvider";
import { useRouter } from "next/navigation";

export function getGravatarUserIcon(email: string): Promise<string> {
    const normalizedEmail = email.trim().toLowerCase();
    const encoder = new TextEncoder();
    const data = encoder.encode(normalizedEmail);

    return crypto.subtle.digest('SHA-256', data).then(hashBuffer => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        return `https://www.gravatar.com/avatar/${hashHex}?d=retro`;
    }).catch(() => {
        return `https://www.gravatar.com/avatar/0?d=retro`;
    });
}

export function useHandleLogout() {
    const { logout, isAuthenticated } = useUser();
    const { addToast } = useToast();
    const router = useRouter();

    return async function handleLogout() {
        if (!isAuthenticated) {
            addToast("Vous n'êtes pas connecté", "error");
            return;
        }
        try {
            await logout();
            addToast("Déconnexion réussie", "success");
            router.push("/");
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
            addToast("Erreur lors de la déconnexion", "error");
        }
    };
}