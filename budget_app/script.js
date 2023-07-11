// Get DOM elements
let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-btn");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");
let tempAmount = 0;

// Event listener for updating the total amount
totalAmountButton.addEventListener("click", () => {
    tempAmount = totalAmount.value;
    if (tempAmount === "" || tempAmount < 0) {
        errorMessage.classList.remove("hide");
    } else {
        errorMessage.classList.add("hide");
        amount.innerHTML = tempAmount;
        balanceValue.innerText = tempAmount - expenditureValue.innerText;
        totalAmount.value = "";
    }
});

/**
 * Disables or enables the edit buttons based on the provided boolean value.
 * @param {boolean} bool - A boolean value indicating whether to disable or enable the edit buttons.
 */
const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element) => {
        element.disabled = bool;
    });
};

/**
 * Modifies an element by either editing or deleting it from the DOM.
 * @param {HTMLElement} element - The element to be modified (edit or delete).
 * @param {boolean} edit - A boolean value indicating whether the modification is an edit (true) or delete (false).
 */
const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement;
    let currentBalance = balanceValue.innerText;
    let currentExpense = expenditureValue.innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;
    if (edit) {
        let parentText = parentDiv.querySelector(".product").innerText;
        productTitle.value = parentText;
        userAmount.value = parentAmount;
        disableButtons(true);
    }

    balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
    expenditureValue.innerText = parseInt(currentExpense) - parseInt(parentAmount);
    parentDiv.remove();
};

/**
 * Creates a list item for an expense and appends it to the list.
 * @param {string} expenseName - The name of the expense.
 * @param {number} expenseValue - The value of the expense.
 */
const listCreator = (expenseName, expenseValue) => {
    let subListContent = document.createElement("div");
    subListContent.classList.add("sublist-content", "flex-space");
    list.appendChild(subListContent);
    subListContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
    let editButton = document.createElement("button");
    editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
    editButton.style.fontSize = "1.2em";
    editButton.addEventListener("click", () => {
        modifyElement(editButton, true);
    });
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
    deleteButton.style.fontSize = "1.2em";
    deleteButton.addEventListener("click", () => {
        modifyElement(deleteButton);
    });
    subListContent.appendChild(editButton);
    subListContent.appendChild(deleteButton);
    document.getElementById("list").appendChild(subListContent);
};

// Event listener for checking amount and adding expenses
checkAmountButton.addEventListener("click", () => {
    // Check for empty inputs
    if (!userAmount.value || !productTitle.value) {
        productTitleError.classList.remove("hide");
        return false;
    }
    // Enable buttons
    disableButtons(false);
    // Get expense value
    let expenditure = parseInt(userAmount.value);
    // Calculate total expense (existing + new)
    let sum = parseInt(expenditureValue.innerText) + expenditure;
    expenditureValue.innerText = sum;
    // Calculate total balance = budget - total expense
    const totalBalance = tempAmount - sum;
    balanceValue.innerText = totalBalance;
    // Create list
    listCreator(productTitle.value, userAmount.value);
    // Clear inputs
    productTitle.value = "";
    userAmount.value = "";
});