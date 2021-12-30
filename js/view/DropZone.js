/* 
- this js file will contain a majority of the code for the drag and drop function of the kanban board.
- also see it in the html file, code line 28, the kanban drop zone
*/

import KanbanAPI from "../api/KanbanAPI.js";

export default class DropZone{
    static createDropZone() {
        const range = document.createRange();

        range.selectNode(document.body);

        const dropZone = range.createContextualFragment(`
            <div class="kanban__dropzone"></div>
        `).children[0];


        /* todo: 
        - now that we have a drag and drop zone, we need to add the css class of active to give the user an impression that they can actually drop the item here
        */
        dropZone.addEventListener("dragover", e => {
            e.preventDefault();
            dropZone.classList.add("kanban__dropzone--active");
        });

        dropZone.addEventListener("dragleave", () => {
            dropZone.classList.remove("kanban__dropzone--active");
        });

        dropZone.addEventListener("drop", e => {
            e.preventDefault();
            dropZone.classList.remove("kanban__dropzone--active");

            const columnElement = dropZone.closest(".kanban__column");
            const columnId = Number(columnElement.dataset.id);
            const dropZoneInColumn = Array.from(columnElement.querySelectorAll(".kanban__dropzone"));
            const droppedIndex = dropZoneInColumn.indexOf(dropZone);
            const itemId = Number(e.dataTransfer.getData("Text/plain"));
            const droppedItemElement = document.querySelector(`[data-id="${itemId}"]`);
            const insertAfter = dropZone.parentElement.classList.contains("kanban__item") ? dropZone.parentElement : dropZone;


            if (droppedItemElement.contains(dropZone)){
                return;
            }

          
            insertAfter.after(droppedItemElement);
            KanbanAPI.updateItem(itemId, {
                columnId,
                position: droppedIndex
            });


            //console.log(droppedItemElement);
            // test this by doing: console.log(columnElement, columnId);
            // the result in the console is: <div class="kanban__column" data-id="2"> 2 DropZone.js:36:21
            // testing console.log(droppedItemElement);
            // - result is this: <div class="kanban__item" draggable="true" data-id="36210">DropZone.js:41:21
        });

        return dropZone;
    }
}


/*
- code line 20:
    - dropZone.addEventListener("dragover", e => {
            e.preventDefault();
        }) --->
        - this is important to ensure that dra and drop actually works in differnt scenarios

- code line 25 - 26:
    -  dropZone.addEventListener("dragleave", () => {
            dropZone.classList.remove("kanban__dropzone--active"); -->
        - this will remove the acitve class where there is a shadow under the current item that the user is trying to place the new item into

- code line 33:
    - const columnElement = dropZone.closest(".kanban__column"); -->
        - this will give you the html element for the column which this drop zone is inside of

- code line 34:
    - const columnId = Number(columnElement.dataset.id); -->
        - this dataset.id will be pulled from the column.js file w/in the export default class column section

- code line 37:
    - const itemId = Number(e.dataTransfer.getData("Text/plain")); -->
        - this will get you the item Id from the item.js file

- code line 44 - 46:
    - KanbanAPI.updateItem(itemId, {
                columnId,
                position: droppedIndex
            }); --->
    - having the api call to update the item

- code line 41:
    - const insertAfter = dropZone.parentElement.classList.contains("kanban__item") ? dropZone.parentElement : dropZone; -->
        - this code is to check if drop zone is part of your kanban item
        - it will want to check if item is from the item.js file
            - const bottomDropZone = DropZone.createDropZone(); ----> code line 6
            - if it is, you will need to append that parentElement
        - this code will insert after the parent
            - aka after the kanban item itself

- code line 44:
    - if (droppedItemElement.contains(dropZone)){
                return;
            } --->
        - this is created to prevent bugs
        - if an item is drag into its own drop zone, we are going to do nothing
        - we do not need to update the api again


*/




