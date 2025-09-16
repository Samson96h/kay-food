import * as path from 'path';
import * as fs from 'fs';


export class FileHelper {
    static saveFile(file: Express.Multer.File, folder: string) {
        const uploadsDir = path.join(process.cwd(), 'uploads', folder)
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        const fullPath = path.join(uploadsDir, file.originalname);
        fs.writeFileSync(fullPath, file.buffer)
        return `uploads/${folder}/${file.originalname}`;
    }
}