
// Method for adding a todo to the database and reloading the page
(async function () {
    const todoMethods = {
        add: function (task) {
            $.ajax({
                method: "POST",
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({task: task}),
                url: '/add',
                success: function () {
                    location.reload(true);
                }
            });
        }
    };

    // Functionality for text input Add button
    const staticForm = document.getElementById("static-form");

    if(staticForm) {
        staticForm.addEventListener("submit", event =>{
            event.preventDefault();
            try {
                const task = document.getElementById('task').value;
                todoMethods.add(task);

            } catch(e) {
                const message = typeof e == "string" ? e : e.message;
            }
        });
    }

})();