let matchaList =
JSON.parse(localStorage.getItem("matchaList")) || [];

function saveData(){
  localStorage.setItem("matchaList",
  JSON.stringify(matchaList));
}

function stars(r){
  return "⭐".repeat(r);
}

function renderList(){
  const list=document.getElementById("matchaList");
  list.innerHTML="";

  matchaList.forEach((m,index)=>{
    const card=document.createElement("div");
    card.className="card";

    card.innerHTML=`
      <div>
        <h3>${m.name}</h3>
        <p>${m.brand}</p>
        <div class="stars">${stars(m.rating)}</div>
      </div>
      <button class="delete"
      onclick="deleteMatcha(${index})">Delete</button>
    `;

    list.appendChild(card);
  });
}

function addMatcha(){
  const name=document.getElementById("name").value;
  const brand=document.getElementById("brand").value;
  const rating=parseInt(document.getElementById("rating").value);

  if(!name||!brand||rating<1||rating>5){
    alert("Fill properly!");
    return;
  }

  matchaList.push({
    name,brand,rating,date:new Date()
  });

  saveData();
  renderList();

  document.getElementById("name").value="";
  document.getElementById("brand").value="";
  document.getElementById("rating").value="";
}

function deleteMatcha(i){
  matchaList.splice(i,1);
  saveData();
  renderList();
}

function sortMatcha(){
  const val=document.getElementById("sortSelect").value;

  if(val==="ratingHigh")
    matchaList.sort((a,b)=>b.rating-a.rating);
  else if(val==="ratingLow")
    matchaList.sort((a,b)=>a.rating-b.rating);
  else if(val==="name")
    matchaList.sort((a,b)=>
      a.name.localeCompare(b.name));
  else
    matchaList.sort((a,b)=>
      new Date(b.date)-new Date(a.date));

  saveData();
  renderList();
}

renderList();