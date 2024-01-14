import { JwtPayload, jwtDecode } from 'jwt-decode';
export const decodeJWT = (token: string): Promise<JwtPayload | null> => {
    return new Promise((resolve) => {
        if (token) {
            const decodedToken = jwtDecode<JwtPayload>(token);
            resolve(decodedToken);
        } else {
            resolve(null);
        }
    });
};
export const canRefreshToken = async (token: string): Promise<boolean> => {
    return new Promise(async (resolve) => {
        const decodeToken = await decodeJWT(token);
        if (decodeToken && decodeToken.exp) {
            const expirationTime = decodeToken.exp * 1000; // Convert to milliseconds
            const currentTime = new Date().getTime();
            const timeUntilExpiration = expirationTime - currentTime;
            const refreshThreshold = 5 * 60 * 1000; // 5 min
            const refeshIt = timeUntilExpiration < refreshThreshold;
            resolve(refeshIt);
        }

        resolve(false);
    });
};