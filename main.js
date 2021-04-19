// to c
function createBtn(inputClass, buttonText) {
        let newBtn = document.createElement('button')
        newBtn.setAttribute('type', 'button')
        newBtn.setAttribute('class', inputClass)
        newBtn.innerText = buttonText
        return newBtn //important to return newBtn after function is executed
}

function getCleanValue(words) {
        let cleanWords = words.trim()
        if (cleanWords === "") {
                alert("Todo input cannot be empty")
                return //undefined
        }
        if (cleanWords.length > 20) {
                alert('Enter within the words limit')
                return //undefined
        }
        return cleanWords
}


window.onload = () => {

        console.log('DOM ready')

        // --- Part 1 ---

        // 1. Getting the input and button DOM elements
        let todoInput = document.querySelector('#todolist-input')
        let addTodoItemBtn = document.querySelector('#add-todo-btn')
        let listTodo = document.querySelector('#list-todo')
        let listCompleted = document.querySelector('#list-completed')


        // 2. Attach event handler for add todo button
        addTodoItemBtn.onclick = (event) => {
                event.preventDefault()

                // refactor: create getCleanValue() to trim, long words and undefined 
                let cleanInput = getCleanValue(todoInput.value)
                if (!cleanInput) return

                // create <li> item and append into 'things-to-do' <ul>
                let newLi = document.createElement('li')
                newLi.setAttribute("class", "todo-item todo text-center")

                // create <p> content element
                let newP = document.createElement('p')
                newP.innerText = cleanInput

                // info: createBtn(inputClass, buttonText){...}
                //  make 2 buttons inside 'things-to-do' <li>
                let doneBtn = createBtn("btn btn-primary", "Mark as Completed")
                let changeMindBtn = createBtn("btn btn-secondary", "Edit Task")

                // set attribute to open a modal to edit the text content
                changeMindBtn.setAttribute('data-bs-toggle', 'modal')
                changeMindBtn.setAttribute('data-bs-target', '#editingModal')
                changeMindBtn.onclick = (event) => {
                        // console.log("Editing button is working well") //checking the button
                        let newTaskInput = document.querySelector('#new-todolist-input')
                        let submitBtn = document.querySelector('#modal-submit')
                        submitBtn.onclick = (event) => {
                                event.preventDefault()
                                let cleanNewTask = getCleanValue(newTaskInput.value)
                                if (!cleanNewTask) {
                                        newTaskInput.value = ""
                                        return
                                }
                                newP.innerText = cleanNewTask
                                newTaskInput.value = ""
                        }
                }

                // append all element in the list
                newLi.appendChild(newP)
                newLi.appendChild(doneBtn)
                newLi.appendChild(changeMindBtn)

                // append <li> into <ul>
                listTodo.appendChild(newLi)

                // e. clear input value when new li is added successfully
                todoInput.value = ""

                // f. attach event handler on new li, to modify text with line-through
                doneBtn.onclick = () => {
                        newLi.setAttribute('class', 'todo-item completed text-center')
                        doneBtn.innerText = "Remove"
                        listCompleted.appendChild(newLi)
                        changeMindBtn.remove()

                        doneBtn.onclick = (event) => {
                                event.target.parentElement.remove();
                        }
                }
        }
}