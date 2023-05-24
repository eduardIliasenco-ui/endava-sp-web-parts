export default class LocalStorage { 
    public static getValue<T = Record<string, unknown> | unknown[]>(storageName: string): T {
        const value = localStorage.getItem(storageName);

        return value ? JSON.parse(value) : null;
    }

    public static setValue<T = Record<string, unknown> | unknown[]>(storageName: string, value: T): null | T {
        try {
            localStorage.setItem(storageName, JSON.stringify(value));
            
            return null;
        } catch (error) {
            console.error(error);

            return value;
        }
    }
}