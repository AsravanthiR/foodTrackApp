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
const foodForm = document.getElementById("foodform")
const submit = document.getElementById("submitbutton")
const API= new FetchWrapper ("https://firestore.googleapis.com/v1/projects/programmingjs-90a13/databases/(default)/documents/")
endpoint="sravanthi"
function submitData(e) {
    e.preventDefault()
    
    let data = new FormData(foodForm)
    console.log(data.get("food"))
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
    //  Snackbar.show({text: 'Example notification text.'});



    const dynChart= document.getElementById("dynchart");
dynChart.innerHTML="";
dynChart.innerHTML=`<canvas id="myChart" width="400" height="400"></canvas>`

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["fat","proteine", "carbs" ],
        datasets: [{
            label: 'name of the food',
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
 const calories= Number(data.get("fat"))*4+Number(data.get("proteine"))*9+Number(data.get("carbs"))*4
 console.log(calories)
 //carbs*4+ protein *9+fat*4
}


//dont write anything here
submit.addEventListener("click", submitData)



//create the chart

