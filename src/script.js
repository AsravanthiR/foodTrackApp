class FetchWrapper {
    constructor(baseURL) {
      this.baseURL = baseURL;
    }
  
    get(endpoint) {
      return fetch(this.baseURL + endpoint).then((response) => response.json());
    }
  
    put(endpoint, body) {
      return this._send("put", endpoint, body);
    }
  
    post(endpoint, body) {
      return this._send("post", endpoint, body);
    }
  
    patch(endpoint, body) {
      return this._send("patch", endpoint, body);
    }
  
    delete(endpoint, body) {
      return this._send("delete", endpoint, body);
    }
  
    _send(method, endpoint, body) {
      return fetch(this.baseURL + endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((response) => response.json());
    }
  }
  const startLoader = (element) => {
    element.innerHTML = `<div class="loading-spinner"></div>`;
  };
  
  const stopLoader = (element, value) => {
    element.textContent = value;
  };
const foodForm = document.getElementById("foodform")
const submit = document.getElementById("submitbutton")
const API= new FetchWrapper ("https://firestore.googleapis.com/v1/projects/programmingjs-90a13/databases/(default)/documents/")
endpoint="sravanthi"
function submitData(e) {
    e.preventDefault()
    
    let data = new FormData(foodForm)
    //Sconsole.log(data.get("food"))
    const newData= {
        fields: {
            carbs: {
              integerValue: data.get("carbs").toString()
            },
            protein: {
                integerValue: data.get("proteine").toString()
            },
            name: {
                stringValue: data.get("food")
            },
            fat: {
                integerValue: data.get("fat").toString()
            }
          }
    }
    API.post(endpoint,newData)
    foodForm.reset();
    //Snackbar.show({
      //width: "220px",
      //text: `Details of ${data.get("food").toString()} added //successfully`,
    //});


    const dynChart= document.getElementById("dynchart");
dynChart.innerHTML="";
dynChart.innerHTML=`<canvas id="myChart" width="400" height="400"></canvas>`

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["fat","proteine", "carbs" ],
        datasets: [{
            label: 'Macronutrients',
            data: [data.get("fat"), data.get("proteine"), data.get("carbs")],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
                
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
              
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// write in here
 //const calories= Number(data.get("fat"))*4+Number(data.get("proteine"))*9+Number(data.get("carbs"))*4
 //console.log(calories)
 //carbs*4+ protein *9+fat*4
 let card = document.getElementById("card");
  let totalCal = 0;
  let totalCal2= 0;
  API.get(endpoint).then((repos) => {
    let calList = repos.documents;
    if (typeof calList !== "undefined") {
      let allFields = calList.map((i) => i.fields);
      console.log(allFields);
      allFields.map((i) => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const h2 = document.createElement("h2");
        h2.classList.add("h2_class");
        h2.innerText = `name${Object.values(i.name)}`;
        todoDiv.appendChild(h2);
        const cardTitle = document.createElement("h2");
        cardTitle.classList.add("cardTitle");
        cardTitle.innerText = ` total calories is ${
          (Number(Object.values(i.carbs)) + Number(Object.values(i.proteine))) *4 +Number(Object.values(i.fat)) * 9
        }`;
        todoDiv.appendChild(cardTitle);
        const final_todo = document.createElement("div");
        final_todo.classList.add("final_todo");
        let p_fat = document.createElement("p");
        p_fat.classList.add("p_fat");
        p_fat.innerText = `fat: ${Object.values(i.fat)} `;
        final_todo.appendChild(p_fat);

        let p_proteine = document.createElement("p");
        p_proteine.classList.add("p_proteine");
        p_proteine.innerText = ` proteine: ${Object.values(i.proteine)} `;
        final_todo.appendChild(p_proteine);

        let p_carbs = document.createElement("p");
        p_carbs.classList.add("p_carbs");
        p_carbs.innerText = ` carbs: ${Object.values(i.carbs)}`;
        final_todo.appendChild(p_carbs);

        todoDiv.appendChild(final_todo);

        card.appendChild(todoDiv);
      });

      allFields.map((i) => {
        totalCal +=
          (Number(Object.values(i.carbs)) + Number(Object.values(i.proteine))) *
            4 +
          Number(Object.values(i.fat)) * 9;
      });
    }
    totalCal2 =
      (Number(data.get("carbs")) + Number(data.get("proteine"))) * 4 +
      Number(data.get("fat")) * 9;
    //calories calculations
    let log = document.getElementById("log");
    log.innerHTML = `<p id="logValue"></p>`;
    let logValue = document.getElementById("logValue");
    let calc = totalCal + totalCal2;
    logValue.innerText = `Total calories logged: ${calc} cal`;
  });
};

submit.addEventListener("click", submitData);








