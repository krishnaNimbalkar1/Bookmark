const input = document.getElementById('input-el');
const saveBtn = document.getElementById('save-btn-el');
const saveTabBtn = document.getElementById('save-tab-btn-el');
const deleteBtn = document.getElementById('delete-btn-el');
const ulEl = document.getElementsByClassName('list')[0];
let x = [];
let listItems = "";

if(localStorage.getItem('leads')){
    x= JSON.parse(localStorage.getItem('leads'));
    render(x)
}

saveBtn.addEventListener('click', function(){
    x.push(input.value);
    console.log(x);
    input.value = '';
    render(x);
    localStorage.setItem('leads', JSON.stringify(x));
})

function render(data){
    listItems='';
    for (let i=0; i<data.length; i++)
    {
        listItems += `
        <li><a href='${data[i]}' target='_blank'> ${data[i]}</a></li>
        `;
    }
    ulEl.innerHTML=listItems;
}

deleteBtn.addEventListener('dblclick', function(){
    localStorage.clear();
    x=[];
    render(x);
})

saveTabBtn.addEventListener('click', function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        x.push(tabs[0].url);
        localStorage.setItem('leads', JSON.stringify(x));
        render(x);
        console.log(tabs)
    });
});