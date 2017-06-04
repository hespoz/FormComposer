/**
 * Created by hespoz on 5/21/17.
 */
import SQLite from 'react-native-sqlite-storage';

var DBHelper = {

    db:null,

    openDatabase : function () {
        this.db = SQLite.openDatabase("FormComposerData22.db", "1.0", "Test Database", 200000, this.openCB, this.errorCB);
    },

    initTables : function () {
        if(this.db == null){
            console.error("The database is not connected please execute openDatabase first.");
        } else {
            this.db.transaction((tx) => {
                tx.executeSql('CREATE TABLE IF NOT EXISTS Forms (id INTEGER PRIMARY KEY AUTOINCREMENT, name, numberInstances)');
                //formContent saves the form object.
                tx.executeSql('CREATE TABLE IF NOT EXISTS FormEntry (id INTEGER PRIMARY KEY AUTOINCREMENT, formContent, form_id INTEGER, FOREIGN KEY(form_id) REFERENCES Forms(id))');
            });
        }

    },

    getFormByName: function(tx, formName, callback) {
        tx.executeSql('SELECT * FROM Forms WHERE name = ?', [formName], callback);
    },

    insertForm: function(tx, formName, callback){
        tx.executeSql('INSERT INTO Forms(name, numberInstances) VALUES (?, ?)', [formName, 1], callback);
    },

    insertFormEntry : function(tx, formObject, formId, callback) {
        tx.executeSql('INSERT INTO FormEntry(formContent, form_id) VALUES (?, ?)', [formObject, formId], callback);
    },

    updateFormEntry: function(tx, formObject, formId, callback) {
        tx.executeSql('UPDATE FormEntry SET formContent = ? WHERE id = ?', [formObject, formId], callback);
    },

    updateFormNumberInstances : function(tx, numberInstances, id, callback) {
        tx.executeSql('UPDATE Forms SET numberInstances = ? WHERE id = ?', [numberInstances, id], callback);
    },

    getAllForms : function(tx, callback) {
        tx.executeSql('SELECT * FROM Forms', [], callback);
    },

    getFormEntryListByFormId : function(tx, formId, callback) {
        tx.executeSql('SELECT * FROM FormEntry where form_id = ?', [formId], callback);
    },


    getFormEntryById: function(tx, formEntryId, callback) {
        tx.executeSql('SELECT * FROM FormEntry WHERE id = ?', [formEntryId], callback);
    }

};

module.exports = DBHelper;
