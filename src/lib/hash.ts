import bcrypt from 'bcrypt';

export const hash = async (password: string): Promise<string> => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

export const validatePassword = async (
    plainPassword: string,
    hashedPassword: string
): Promise<boolean> => {
    const result = await bcrypt.compare(plainPassword, hashedPassword);
    return result;
};