import fs from 'fs'
import multer from 'multer'
import { fileURLToPath } from 'url'
import path from 'path'

const { dirname } = path
const __dirname = dirname(fileURLToPath(import.meta.url))

class FileUploadService {
  static types = {
    images: ['png', 'jpg', 'jpeg'],
    xl: ['xls', 'xl', 'xlsx'],
  }

  /**
     * This class handles file uploads
     * @param {Array<String>} allowedTypes string array of file types image/png, image/jpg etc
     * @param pathToDir the upload directory (inside public/uploads) default is public/uploads
     * @param fileName the fileName if needed
     */
  constructor(allowedTypes, pathToDir = '', fileName) {
    this.pathToDir = path.join(__dirname, '..', 'public', 'uploads', pathToDir)
    this.fileName = fileName
    let tempTypes = []
    allowedTypes.forEach((at) => {
      if (!(at in FileUploadService.types)) throw new Error('No such type')
    })
    allowedTypes.forEach((at) => tempTypes = [...tempTypes, ...FileUploadService.types[at]])
    this.allowedTypes = tempTypes
  }

  /**
     * create multer instance
     * @returns {Multer} instance of multer with all necessary data
     */
  get() {
    return multer(this.getMulterImageUploadConfig())
  }

  /**
     * deleteFile deletes file from server
     * @param filename the file name
     */
  async deleteFile(filename) {
    const mainFilename = filename.split('/')
    const filePath = `${this.pathToDir}/${mainFilename[mainFilename.length - 1]}`
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
  }

  /**
     * create config object for multer
     * @returns {{fileFilter: fileFilter, storage: DiskStorage}}
     */
  getMulterImageUploadConfig() {
    return {
      storage: multer.diskStorage({
        destination: (req, file, callback) => {
          if (!fs.existsSync(this.pathToDir)) fs.mkdirSync(this.pathToDir)
          callback(null, this.pathToDir)
        },
        filename: (req, file, cb) => {
          const ext = file?.originalname?.split('.')[1]
          const name = this.fileName ? `${this.fileName}.${ext}` : `${Date.now()}.${ext}`
          cb(null, name)
        },
      }),
      fileFilter: (req, file, cb) => {
        const fileEnding = file?.originalname?.split('.')
        if (
          !this.allowedTypes.length || this.allowedTypes?.includes(fileEnding[fileEnding.length - 1])
        ) {
          cb(null, true)
        } else {
          cb(null, false)
        }
      },
    }
  }
}

export default FileUploadService
