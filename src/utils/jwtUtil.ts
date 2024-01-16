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
export const canRefreshToken = async (token: string, showLog = false, from: string | undefined = undefined): Promise<boolean> => {
    return new Promise(async (resolve) => {
        const decodeToken = await decodeJWT(token);
        if (decodeToken && decodeToken.exp) {
            const expirationTime = decodeToken.exp * 1000; // Convert to milliseconds
            const currentTime = new Date().getTime();
            const timeUntilExpiration = expirationTime - currentTime;
            const refreshThreshold = 5 * (60 * 1000); // 5 min
            const refeshIt = timeUntilExpiration < refreshThreshold;
            if (showLog) {
                console.log('jwtUtil > canRefreshToken > refeshIt : ' + refeshIt, decodeToken, 'from', from);
            }

            resolve(refeshIt);
        }

        resolve(false);
    });
};
export const getRefreshTokenTimeout = async (token: string): Promise<number> => {
    return new Promise(async (resolve) => {
        const decodeToken = await decodeJWT(token);
        if (decodeToken && decodeToken.exp) {
            const expires = new Date(decodeToken.exp * 1000);
            const timeout = expires.getTime() - Date.now() - (5 * (60 * 1000));
            resolve(timeout);
        }
        resolve(0);
    });
};