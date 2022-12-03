import { Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase(
    {
        name: 'MainDB',
        location: 'default',
    },
    () => { },
    error => { console.log(error) }
);

export const createDataBaseTables = () => {
    try {
        db.transaction( tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "
                + "Users "
                + "(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)"
            );
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "
                + "Transactions "
                + "(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, description TEXT, type_id INTEGER, price INTEGER, addedtime INTEGER, category_id INTEGER)"
            );
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "
                + "Categories "
                + "(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, type_id INTEGER)"
            );
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "
                + "Types "
                + "(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)"
            );
            tx.executeSql(
                "INSERT INTO Types "
                + "Values (?)",
                ["income"]
            );
            tx.executeSql(
                "INSERT INTO Types "
                + "Values (?)",
                ["expense"]
            );
            // filling transaction types

            // set foriegn keys

            // tx.executeSql(
            //     "INSERT INTO Users "
            //     + "Values ('edoka', 'edoka')"
            // );
        });
        Alert("DB tables created successfully!")
    } catch(e) {
        console.warn(e);
    }
}

export const createUser = (userName, password) => {
    db.transaction(async (tx) => {
        await tx.executeSql(
            "INSERT INTO Users (username, password) values (?, ?)",
            [userName, password]
        );
    })
    // Alert.alert("Registration successful");
}

export const getUser = (user_id) => {
    user = db.transaction(async (tx) => {
        // try {
        await tx.executeSql(
            "Select * from Users WHERE id = "+ user_id +";"
        );
    });
    return user;
}

export const getUserTransactions = (user_id) => {
    tx = db.transaction(async (tx) => {
        await tx.executeSql(
            "Select * from Transactions WHERE user_id= "+ user_id +";"
        );
    });
    return tx;
}

export default {
    db,
    createDataBaseTables,
    createUser,
    getUser
}