import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    "databaseURL": "https://realtime-database-3e478-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);

const shoppingListInDb = ref(database, "shoppingList")
const inputField = document.getElementById("input-field")
const addBtn = document.getElementById("add-btn");
const shoppingList = document.getElementById("shopping-list")


addBtn.addEventListener("click", function () {
    let inputValue = inputField.value

    push(shoppingListInDb, inputValue)
    clearInputField()
})

onValue(shoppingListInDb, function (snapshot) {
    if (snapshot.exists()) {
        let objectToArrayList = Object.entries(snapshot.val())

        clearShoppingList()

        for (let i = 0; i < objectToArrayList.length; i++) {
            let currentItem = objectToArrayList[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            appentNewItemToList(currentItem)

        }

    }else {
        shoppingList.innerHTML = "No items here... yet"
    }


})
function clearShoppingList() {
    shoppingList.innerHTML = "";
}
function clearInputField() {
    inputField.value = "";
}
function appentNewItemToList(item) {
    // shoppingList.innerHTML += `<li> ${itemValue} </li>`;
    let itemId = item[0]
    let itemValue = item[1];
    let newEl = document.createElement("li");

    newEl.textContent = itemValue;

    newEl.addEventListener("dblclick", function () {
        // Challenge: Make a let variable called 'exactLocationOfItemInDB' and set it equal to ref(database, something) where you substitute something with the code that will give you the exact location of the item in question.
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemId}`)
        remove(exactLocationOfItemInDB)
    })
    shoppingList.append(newEl)
}