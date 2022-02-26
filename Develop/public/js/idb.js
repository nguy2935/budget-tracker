// this creates variable to hold db connection 
let db;

// establish a connection to IndexedDB databse called 'budget_tracker' and set to version 1
const request = indexedDB('budget_tracker', 1);

request.onupgradedneeded = function(event) {
    // save ref to database
    const db = event.target.result;
    // create object store (table) called 'new_transaction'
    db.createObjectStore('new_transaction', { autoIncrement: true });
};

// success
request.onsuccess = function(event) {
    db = event.target.result;

    // if app is online
    if (navigator.online) {
        updateTransaction();
    }
};

// error
request.onerror = function(event) {
    // log error
    console.log(event.target.errorCode);
}


// the ability to enter deposits offline
function saveRecord(record) {
    const transaction = db.transaction(['new_transaction'], 'readwrite');
    const budgetObjectStore = transaction.objectStore("new_transaction");

    budgetObjectStore.add(record);
};
// the ability to enter expenses offline
// offline entries should be added to the tracker when application is brought back online.