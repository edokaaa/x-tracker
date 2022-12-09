import * as SQLite from 'expo-sqlite';

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
        tx.executeSql('INSERT INTO tx_types (name) values (?)', ['income']);
    });
    db.transaction(tx => {
        tx.executeSql('INSERT INTO tx_types (name) values (?)', ['expense']);
    });

    // Transactions table
    db.transaction(tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, type_id INTEGER, price INTEGER, addedtime INTEGER)')
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
    
    db.transaction(tx => {
        tx.executeSql('DROP TABLE IF EXISTS users', null,
        (txObj, resultSet) => {},
        (txObj, error) => console.log(error)
        );
    });

}


export default {
    createDbTables,
    dropDbTables,
    db
}