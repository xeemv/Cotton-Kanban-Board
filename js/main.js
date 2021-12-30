import Kanban from "./view/Kanban.js";

new Kanban(
    document.querySelector(".kanban")
);

/*
import kanbanAPI from "./api/kanbanAPI.js";
 
- importing the api class file
- import kanbanAPI from "./api/kanbanAPI."; --> how it will import like
    - ** you must add .js at the of the ./api/kanbanAPI part. **

- when testing this out, the console log will not print anything
- per tutorial, will need to comment out everything in the html file from code line 18 - 36
    - basically anything under the kanban class
- in your browser:
    - look for storage or check under application for storage
    - look for 'local Storage'
    - ** at this point, there is no key in the local storage which we need to add.**


- test:
- first test: console.log(kanbanAPI.getItems(1));
- second test: console.log(kanbanAPI.insertItem(2, "I am new!"));
    - console printed: Object { id: 154128, content: "I am new!" }
                        content: "I am new!"
​                       id: 154128
- first updateItem test:
    - kanbanAPI.updateItems(412715);
        - How it will look printed in the console:
            Object { id: 412715, content: "I am new!" }
            content: "I am new!"
            id: 412715
            <prototype>: Object { … }
        ** code line 25 - 28 is the item you are changing based on the id
        ** code line 31- 45 is the actual column object containing the id of the column
        - along w/ the list of all the current items inside the column including the item we are trying to update   
            Object { id: 2, items: (11) […] }
            id: 2
            items: Array(11) [ {…}, {…}, {…}, … ]
            0: Object { id: 412715, content: "I am new!" }
            1: Object { id: 880568, content: "I am new!" }
            2: Object { id: 307810, content: "I am new!" }
            3: Object { id: 782637, content: "I am new!" }
            4: Object { id: 960053, content: "I am new!" }
            5: Object { id: 154128, content: "I am new!" }
            6: Object { id: 201154, content: "I am new!" }
            7: Object { id: 765877, content: "I am new!" }
            8: Object { id: 670496, content: "I am new!" }
            9: Object { id: 702978, content: "I am new!" }
            10: Object { id: 424485, content: "I am new!" }
            length: 11
- first updatedItem test:
    - kanbanAPI.updateItem(412715, {
    columnId: 1,
    position: 0,
});
    - results no longer show this id in the second column
- second updatedItem test w/ new content:
    kanbanAPI.updateItem(412715, {
        columnId: 1,
        position: 0,
        content: "I've changed."
    });

- 1st deleteItem test:    
    - kanbanAPI.deleteItem(412715);
        - will not see this item in the local storage anymore
*/

