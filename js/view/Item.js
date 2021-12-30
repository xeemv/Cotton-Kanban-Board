import KanbanAPI from "../api/KanbanAPI.js";
import DropZone from "./DropZone.js";

export default class Item{
    constructor (id, content) {
        const bottomDropZone = DropZone.createDropZone();


        this.elements = {};
		this.elements.root = Item.createRoot();
		this.elements.input = this.elements.root.querySelector(".kanban__item-input");

       
		this.elements.root.dataset.id = id;
		this.elements.input.textContent = content;
		this.content = content;
        this.elements.root.appendChild(bottomDropZone);


        const onBlur = () => {
            const newContent = this.elements.input.textContent.trim();

            // console.log(this.content);
            // console.log(newContent);
            if (newContent == this.content) {
                return;
            }

            this.content = newContent;

            KanbanAPI.updateItem(id, {
                content: this.content
            });
        };


        this.elements.input.addEventListener("blur", onBlur);
        this.elements.root.addEventListener("dblclick", () => {
            const check = confirm("Are you sure you want to delete this item?");
            
            if (check){
                KanbanAPI.deleteItem(id);

                this.elements.input.removeEventListener("blur", onBlur);
                this.elements.root.parentElement.removeChild(this.elements.root);
            }
        });

        this.elements.root.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text/plain", id);
        });

        this.elements.input.addEventListener("drop", e=> {
            e.preventDefault();
        });
    }

    static createRoot(){
        const range = document.createRange();


        range.selectNode(document.body);

        return range.createContextualFragment(`
            <div class="kanban__item" draggable="true">
                <div class="kanban__item-input" contenteditable></div>
            </div>
        `).children[0];
    }
}


/*
- creating a root like the column.js file

- code line 12 - 18 is taken from column.js file.
    - however, changed line 13 - 15
        - this will contain the content editable input
    - draggable="true" from line 13 --> will help w/ drag n drop functionality

- code line 5:
    - this.elements.input = this.elements.root.querySelector(".kanban__item-input"); -->
        - is the kanban item input to get a reference to that particular html element

- code line 6:
    - const bottomDropZone = DropZone.createDropZone(); -->
        - this will create a drop zone underneath every single item

- code line 13:
    - const onBlur = () => { ---->
        - this will give the user the ability to update the content of a single item

- code line 15:
    - const onBlur = () => {
            const newContent = this.elements.input.textContent.trim(); -->
        - all this is to add new text input into the +add sections under each column

- code line 17:
        - this.elements.root.appendChild(bottomDropZone); -->
            - this creates a space between current items and the "+ add"
                - the drop zone space

- code line 33:
    - this.elements.root.addEventListener("dbclick", () => { -->
        - this is to delete the input

- code line 40:
    - this.elements.root.parentElement.removeChild(this.elements.root); -->
        - the parentElement is the column itself
        - the childElement is the item
        - requesting to remove the childElement from the html
        - this will remove it visually
        - w/o it, it will only be removed from the local storage

- code line 45:
    - e.dataTransfer.setdata("text/plain", id); -->
        - text in this part means the item id

- code line 48:
    - this.elements.input.addEventListener("drop", e=> {
            e.preventDefault(); -->
        - this is just to prevent the text from appearing inside the input field by accident
*/