
console.log("Lieutenant, javascript is linked");

$(document).ready(function() {

    console.log( "ready!" );

    var campaignNames = ["Chrome","Chromebook US","Chromebook CA","GCP DR","POM","Chrome Enterprise Security","G Suite DR","G Suite Consideration","Express DR Q3","KOF H2"];
    var platformNames = ["DV3","YouTube","DV360","Google Preferred","Custom Algo","Platform: YouTube","Platform: DV360"];

    $(".submitButton").on("click",function() {
        var inputText = $("#input").val();

        // new method
        var inputTextArrayByLine = inputText.split(/\n/);

        var outputArray = [];

        for (var n=0; n < inputTextArrayByLine.length; n++) {
            var currentLine = inputTextArrayByLine[n].trim();
            console.log(currentLine);

            var activeCampaign;
            for (var m=0; m < campaignNames.length; m++) {
                if (currentLine === campaignNames[m]) {
                    activeCampaign = currentLine;
                    console.log("activeCampaign set!");
                }
            }

            for (var p=0; p < platformNames.length; p++) {
                var platform = platformNames[p];
                if (currentLine === platform) {
                    // push campaign name to array first
                    outputArray.push("",activeCampaign);

                    outputArray.push(currentLine);
                    console.log("added!");
                }
            }

            // find colons and push rest of characters to outputArray
            var colonFound = currentLine.indexOf(":");
            var platformFound = currentLine.indexOf("Platform");
            if (colonFound >= 0 && platformFound < 0) {   
                var splicedString = currentLine.slice(colonFound + 1).trim();
                outputArray.push(splicedString);
                console.log("added!");

            }

        }
        var outputArrayDisplay = outputArray.join("\n");
        $("#output").text(outputArrayDisplay);


    });
    
});






