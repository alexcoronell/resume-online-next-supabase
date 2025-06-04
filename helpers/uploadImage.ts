import { createClient } from "@/utils/supabase/client";

const validImagesExt = ['bmp', 'jpg', 'jpeg', 'png', 'webp'];

export const verifyImage = (file: any, fileName: string = '') => {
    const pattern = /[\^*@!"#$%&/()=?¡!¿'\\áéíóúüñÑÁÉÍÓÚÛÜ]/gi;
    const name = file.name.split('').reverse().join('');
    const ext = name.split('.')[0].split('').reverse().join('');
    let newName = new Date().getTime().toString() + '---' + name.split('.')[1].split('').reverse().join('').split(' ').join('_').replace(pattern, '');

    if (!validImagesExt.includes(ext)) {
        alert(`Files with extensions ${ext} not permited`)
        return { valid: false, filePath: null, file: null, newName };
    }
    const filePath = `${newName}.${ext}`;
    return {
        valid: true,
        filePath,
        file,
        newName,
    };
}

export const uploadImage = async (file: File, bucketName: string, filePath: string) => {
    const supabase = createClient();
    return await supabase.storage.from(bucketName).upload(filePath, file, {
        upsert: true,
    });
}