import Modal from "./Modal/modal.js";

// Getting the API
fetch("https://jsonplaceholder.typicode.com/posts",
{
    method: "GET",
})
.then(function(res) {
    return res.json();
})
.then(function (json) {
    let postTitle = document.querySelectorAll("#postTitle")
    let postBody = document.querySelectorAll("#postBody")
    for (let i = 0; i < postTitle.length; i++) {
        const titleApi = json[i];
        postTitle[i].textContent = titleApi["title"]
        postBody[i].textContent = titleApi["body"]
    }
})

//Generate main page
var bodyVar = document.body
var divBlogs = document.createElement("div")
divBlogs.className = "container"
var theadHtml = document.createElement("thead")
theadHtml.innerHTML = "<tr><th scope='col'></th><th scope='col'>Blog Name</th><th scope='col'>Blog body</th></tr>"
var tableHtml = document.createElement("table")
tableHtml.className = "table table-hover"
divBlogs.appendChild(tableHtml)
tableHtml.appendChild(theadHtml)
for (let i = 1; i<7; i++) {
var tbodyHtml = document.createElement("tbody")
tbodyHtml.innerHTML = "<tr class='h-50 mainRow'><th id='number' scope='row'>"+ i +"</th><td id='postTitle'></td><td id='postBody'></td><td><svg style='cursor:pointer' xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-pencil-square edit' viewBox='0 0 16 16'><path class='edit' d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z'/><path class='edit' fill-rule='evenodd' d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'/></svg></td><td><svg style='cursor:pointer' xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-x-circle delete' viewBox='0 0 16 16'><path class='delete' d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'/><path class='delete' d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'/></svg></td></tr>"
tableHtml.appendChild(tbodyHtml)
}
bodyVar.appendChild(divBlogs)


//Add Event Listeners
function openModal(e) {
    e.stopPropagation();
    
    if(e.target instanceof SVGElement){
        //Edit
        if(e.target.classList.contains("edit")){
            if(e.target instanceof SVGPathElement) {
                new Modal(e.target.parentNode.parentNode.parentNode.children[1].textContent, e.target.parentNode.parentNode.parentNode.children[2].textContent, true, 
                    fetchPosts(e.target.parentNode.parentNode.parentNode.children[0].textContent));
            }
            else new Modal(e.target.parentNode.parentNode.children[1].textContent, e.target.parentNode.parentNode.children[2].textContent, true,
                fetchPosts(e.target.parentNode.parentNode.children[0].textContent));
        }
        //Delete
        if(e.target.classList.contains("delete")){
            if(e.target instanceof SVGPathElement) {
                fetch("https://jsonplaceholder.typicode.com/posts/" + e.target.parentNode.parentNode.parentNode.children[0].textContent,{
                    method: "DELETE",
                })
                $(e.target.parentNode.parentNode.parentNode).remove();
            }
            else {
                fetch("https://jsonplaceholder.typicode.com/posts/" + e.target.parentNode.parentNode.children[0].textContent,{
                    method: "DELETE",
                })
                $(e.target.parentNode.parentNode).remove();
            }
        }
        
    //View Modal
    } else {
        new Modal(e.target.parentNode.children[1].textContent, e.target.parentNode.children[2].textContent, false,
            fetchPosts(e.target.parentNode.children[0].textContent));
    }
}

async function fetchPosts(id){
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/" + id,
        {
            method: "GET",
        });
    const json = await res.json();
    return json;
}

var mainRow = document.getElementsByClassName("mainRow")
for (let i = 0; i < mainRow.length; i++) {
    mainRow[i].addEventListener("click", openModal)
}

$(window).on("scroll", function() {
    if(Math.trunc($(window).scrollTop() + 2) >= $(document).height() - $(window).height()) {
        fetch("https://jsonplaceholder.typicode.com/posts",
        {
            method: "GET",
        })
        .then(function(res) {
            return res.json();
        })
        .then(function (json) {
            let postTitle = document.querySelectorAll("#postTitle")
            let postBody = document.querySelectorAll("#postBody")
            for (let i = 0; i < postTitle.length; i++) {
                const titleApi = json[i];
                postTitle[i].textContent = titleApi["title"]
                postBody[i].textContent = titleApi["body"]
            }
        })
        const limit = 100;
        var number = document.querySelectorAll("#number")
        if(number.length < limit) {
            for (let i = number.length; i < number.length + 5; i++) {
                var newNumb = i + 1;
                if(newNumb <= limit){    
                var tbodyHtml = document.createElement("tbody");
                    tbodyHtml.innerHTML = "<tr class='h-50 mainRow'><th id='number' scope='row'>"+ newNumb +"</th><td id='postTitle'></td><td id='postBody'></td><td><svg style='cursor:pointer' xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-pencil-square edit' viewBox='0 0 16 16'><path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z'/><path fill-rule='evenodd' d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'/></svg></td><td><svg style='cursor:pointer' xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-x-circle delete' viewBox='0 0 16 16'><path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'/><path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'/></svg></td></tr>"
                    tableHtml.appendChild(tbodyHtml);
                    mainRow[i].addEventListener("click", openModal);
                }
            }
        }
    }
});