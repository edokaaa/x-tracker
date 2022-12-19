import * as SQLite from 'expo-sqlite';

import categoriesData from './Categories';

export const db = SQLite.openDatabase('xtracker.db');

export const createDbTables = () => {
    // foriegn key settings
    db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () => {});

    // Users
    db.transaction(tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)')
    });

    // Categories table
    db.transaction(tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, icon TEXT, color TEXT)');
    });

    // Transaction Type table
    db.transaction(tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS tx_types (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
    });

    // inserting transaction types
    db.transaction(tx => {
        tx.executeSql('SELECT * FROM tx_types', null,
        (txObj, resultSet) => {
            if (resultSet.rows._array.length === 0) {
                db.transaction(txx => {
                    txx.executeSql('INSERT INTO tx_types (name) values (?)', ['income']);
                });
                db.transaction(txx => {
                    txx.executeSql('INSERT INTO tx_types (name) values (?)', ['expense']);
                });
            }
        },
        (txObj, error) => console.log(error)
        );
    });
    
    // Transactions table
    db.transaction(tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, type_id INTEGER REFERENCES tx_types(id), price INTEGER, addedtime TEXT, category_id INTEGER REFERENCES categories(id))')
    })
}

export const dropDbTables = () => {
    db.transaction(tx => {
        tx.executeSql('DROP TABLE IF EXISTS transactions', null,
        (txObj, resultSet) => {},
        (txObj, error) => console.log(error)
        );
    });

    db.transaction(tx => {
        tx.executeSql('DROP TABLE IF EXISTS tx_types', null,
        (txObj, resultSet) => {},
        (txObj, error) => console.log(error)
        );
    });

    db.transaction(tx => {
        tx.executeSql('DROP TABLE IF EXISTS categories', null,
        (txObj, resultSet) => {},
        (txObj, error) => console.log(error)
        );
    });
    
    // db.transaction(tx => {
    //     tx.executeSql('DROP TABLE IF EXISTS users', null,
    //     (txObj, resultSet) => {},
    //     (txObj, error) => console.log(error)
    //     );
    // });

}

export const getTypeTotal = (typeId, transactions) => {
    let sum = 0;
    let filtered = [...transactions].filter(tx => tx.type_id === typeId);

    for (let tx = 0; tx < filtered.length; tx++) {
        sum = sum + filtered[tx].price
    }
    // console.log(sum)
    return sum;
}


export default {
    createDbTables,
    dropDbTables,
    db,
    getTypeTotal
}