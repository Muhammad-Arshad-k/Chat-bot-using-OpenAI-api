let prompt = document.getElementById("prompt")
let ask    = document.getElementById("ask")
let result = document.getElementById("results");

ask.addEventListener ("click",async()=>{
    let question = prompt.value;
    let responsiveDiv = document.createElement("div");
    responsiveDiv.classList.add("response");
    let question_text = `<p>😎 ${question}</p>`;
    responsiveDiv.innerHTML += question_text;
    responsiveDiv.innerHTML+= `<p>🤖thinking.......</p>`
    result.appendChild(responsiveDiv )
    try{
        let response = await fetch("http://localhost:4000/ask",{
            method:"POST",
            headers:{'content-type':'application/json'},
            body:JSON.stringify({prompt:question})
        });
        let response_data = await response.json();
        responsiveDiv.innerHTML=`${question_text}<p>🤖${response_data.data}</p>`
    }catch(error){
        responsiveDiv.innerHTML=`${question_text}<p>🤖 sorry... something went wrong</p>`
    }
});
