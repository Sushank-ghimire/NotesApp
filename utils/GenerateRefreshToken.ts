
export const generateRefreshToken = () => {
    let token = "";
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for(let i=0; i<15; i++) {
        token += characters.charAt(Math.floor(Math.random() * 15));
    }
    return token;
}