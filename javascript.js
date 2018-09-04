
console.log("Lieutenant, javascript is linked");

$(document).ready(function() {

    console.log( "ready!" );

    var campaignNames = ["Chrome","Chromebook US","Chromebook CA","GCP DR","POM","Chrome Enterprise Security","G Suite DR","G Suite Consideration","Express DR Q3","KOF H2","Google Maps Brand","Google Duo US Brand","YouTube Music DR","YouTube Premium DR","YouTube TV DR","YouTube Artists Brand","Google Home Mini US:","Google Home Max US:","Google Home CA:","Google Home QB:","Domains","G Suite","GCP","Chrome Enterprise","Adwords DR","Adwords Youtube DR","Google Express","Google My Business","GA Free","Chrome Win 10","Chromebook US","Chromebook CA","Project Fi Brand","Nest NA Q3 2018 North America - Nest.com Evergreen DR","[Nest EMEA Q3 2018 EMEA - Consumer DR]","Google Store NA Q3 2018 North America - DR","Pixelbook NA Q2-Q3 2018 North America - DR","Nest NA Q3 2018 North America - Nest.com Evergreen DR","[Nest EMEA Q3 2018 EMEA - Consumer DR]","Play Store NA Q3 2018 - United States","Play Store NA Q3 2018 - Canada","YouTube TV DR Q3 2018","YouTube Music DR Q2-Q4 2018","Project Fi Q3 2018","Google Assistant Q3 2018","Pixel NA '18 Q3 2018 United States","Pixel NA '18 Q3 2018 Canada","Pixel Q3 US","Google Store Q3","Home Mini BD Q3","Pixelbook Q3 US","Play Evergreen","Play Orson","Brand Editorial","Nest Pro B2B H2 2018"];
    var platformNames = ["DV3","YouTube","DV360","Google Preferred","Custom Algo","Platform: YouTube","Platform: DV360","Google SEM","GDN","Bing SEM","Google SEM:","Bing SEM:","GDN:","Yahoo SEM:","Yahoo SEM","Yahoo Native:","Yahoo Native","TrueView","Bing","Yahoo","Presto - Bing","GMB - Bing","Google GDN","[Google SEM]","[Yahoo SEM]","[Bing SEM]","[GDN]","[Google Ads SEM]","GDN Cases","GDN US & CA","Google SEM US","Google SEM CA","Google Cases","GDN In-App","GDN RMKT+DCO","GDN Live Cases","Google SEM - DMA","Google SEM - Music","Google SEM - GPM","Google SEM - Premium","Yahoo SEM - Music","Google SEM - YTO","UAC - Music","Google SEM - PLAs","-Google SEM","YT BR+DR","DV360 DR","YT Brand","Spotify"];

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

                // if the evaluated line is a campaign, then make it active.
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
                    var fixedPlatform = currentLine.replace(/:|\[|\]/gi, "");
                    var fixedCampaign = activeCampaign.replace(/:|\[|\]/gi, "");
                    outputArray.push(" ",fixedCampaign,fixedPlatform);
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






