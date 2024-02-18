import fs from 'fs'

export const rentalService = {
    query,
    remove,
    save
}

const rentals = _readJsonFile()

function query() {
    return Promise.resolve(rentals)
}

function remove(rentalId) {
    const rentalIdx = rentals.findIndex(rental => rental.recordid === rentalId)
    rentals.splice(rentalIdx, 1)
    _saveRentalsToFile()
    return Promise.resolve(rentals)
}

function save(rental) {
    rentals.push(rental)
    return _saveRentalsToFile().then(() => rental)
}

function _saveRentalsToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(rentals, null, 2)
        fs.writeFile('data/rental-DB.json', data, (err) => {
            if (err) {
                return reject(err)
            }
            resolve()
        })
    })
}


function _readJsonFile() {
    const str = fs.readFileSync('./data/rental-DB.json', 'utf8')
    const json = JSON.parse(str)
    return json
}