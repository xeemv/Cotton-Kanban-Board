import Column from "./Column.js";

/*  
- this is the view of the kanban board or the user interface
    - what the user will interact with
*/

/* 
- import columns file into this file using code line 5
*/




export default class Kanban {
    constructor(root) {
        this.root = root;


        Kanban.columns().forEach(column => {
            /* todo: create an instance of column class
                - basically this means that we need to have a new javascript class to define the user interface for an individual column that is displayed to the user.
                - this will be done by creating a new js file called Columns.js
            */
           const columnView = new Column(column.id, column.title);

           this.root.appendChild(columnView.elements.root); 
        });
    }

    static columns(){
        return [
            {
                id: 1,
                title: "Brain Board"
            },
            {
                id: 2,
                title: "Not Started"
            },
            {
                id: 3,
                title: "In Progress"
            },
            {
                id: 4,
                title: "Completed"
            }
        ];
    }
}

/*
- code line starting at line 6:
    - using root:
        - means we will take the kanban div container from the html file will be generated using this js file
            - the kanban div will hold all of the kanban 

- code line 8:
    - this.root = root; -->
        - just to keep a reference

- code line 26:
    - static method called columns that will return the array of every column the user has
        - along w/ the name and title
    - ** Per tutorial, it was mentioned that it would be better to retrieve the title from the server side
        - however, we are keeping it simple using the data stored in the local server **

- code line 22:
    - this.root.appendChild(columnView.elements.root); -->
        - this is regarding the main container on the html file div tag
*/