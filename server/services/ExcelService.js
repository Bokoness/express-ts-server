import xl2json from 'convert-excel-to-json'
import path from 'path'
import { fileURLToPath } from 'url'

class ExcelService {
  static parse(filePath, columnToKey) {
    const { dirname } = path
    const __dirname = dirname(fileURLToPath(import.meta.url))
    const finalPath = path.join(__dirname, '..', 'public', 'uploads', filePath)
    return xl2json({
      sourceFile: finalPath,
      header: {
        rows: 1,
      },
      columnToKey,
    })
  }
}

export default ExcelService
