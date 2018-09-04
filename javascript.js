
console.log("Lieutenant, javascript is linked");

$(document).ready(function() {

    console.log( "ready!" );

    var campaignNames = ["Chrome","Chromebook US","Chromebook CA","GCP DR","POM","Chrome Enterprise Security","G Suite DR","G Suite Consideration","Express DR Q3","KOF H2"];
    var platformNames = ["DV3","YouTube","DV360","Google Preferred","Custom Algo","Platform: YouTube","Platform: DV360","Google SEM","GDN","Bing SEM","Google SEM:","Bing SEM:","GDN:","Yahoo SEM:","Yahoo Native:","Yahoo Native","TrueView","Bing","Yahoo","Presto - Bing","GMB - Bing"];

    $("#submitButton").on("click",function() {
        $("#output").empty();
        var inputText = $("#input").val();

        // new method
        var inputTextArrayByLine = inputText.split(/\n/);

        var outputArray = [];

        for (var n=0; n < inputTextArrayByLine.length; n++) {
            var currentLine = inputTextArrayByLine[n].trim();
            console.log(currentLine);

            // sets the active campaign till the next one is listed
            var activeCampaign;
            for (var m=0; m < campaignNames.length; m++) {
                if (currentLine === campaignNames[m]) {
                    activeCampaign = currentLine;
                    console.log("activeCampaign set!");
                }
            }

            // adds in platform and campaign if it's a platform
            for (var p=0; p < platformNames.length; p++) {
                var platform = platformNames[p];
                if (currentLine === platform) {
                    // push campaign name to array first
                    outputArray.push(" ",activeCampaign);

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
        // print to the page
        // var outputArrayDisplay = outputArray.join("\n");
        // $("#output").text(outputArrayDisplay);
        console.log(outputArray);
        for (var n=0; n < outputArray.length; n++) {
            var $outputEntry = $("<div>");
            $outputEntry.text(outputArray[n]);
            $outputEntry.addClass("output-field");
            $("#output").append($outputEntry);
        }




        // put it into a table here! use the platform to separate the fields
        // get index of campaign names
        // use those indexes to say +1 +2 go into the tables
        // loop - if +6 (i.e. notes) === platform, then skip



    }); // end submit button click

    // copy button click event
    // $("#copyButton").on("click", function() {
    //     var copyText = $("#output");
    //     copyText.select();
    //     document.execCommand("copy");
    //     alert("Copied the text: " + copyText.value);
    // });
    
});






