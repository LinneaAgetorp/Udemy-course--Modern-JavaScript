// Storage Controller
const StorageCtrl = (function () {

    // Public methods:
    return {
        storeItem: function (item) {
            let items = [];
            // Check if any items in LS
            if(localStorage.getItem('items') === null) {
                items;
                // Push new item
                items.push(item);
                // set LS
                localStorage.setItem('items', JSON.stringify(items))
            } else {
                // Get what is already in LS
                items = JSON.parse(localStorage.getItem('items'))
                // Push new item
                items.push(item);
                // Reset LS
                localStorage.setItem('items', JSON.stringify(items))
            }
        },
        getItemsFromStorage: function () {
            let items;
            if(localStorage.getItem('items') === null) {
                items = [];
            }  else {
                items = JSON.parse(localStorage.getItem('items'))
            }
            return items;
        },
        updateItemStorage: function (updatedItem) {
            let items = JSON.parse(localStorage.getItem('items'));
            items.forEach((item, index) => {
                if (updatedItem.id === item.id) {
                    items.splice(index, 1, updatedItem)
                }
            });
            localStorage.setItem('items', JSON.stringify(items))
        },
        deleteItemFromStorage: function (id) {
            let items = JSON.parse(localStorage.getItem('items'));
            items.forEach((item, index) => {
                if (id === item.id) {
                    items.splice(index, 1)
                }
            });
            localStorage.setItem('items', JSON.stringify(items))
        },
        clearItemsFromStorage: function () {
            localStorage.removeItem('items')
        }
    }
})();

//              ---------   Item Controller
const ItemCtrl = (function () {
    // Item Constructor
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    };

    // Data structure / State
    const data = {
        items: StorageCtrl.getItemsFromStorage(),
        currentItem: null,
        totalCalories: 0
    };

    return {
        getItems: function () {
            return data.items;
        },
        addItem(name, calories) {
            let ID;
            // Create ID
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1
            } else {
                ID = 0
            }

            // Calories to number
            calories = parseInt(calories)

            // Create new item
            let newItem = new Item(ID, name, calories);
            data.items.push(newItem)
            return newItem
        },
        setCurrentItem: function (item) {
            data.currentItem = item;
        },
        getCurrentItem: function () {
            return data.currentItem;
        },
        getItemById: function (id) {
            let found = null;

            data.items.forEach(item => {
                if (item.id === id) {
                    found = item;
                }
            });
            return found;
        },
        updateItem: function (name, calories) {
            // Calories to number
            calories = parseInt(calories);

            let found = null;

            data.items.forEach(item => {
                if (item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            });
            return found;
        },
        deleteItem: function (id) {
            // Get ID's using map
            let ids = data.items.map(item => {
                return item.id
            });

            // Get index
            const index = ids.indexOf(id);

            // Remove item
            data.items.splice(index, 1)
        },
        clearAllItems: function() {
            data.items = [];
        },
        getTotalCalories: function () {
            let total = 0;

            // loop through items and add cals
            data.items.forEach(item => {
                total += item.calories
            });

            // Set total cal in data structure
            data.totalCalories = total;

            return data.totalCalories;
        },
        logData: function () {
            return data;
        }
    }
})();


