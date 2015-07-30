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


var name = window.localStorage.getItem("name");
alert(name)
window.localStorage.setItem("name", "fayaz");

