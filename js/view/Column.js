/*  
- this is the column's class js file 
    - see mention of this on the kanban.js file; code line 11
*/

import KanbanAPI from "../api/KanbanAPI.js";
import DropZone from "./DropZone.js";
import Item from "./Item.js";

export default class Column {
    constructor (id, title) {
        const topDropZone = DropZone.createDropZone();

        this.elements = {};
		this.elements.root = Column.createRoot();
		this.elements.title = this.elements.root.querySelector(".kanban__column-title");
		this.elements.items = this.elements.root.querySelector(".kanban__column-items");
		this.elements.addItem = this.elements.root.querySelector(".kanban__add-item");


        this.elements.root.dataset.id = id;
        this.elements.title.textContent = title;
        this.elements.items.appendChild(topDropZone);

        this.elements.addItem.addEventListener("click", () => {
            // Todo: add item
            const newItem = KanbanAPI.insertItem(id, "");

            this.renderItem(newItem);
        });

        KanbanAPI.getItems(id).forEach(item => {
            this.renderItem(item);
        });
    }


    static createRoot() {
		const range = document.createRange();

		range.selectNode(document.body);

		return range.createContextualFragment(`
			<div class="kanban__column">
				<div class="kanban__column-title"></div>
				<div class="kanban__column-items"></div>
				<button class="kanban__add-item" type="button">+ Add</button>
			</div>
		`).children[0];
	}

	renderItem(data) {
		const item = new Item(data.id, data.content);

		this.elements.items.appendChild(item.elements.root);
	}
}


/*
- code line 7:
    - the constructor will take the id and title parameter and go through those
    - this class represents a single column int he user interface

- code line 12:
    - static createRoot() { -->
        - this is taking the div tag container we created in the html file and will make it a root here for the user interface
        - the goal is to return an html element as an object that will contain the basic struture of a particular column

- code line 18:
    - return range.createContextualFragment(``) -->
        - we can create a multi-line string in js using the back ticks
        - copy our kanban div tag from the html file and drop it inside the back ticks and parenthesis:
            - <div class="kanban__column"> 
                <div class="kanban__column-title">Not Started</div> 
                <div class="kanban__items"></div>
                <button class="kanban__add-item" type="button">+ Add</button> 
            </div>
        - these are the only ones we will use here
            - <div class="kanban__column-title"></div> -->
                - changed this line by removing the "Not Started" title as we will add those in dynamically
            - <div class="kanban__items"></div> -->
                - this line was update as it was entered w/o column originally
                - <div class="kanban__column-items"></div>

- code line 24:
    - .chidren[0]; -->
        - this will create an array w/ the index at 0
        - this will create a contextual fragment or virtual dom tree
            - .children will just pull the first one, in other words, the entire div as a html object

- code line 10:
    - this.elements.title = this.elements.root.querySelector(".kanban__column-title/items/add-item"); -->
        - basically we are calling the query selector on the root itself
        - it is only for this local column (code line 21-25) and not the whole document

- code line 15:
    - this.elements.root.dataset.id = id; -->
        - this will help identify which column id it is
        - will be useful later on when dragging and dropping

- code line 16:
    - this.elements.title.textContent = title; -->
        - this will display the title of each column

- code line 18:
    - this.elements.addItem.addEventListener("click", () => {}) --->
        - a way to display every single item that appears under the column

- code line 12:
    - const topDropZone = DropZone.createDropZone(); --> 
        - this will allow us to create a drop zone to place an item above the very first item already in the column
        - use code from line 23 to achieve this
            - this.elements.items.appendChild(topDropZone);
*/