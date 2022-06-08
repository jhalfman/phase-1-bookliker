document.addEventListener("DOMContentLoaded", function() {
    fetch(`http://localhost:3000/books`)
    .then(resp => resp.json())
    .then(data => data.forEach(book => {
        const bookList = document.querySelector("#list");
        const newBookItem = document.createElement("li");
        newBookItem.innerText = book.title;
        newBookItem.addEventListener("click", e => {
            const showPanel = document.querySelector("#show-panel");
            showPanel.innerText = '';
            const bookPanel = document.createElement("div");
            bookPanel.innerHTML = `
            <img src="${book.img_url}">
            <h1>${book.title}</h1>
            <h2>${book.subtitle}</h2>
            <h3>Written by ${book.author}</h3>
            <p>${book.description}</p>
            <ul id="user-list"></ul>
            <button id="like-button">Like</button>
            `;
            book.users.forEach(user => {
                const newUser = document.createElement("li");
                const userList = bookPanel.querySelector("#user-list");
                newUser.innerText = user.username;
                userList.appendChild(newUser);
            })

            const likeButton = bookPanel.querySelector("#like-button");
            likeButton.addEventListener("click", e => {
                if (likeButton.innerText === "Like") {
                    likeButton.innerText = "Unlike";
                    const currentUserList = book.users;
                    currentUserList.push({id: 11, username: "jordan"})
                    
                    const newUser = document.createElement("li");
                    const userList = bookPanel.querySelector("#user-list");
                    newUser.innerText = "jordan";
                    userList.appendChild(newUser);

                    fetch(`http://localhost:3000/books/${book.id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({"users": currentUserList})
                    })
                    
                }
                else {
                    likeButton.innerText = "Like";
                }
            })

            showPanel.appendChild(bookPanel);
        })

        bookList.appendChild(newBookItem);
    }))
});
