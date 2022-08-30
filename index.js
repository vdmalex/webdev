// get reference
const linkCategory = document.querySelector("#linkCategory");
const submitButton = document.querySelector("#submitButton");
const addBtn = document.querySelector("#addBtn");
const cancelButton = document.querySelector("#cancelButton");
const addLinkPanel = document.querySelector("#addLinkPanel");
const linkList = document.querySelector("#linksList");
const addedCategories = document.querySelector("#addedCategories")
let linkCategories = [];
let editIndex = -1;
let links = [
    {
        title: 'New Link1',
        url:'url.com',
        categories: ['node','angular']
    },
    {
        title: 'New Link2',
        url:'url.com2',
        categories: ['js','angular']
    },
    {
        title: 'New Link3',
        url:'url.com3',
        categories: ['node','bootstrap']
    },
];

displayLinks();
linkCategory.addEventListener('keydown',function(event){
    if(event.keyCode === 188){
        event.preventDefault(); // don't add comma to input
        linkCategories.push(linkCategory.value);
        console.log("user pressed comma");
        linkCategory.value = ''; // clear the inputs
        //display updated categories 
        displayLinkCategories();
    }
})
addBtn.addEventListener('click', event =>{
    console.log("add")
    event.preventDefault();
    showFormPanel();

});
cancelButton.addEventListener('click', event =>{
    console.log("cancel")
    event.preventDefault();
    hideFormPanel();

});
console.log(addLinkPanel.classList);

function showFormPanel(){
    addLinkPanel.classList.remove('hidden');
    displayLinkCategories();
}

function hideFormPanel(){
    addLinkPanel.classList.add('hidden');
    clearLinkForm();
}
function displayLinkCategories(){
    console.log("Displaying link categories...")
    addedCategories.innerHTML = '' ;
    for(let category of linkCategories){
        var categoryHTMLString = `<span class="category">${category}</span>`;
        addedCategories.innerHTML += categoryHTMLString;
    }
    console.log(addedCategories)

}

function clearLinkForm(){
    linkTitle.value = ''
    linkUrl.value = ''
    linkCategories = [];
    linkCategories.value ='';
    addedCategories.innerHTML = '';
}

submitButton.addEventListener('click', event =>{ // don't need parentheses around event if only 1 arg
    event.preventDefault();


    const title = linkTitle.value;
    const url = linkUrl.value
    const categories = linkCategories

    const newLink = {
        title,
        url,
        categories
    }
    if(editIndex ===-1){
        links.unshift(newLink); // unshift = add to begining, push = add to end  
    }
    else{
        links[editIndex] = newLink;
        editIndex = -1;
    }
    clearLinkForm()
    displayLinks();
    hideFormPanel();
});

function displayLinks(){
    linkList.innerHTML = ''; // reset linkList can optimize...
    let index = 0;
    for(let link of links){
        let linkHTMLString =`
        <div class = "flex-item">
        <div class="link panel">
        <div class="link-options">
          <button class="btn-sm" onclick ="editLink(${index})">Edit</button>
          <button class="btn-sm" onclick ="deleteLink(${index})">Delete</button>
        </div>
        <a href="${link.url}">
          <h1 class="header">
            ${link.title}
          </h1>
        </a>
        <p class="link-date">${Date.now()}</p>
        <div class="categories">
          Categories:`;
          for(let category of link.categories){
            linkHTMLString += `<span class="category">${category}</span>`;
          }
          linkHTMLString += `
          </div>
          </div>
          </div>
        `
        index++;
        linkList.innerHTML += linkHTMLString;
    }
}

function deleteLink(index){
    links.splice(index,1); // where, howmany
    displayLinks();
}


function editLink(index){
    console.log("editing link at index ", index);
    editIndex = index;
    linkTitle.value = links[index].title;
    linkUrl.value = links[index].url;
    linkCategories = links[index].categories;
    showFormPanel();
}