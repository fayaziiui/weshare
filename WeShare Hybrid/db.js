
function populateDB(tx) {
    tx.executeSql('DROP TABLE IF EXISTS DEMO');
    tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
    tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
    tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
}

function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}

function successCB() {
    alert("success!");
}

var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
db.transaction(populateDB, errorCB, successCB);


var dataSource = new kendo.data.DataSource({
    offlineStorage: "products-offline",
    transport: {
        read: {
            url: "http://www.wesharev2.com/Home/Login",
            type: "json"
        }
    }
});

alert(dataSource.data);



function queryDB(tx) {
    tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);
}

function querySuccess(tx, results) {
    console.log("Returned rows = " + results.rows.length);
    alert(results.rows.length);
    // this will be true since it was a select statement and so rowsAffected was 0
    if (!results.rowsAffected) {
        console.log('No rows affected!');
        return false;
    }
    // for an insert statement, this property will return the ID of the last inserted row
    console.log("Last inserted row ID = " + results.insertId);
}


//var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
db.transaction(queryDB, errorCB);
