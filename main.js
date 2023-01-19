import "./css/settings.scss";

class Todo {
  constructor(text) {
    this.text = text;
    this.isCompleted = false;
  }
}

class ShowAlert {
  constructor(text, importance) {
    this.text = text;
    this.importance = importance;
    this.alert(this.text, this.importance);
  }
  alert(text, importance) {
    const alert = document.createElement("div");
    const message = document.createElement("p");
    message.className = "message";
    message.innerText = text;
    alert.appendChild(message);
    alert.className = "alert";

    switch (importance) {
      case "error":
        alert.style.backgroundColor = "#e25858";
        break;
      case "sucsses":
        alert.style.backgroundColor = "#228636";
        break;
      case "remove":
        alert.style.backgroundColor = "#caae21";

      case "completed":
        alert.style.backgroundColor = "#1199e3";
        break;
      default:
    }
    document.body.appendChild(alert);

    setTimeout(() => {
      alert.classList.add("active");
    });

    setTimeout(() => {
      alert.classList.toggle("active");
    }, 3000);
    setTimeout(() => {
      alert.remove();
    }, 5000);
  }
}

class ToDoList {
  constructor(selectedHtmlElement) {
    this.todos = [
      {
        text: "Ghbdsn!",
        isCompleted: false,
      },
    ];
    this.completed = [];
    this.selectedHtmlElement =
      selectedHtmlElement || document.querySelector("#app");
    this.render(this.todos);
  }

  render(todoArray) {
    this.selectedHtmlElement.innerHTML = "";
    this.layout();
    this.addListWithToDo(todoArray);
  }

  addToDoToList(text) {
    console.log("addToDoToList", text);
    if (text == "" || text == null) {
      // alert("The field cannot be empty");
      const showAlert = new ShowAlert("The field cannot be empty", "error");
    } else {
      this.todos.push(new Todo(text));
      const showAlert = new ShowAlert("Your addind new todo", "sucsses");
    }
    this.render(this.todos);
  }

  addListWithToDo(todoArray) {
    const ul = document.createElement("ul");
    ul.className = "todo_list";
    todoArray.forEach((todo, todoIndex) => {
      const li = document.createElement("li");
      const check_input = document.createElement("input");
      const label = document.createElement("label");
      const check_box = document.createElement("span");
      check_box.className = "check_box";
      check_input.type = "checkbox";
      check_input.className = "check_input";
      li.innerText = todo.text;
      li.className = "todo_item";
      //
      check_input.checked = todo.isCompleted;

      if (todo.isCompleted) {
        li.classList.add("completed");
      } else {
        li.classList.remove("completed");
      }

      label.appendChild(check_input);
      label.appendChild(check_box);
      li.insertAdjacentElement("afterbegin", label);

      //trashWrapper
      const trash = document.createElement("div");
      trash.classList = "trash";

      trash.addEventListener("click", () => {
        ul.removeChild(li);
        this.todos = this.todos
          .slice(0, todoIndex)
          .concat(this.todos.slice(todoIndex + 1, this.todos.length));
        this.render(this.todos);
        const showAlert = new ShowAlert("Todo remove", "remove");
      });

      const todoCompleted = (e) => {
        console.log("first");
        if (todo.isCompleted) {
          todo.isCompleted = false;
          e.target.classList.remove("completed");
          check_input.checked = false;
          this.todos[todoIndex].completed = false;
        } else {
          const showAlert = new ShowAlert("todo is completed", "completed");
          e.target.classList.add("completed");
          todo.isCompleted = true;
          check_input.checked = true;
        }
      };

      check_box.addEventListener("click", todoCompleted);
      li.addEventListener("click", todoCompleted);

      li.appendChild(trash);
      ul.appendChild(li);
    });
    this.selectedHtmlElement.querySelector(".main").appendChild(ul);
  }

  layout() {
    // header
    const header = document.createElement("header");
    header.className = "header";
    // logo
    const logo = document.createElement("img");
    logo.src = "./img/logo.svg";
    logo.alt = "logo";
    header.appendChild(logo);
    // input_wrapper
    const input_wrapper = document.createElement("div");
    input_wrapper.className = "input_wrapper";
    header.appendChild(input_wrapper);
    // input
    const input = document.createElement("input");
    input.className = "input";
    input.type = "text";
    input.placeholder = "Add a new task";
    // button
    const button = document.createElement("button");
    button.className = "button";
    button.innerText = "Create";
    const plus_img = document.createElement("img");
    plus_img.src = "./img/plus.svg";
    plus_img.alt = "plus";
    button.appendChild(plus_img);
    input_wrapper.appendChild(input);
    input_wrapper.appendChild(button);

    button.addEventListener("click", () => {
      this.addToDoToList(input.value);
      input.value = "";
    });

    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.addToDoToList(input.value);
        input.value = "";
      }
    });

    // main
    const main = document.createElement("main");
    main.className = "main";

    this.selectedHtmlElement.appendChild(header);
    this.selectedHtmlElement.appendChild(main);
  }
}
const todo = new ToDoList();
