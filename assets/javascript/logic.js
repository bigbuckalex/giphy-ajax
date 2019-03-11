let animals = ["dog","cat","mouse","rabbit","chicken","horse","deer","butterfly","fish"];

for(let i=0; i<animals.length; i++){
    let button = $("<button>").text(animals[i]);
    $("#buttons").append(button);
}

$("#buttons").on("click", "button", function(){
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?api_key=4GmNEhtk6If81wENyRfYSDsdsnR8DHzZ&q="+ $(this).text() +"&limit=10&offset=0&rating=PG-13&lang=en",
        method: "GET"
    }).then(function(response){
        for(let i=0; i<10; i++){
            let card = $("<span class='card' style='width: 18rem;'>");
            let img = $("<img class='card-img-top'>");
            let cardBody = $("<div class='card-body'>");
            let cardText = $("<p class='card-text'></p>");
            let stillUrl = response.data[i].images.fixed_height_still.url;
            let animatedUrl = response.data[i].images.fixed_height.url;
            card.append(img);
            card.append(cardBody);
            cardBody.html(cardText);
            img.attr("src", stillUrl);
            img.attr("still-url", stillUrl);
            img.attr("animated-url", animatedUrl);
            cardText.text("Rating: " + response.data[i].rating);
            $("#gifs").prepend(card);
            img.attr("data-animated","still");
        }
    })
})

$("#gifs").on("click", "img", function(){
    if($(this).attr("data-animated") === "still"){
        let move = $(this).attr("animated-url");
        let stop = $(this).attr("still-url");
        $(this).attr("src", move);
        $(this).attr("still-Url", stop);
        $(this).attr("data-animated", "animated");
    }
    else{
        let move = $(this).attr("animated-url");
        let stop = $(this).attr("still-url");
        $(this).attr("src", stop);
        $(this).attr("animated-Url", move);
        $(this).attr("data-animated", "still");
    }
})

$("#submit-button").click(function(){
    if($("#animal-input").val()!=""){
        let newAnimal = $("#animal-input").val().toLowerCase();
        let button = $("<button>").text(newAnimal);
        $("#buttons").append(button);
        animals.push(newAnimal);
        $("#animal-input").val("");
        updateButtons();
    }
})

function updateButtons(){
    $("#buttons").empty();
    for(let i=0; i<animals.length; i++){
        let button = $("<button>").text(animals[i]);
        $("#buttons").append(button);
    }
}