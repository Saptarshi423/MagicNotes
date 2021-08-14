console.log("Welcome to notes app. This is app.js");
showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    if (addTxt.value == "") {
        alert("Please write something in order to Add");
    }

    else if (addTxt.value != "") {
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }
        notesObj.push(addTxt.value);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addTxt.value = "";
        //   console.log(notesObj);
        showNotes();
    }
});

// Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
            <div class="card border-info mb-3 noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-header" style="background-color: #4C4C6D; color:white;"> Note ${index + 1}</div>
                    <div class="card-body">
                        <p class="card-text" style="color: blue height: 50px;"> ${element}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary"
                        style="border-radius: 1rem; margin-top:80px;
                        margin-right:50px;margin-left:60px;" >Delete Note</button>
                    </div>
                </div>`;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}


//Deelet a Note
function deleteNote(index) {
    console.log("Deleting node ", index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}


//Search Notes
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
    console.log("Input event fired!");
    let inputVal = search.value;
    let noteCards = document.getElementsByClassName('noteCard');

    Array.from(noteCards).forEach(function (element) {

        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        //console.log(cardTxt);
    })

});