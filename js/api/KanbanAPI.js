/* 
- This js file will contain all the local storage components
*/

export default class KanbanAPI{
    static getItems(columnId){
        const column = read().find(column => column.id == columnId);

        if (!column) {
            return [];
        }
        return column.items;
    }


    static insertItem(columnId, content){
        const data = read();
        const column = data.find(column => column.id == columnId);
        const item = {
            id: Math.floor(Math.random() * 100000),
            content /* would be content: content, but the short hand method is just "content"*/
        };

        if (!column) {
            throw new Error("Column does not exist.");
        }

        column.items.push(item);
        save(data);

        return item;
    }

    static updateItem(itemId, newProps){
        const data = read();
        const [item, currentColumn] = (() => {
            for (const column of data) {
                const item = column.items.find(item => item.id == itemId);

                if (item) {
                    return [item, column];
                }
            }
        }) ();
        

        if (!item) {
            throw new Error("Item not found.");
        }

        item.content = newProps.content === undefined ? item.content : newProps.content;
        /* 
        - if we are providing the content property inside the new props parameter or argument
        - we can just say it is equal to undefined
        - it would be user/our bad and for the local storage to use our current value 
        - or say new props.content
        */


        // update column and position for the drag and drop
        if (
            newProps.columnId !== undefined
            && newProps.position !== undefined
        ) {
            const targetColumn = data.find(column => column.id == newProps.columnId);
            

            if (!targetColumn){
                throw new Error("Target column not found.");
            }

            // delete the item from it's current column by telling it to splice 1
            currentColumn.items.splice(currentColumn.items.indexOf(item), 1);

            // move item to it's new column and position
            targetColumn.items.splice(newProps.position, 0, item);
        }
        save(data);
    }

    static deleteItem(itemId){
        const data = read();

        for (const column of data) {
            const item = column.items.find(item => item.id == itemId);

            if (item) {
                column.items.splice(column.items.indexOf(item), 1);
            }
        }
        save(data);
    }

}
/* 
- code line 5 
    - will allow us to import the class into the other js files
- line 6 will contain a bunch of static methods
- will contain functions to interact w/ the local storage directly
- code line 5:
    - dealing with the api that will be getting all of the items inside a particular column
    
- code line 6:
    - static getItems(columnId){} --> static will get items then pass through column Id 
    - this will simply get a reference to the column which the user is trying to receive
    
- code line 7:
    - const column = read().find() --> read from the local storage
    - we will get an array from the find method below
    - grab each column and heck is the column.Id equal to the column Id is being passed into
    - if so, it is going to find it and put it inside the const.
    - column Id is in the read function, i.e. code line 32
    
- code line 9 - 11:    
    - if (!column) {return [];} --> if there's no column:
        - return an empty array
    
- code line 12:
    - return column.items; --> if item is found, then all is good and return that items array
    
- code line 14:
    - static insertItem(columnId, content){ -->
        - this is so that when you are inserting an item here, you need to know what the column id is 
    - const data = read(); --> this will read the data and help find the column which the user is trying to insert into
        - const column = data().find(column => column.id == columnId);
            - this part will be saving the data const into the local storage
            - basically saying data. find (get me) the column wiht the same id which we are passing into the method here
    - const item = { --> the new item to be inserted
        - id: Math.floor(Math.random() * 1000000), --> 
            - this is going to generate a random Id using this method times 1million
            - usually in a real world application, you would generate this id on the server side
                - for this project, we will use client-side javascript
        - content --> w.e the user passes in
    - if (!column) {} --> if the column doesn't exist, an error message will be thrown out
    -  column.items.push(item); --> everything goes well and the column does exist
        - add that item to the bottom of the list
    - save(data); --> this will save the data back to the local storage
    - return item; --> return the newly created item
    
- code line 32:    
    - static updateItems(itemId, newProps){ --> the update method
        - passing through an item id
        - we are going to update the second property/second parameter
        - using newProps object --> going to contain the info to update for this item
            - could include: color, position, the content itself


- code line 36, const item = column.items.find(item => item.id == itemId);
        - the item inside the parantheses is different from the const item
        - it is a loop to check is the item being looked at has the same id
            - if it does, it will retun it into the const item
        

- code line 38 and 39, if (item) { return [item, column];}
    - this means when you call the updated item method, you will reeive the item object and current column it is in
    
    
- code line 50-62:
    -    if (
            newProps.columnId !== undefined
            && newProps.position !== undefined
        )
        - the position in this part is just referring to the column itself 
            - basically between 0 and the amount of items inside your column


- code line 63:
    - const targetColumn = data.find(column => column.id == newProps.columnId);
    - we are saying that if the column id matches the new props column id, then we have the targeted column

- code line 79:
    - static deleteItem(itemId){ -->
        - delete an item
        - will include a for loop:
            - for (const column of data) { -->
                - this will find the item by it's id
                - if no item is found, mention that
            - use this code: const item = column.items.find(item => item.id == itemId); ---> 
                - code was from the static updateItem section, code line 36 


*/

function read(){
    const json = localStorage.getItem("kanban-data");

    if (!json){
        return[
            {
                id: 1, 
                items: []   
            },
            {
                id: 2, 
                items: []   
            },
            {
                id: 3, 
                items: []   
            },
            {
                id: 4, 
                items: []   
            },
        ];
    }
    /* 
- to read from the local storage directly
- const json = localStorage.getItem("kanban-data");
    - to get the items of kanban dash data
- if (!json) ---> this means if this is the user's first time in their browser
    - return the default data:
        - will need 3 columns (code line 18)
            - id: 1 --> the in progress column which will contain an empty items array
        - now copy and paste the id & items to make additional columns w/ different names
            - video made only 3, I'm making 4
    - default data is code line 18 - 35 and will load when the user is loading the kanban board for the first time
*/
    return JSON.parse(json);
    /* 
    - this section is when the user is returning to their session or their board
    */
}

function save(data){
    localStorage.setItem("kanban-data", JSON.stringify(data));
}
/* 
- this is the save function starting at code line 54
- the purpose is of this function is returning the data from function read
- localStorage.setItem("kanban-data", JSON.stringify(data));
    - is saying that the local storage will pass through the kanban data through to the JSON stringify then the data and finally save that data.
*/