//              --------         UI Controller
const UICtrl = (function () {
    const UISelectors = {
        itemList: '#item-list',
        listItems: '#item-list li',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        clearBtn: '.clear-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
    };

    return {
        populateItemList: function (items) {
            let html = '';
            items.forEach(item => {
                html += `
                <li id="item-${item.id}" class="collection-item"><strong> ${item.name} </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
                </li> `;
            })
            // Insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;

        },
        getItemInput: function () {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function (item) {
            // Show the UL list
            document.querySelector(UISelectors.itemList).style.display = 'block';
            // Create li element
            const li = document.createElement('li');
            // Add class
            li.className = 'collection-item';
            // Add id
            li.id = `item-${item.id}`;
            // Add html
            li.innerHTML = `
            <strong> ${item.name} </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
            `;
            // Insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
        },
        updateListItem: function (item) {
            let listItems = document.querySelectorAll(UISelectors.listItems);

            // turn node list into array
            listItems = Array.from(listItems);

            // Loop through
            listItems.forEach(listItem => {
                const itemID = listItem.getAttribute('id');

                if (itemID === `item-${item.id}`) {
                    document.querySelector(`#${itemID}`).innerHTML = `
                    <strong> ${item.name} </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
                }

            })
        },
        deleteListItem: function (id) {
            const itemID = `#item-${id}` ;
            const item = document.querySelector(itemID);
            item.remove();
        },
        clearInput: function () {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        addItemToForm: function () {
            document.querySelector(UISelectors.itemNameInput).value =
                ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value =
                ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },
        clearListItems: function() {
            let listItems = document.querySelectorAll(UISelectors.listItems);

            // Turn node list into array
            listItems = Array.from(listItems);

            listItems.forEach(item => {
                item.remove();
            })
        },
        hideList: function () {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showTotalCalories: function (totalCalories) {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
        clearEditState: function () {
            UICtrl.clearInput()
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        showEditState: function () {
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },
        getSelectors: function () {
            return UISelectors
        }
    }
})();


//                  ---------        App Controller

const App = (function (ItemCtrl, StorageCtrl, UICtrl) {
    // Load event listeners
    const loadEventListeners = function () {
        const UISelectors = UICtrl.getSelectors();

        // Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        // Disable submit on enter-click
        document.addEventListener('keypress', (e) => {
            if (e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false
            }
        });

        // Edit icon click event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

        // Update item event
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

        // Back button event
        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

        // Delete item event
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

        // Clear all item event
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
    };

    // Add Item Submit
    const itemAddSubmit = function (e) {
        e.preventDefault();

        // Get form input from UI controller
        const input = UICtrl.getItemInput();

        // Check for name and calorie input
        if (input.name !== '' && input.calories !== '') {
            // Add item
            const newItem = ItemCtrl.addItem(input.name, input.calories);

            // Add item to UI list
            UICtrl.addListItem(newItem);

            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();

            // Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);

            // Store in localstorage
            StorageCtrl.storeItem(newItem);

            // Clear input fields
            UICtrl.clearInput();

        }
    };

    // Click edit item
    const itemEditClick = function (e) {
        e.preventDefault();

        if (e.target.classList.contains('edit-item')) { // have to use event delegation because this item doesn't
            // Get list item id (item-0)                 // exist from the beginning
            const listId = e.target.parentNode.parentNode.id; // gets <li>  id example item-0

            // Break into an array
            const listIdArr = listId.split('-');

            // Get actual ID
            const id = parseInt(listIdArr[1]);

            // Get item
            const itemToEdit = ItemCtrl.getItemById(id);

            // Set current item
            ItemCtrl.setCurrentItem(itemToEdit);

            // Add item to form
            UICtrl.addItemToForm();
        }
    };

    // Update item submit
    const itemUpdateSubmit = function (e) {
        e.preventDefault();

        // Get item input
        const input = UICtrl.getItemInput()

        // Update item
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories)

        // Update UI
        UICtrl.updateListItem(updatedItem);

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        // Update LS
        StorageCtrl.updateItemStorage(updatedItem);

        UICtrl.clearEditState();
    };

    // Delete item
    const itemDeleteSubmit = function (e) {
        e.preventDefault();

        // Get current item
        const currentItem = ItemCtrl.getCurrentItem()

        // Delete from data structure
        ItemCtrl.deleteItem(currentItem.id);

        // Delete from UI
        UICtrl.deleteListItem(currentItem.id);

        // Update calories
        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        // Delete item from LS
        StorageCtrl.deleteItemFromStorage(currentItem.id);

        UICtrl.clearEditState();
    };

    // Clear all items event
    const clearAllItemsClick = function () {
        // Delete all items from data structure
        ItemCtrl.clearAllItems();

        // Update calories
        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        // Remove all list items from UI
        UICtrl.clearListItems();

        // Clear all from LS
        StorageCtrl.clearItemsFromStorage();

        // Hide <ul> - line when empty
        UICtrl.hideList()
    };

    return {            // Public methods in the return "object"
        init: () => {
            // Clear Edit state / set initial state
            UICtrl.clearEditState()

            // Fetch items from data structure
            const items = ItemCtrl.getItems();

            // Check if items in UL list
            if (items.length === 0) {
                UICtrl.hideList()
            } else {
                // Populate UI
                UICtrl.populateItemList(items);
            }

            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            // Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);

            // Load event listeners
            loadEventListeners();

        }
    }

})(ItemCtrl, StorageCtrl, UICtrl);

// Init app
App.init();