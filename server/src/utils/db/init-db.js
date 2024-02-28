import fs from "node:fs"
import fsPromises from "node:fs/promises";

const DB_FOLDER = "./src/data"
const DB_FILE = "./src/data/db.json";
const initialDatabaseState = {
    users: [],
}

const initDb = async () => {
    try {
        if (!fs.existsSync(DB_FOLDER)) {
            await fsPromises.mkdir(DB_FOLDER)
        }
        if (!fs.existsSync(DB_FILE)) {
            await fsPromises.writeFile(DB_FILE, JSON.stringify(initialDatabaseState))
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}

export default initDb;