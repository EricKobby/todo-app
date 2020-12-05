const itemsList = document.querySelector("#todoItems"),
    todoItemEl = document.querySelector("#todoItem");


const getItems = () => Array.from(JSON.parse(localStorage.getItem("Todos") || "[]"));

const createElements = () => {
    return {
        tableRowEl: document.createElement("tr"),
        todoItemTd: document.createElement("td"),
        actionButton: document.createElement("button"),
        actionTd: document.createElement("td")
    }
}

const setItems = (items) => localStorage.setItem("Todos", JSON.stringify(items));
/**
 * 
 * @param {{
 * tableRowEl: HTMLTableRowElement
 * todoItemTd: HTMLTableDataCellElement
 * actionButton: HTMLButtonElement
 * actionTd: HTMLTableDataCellElement
 * }} param0 
 * @param {{id: number, item: string}} todo 
 */
const renderValues = ({ tableRowEl, todoItemTd, actionButton, actionTd }, todo) => {

    actionButton.textContent = "x";
    actionButton.classList.add("action-button");
    actionButton.setAttribute("data-id", todo.id);

    //add eventlistener for remove action button click
    actionButton.addEventListener("click", (e) => {
        let items =  getItems();

        items = items.filter(todo => todo.id !== Number(e.target.getAttribute("data-id")));
        //update LocalStorage
        setItems(items);

        //update DOM
        itemsList.removeChild(e.target.parentNode.parentNode);
    })

    actionTd.appendChild(actionButton);
    todoItemTd.textContent = todo.item;
    tableRowEl.appendChild(todoItemTd);
    tableRowEl.appendChild(actionTd);
    itemsList.appendChild(tableRowEl);
}

document.querySelector("#addNew").addEventListener("click", function(){
    
    const todo ={ id: Math.random(), item: todoItemEl.value };

    //update DOM
    renderValues(createElements(),todo);

    const items =  getItems();
    setItems([...items,todo]);
});

document.addEventListener("DOMContentLoaded", ()=>{
    const items =  getItems();
    items.forEach(todo => renderValues(createElements(),todo));
});

