import type { AuthInput } from "./AuthInput";
import type { User } from "./User";

export interface AuthContextType {
    user: User | null,
    login: (input: AuthInput) => Promise<boolean | void>,
    logout: () => Promise<void>
}