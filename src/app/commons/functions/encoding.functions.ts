

export function readFileAsBase64(file: File): Promise<{ data: string; type: string }> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                resolve({ data: reader.result, type: file.type });
            } else {
                reject('Cannot read file as base64');
            }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}