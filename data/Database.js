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

export const createDataBase = () => {
    try {
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "
                + "Users "
                + "(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT);"
            );
            tx.executeSql(
                "INSERT INTO Users "
                + "Values ('edoka', 'edoka');"
            );
        });
    } catch(e) {
        console.warn(e);
    }
}

export const createUser = (userName, password) => {
    db.transaction(tx => {
        tx.executeSql(
            "INSERT INTO Users (username, password) values ('"
            + userName + "'," + password + ");"
        )
    })
    Alert.alert("Registration successful");
}

export function getUser() {
    user = db.transaction(tx => {
        // try {
        tx.executeSql(
            "Select * from User;"
        )
        return user;
        // } catch(e) {
        //     console.warn(e);
        //     return false;
        // }
    })
}

export default {
    db,
    createDataBase,
    createUser,
    getUser
}