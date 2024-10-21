const date = new Date();
date.setFullYear(date.getFullYear() + 1);
export const expirationDate = `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;