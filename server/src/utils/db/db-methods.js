import fs from "node:fs"
import fsPromises from "node:fs/promises";

const DB_FOLDER = "./src/data"
const DB_FILE = "./src/data/db.json";

/**
 * 
 * @returns {{users: {}[]}}
 */
const getDB = async () => {
    const fileContent = await fsPromises.readFile(DB_FILE, { encoding: "utf8" });

    return JSON.parse(fileContent)
}

const updateDB = async (newDB) => {
    await fsPromises.writeFile(DB_FILE, JSON.stringify(newDB))
}


export {
    getDB,
    updateDB
}