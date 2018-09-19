
console.log("Lieutenant, javascript is linked");

$(document).ready(function() {

    console.log( "ready!" );

    // If localstorage has campaignNames, then use that list. If not, use the hardcoded list.
    if (localStorage.getItem("campaignNames")) {
        console.log('campaignNames exists already');
        campaignNames = JSON.parse(localStorage.getItem("campaignNames"));
    } else {
        console.log('campaignNames doesnt exist yet, populating now...');
        campaignNames = ["Chrome","Chromebook US","Chromebook CA","GCP DR","POM","Chrome Enterprise Security","G Suite DR",
            "G Suite Consideration","Express DR Q3","KOF H2","Google Maps Brand","Google Duo US Brand","YouTube Music DR",
            "YouTube Premium DR","YouTube TV DR","YouTube Artists Brand","Google Home Mini US:","Google Home Max US:",
            "Google Home CA:","Google Home QB:","Domains","G Suite","GCP","Chrome Enterprise","Adwords DR","Adwords Youtube DR",
            "Google Express","Google My Business","GA Free","Chrome Win 10","Chromebook US","Chromebook CA","Project Fi Brand",
            "Nest NA Q3 2018 North America - Nest.com Evergreen DR","[Nest EMEA Q3 2018 EMEA - Consumer DR]",
            "Google Store NA Q3 2018 North America - DR","Pixelbook NA Q2-Q3 2018 North America - DR",
            "Nest NA Q3 2018 North America - Nest.com Evergreen DR","[Nest EMEA Q3 2018 EMEA - Consumer DR]",
            "Play Store NA Q3 2018 - United States","Play Store NA Q3 2018 - Canada","YouTube TV DR Q3 2018",
            "YouTube Music DR Q2-Q4 2018","Project Fi Q3 2018","Google Assistant Q3 2018","Pixel NA '18 Q3 2018 United States",
            "Pixel NA '18 Q3 2018 Canada","Pixel Q3 US","Google Store Q3","Home Mini BD Q3","Pixelbook Q3 US","Play Evergreen",
            "Play Orson","Brand Editorial","Nest Pro B2B H2 2018","Chromebook US Q3","Orson","Nest EMEA Q3 2018 EMEA - Consumer DR",
            "Pixel NA '18 Q3 2018 US","Chrome DR","Chrome Brand (Birthday Campaign)"];

        localStorage.setItem("campaignNames", JSON.stringify(campaignNames));

    }

    // If localstorage has campaignNames, then use that list. If not, use the hardcoded list.
    if (localStorage.getItem("platformNames")) {
        console.log('platformNames exists already');
        platformNames = JSON.parse(localStorage.getItem("platformNames"));
    } else {
        console.log('platformNames doesnt exist yet, populating now...');
        platformNames = ["DV3","YouTube","DV360","Google Preferred","Custom Algo","Platform: YouTube","Platform: DV360","Google SEM","GDN",
            "Bing SEM","Google SEM:","Bing SEM:","GDN:","Yahoo SEM:","Yahoo SEM","Yahoo Native:","Yahoo Native","TrueView",
            "Bing","Yahoo","Presto - Bing","GMB - Bing","Google GDN","[Google SEM]","[Yahoo SEM]","[Bing SEM]","[GDN]",
            "[Google Ads SEM]","GDN Cases","GDN US & CA","Google SEM US","Google SEM CA","Google Cases","GDN In-App",
            "GDN RMKT+DCO","GDN Live Cases","Google SEM - DMA","Google SEM - Music","Google SEM - GPM","Google SEM - Premium",
            "Yahoo SEM - Music","Google SEM - YTO","UAC - Music","Google SEM - PLAs","-Google SEM","YT BR+DR","DV360 DR",
            "YT Brand","Spotify","DV360 Laptop Mag PG Deal","YT Brand","Spotify DV360","DV360 - Princesses and Moana Pre-Roll",
            "YT Brand  - 15MM, 40MM and Even Flighting Scenarios","YT Brand  - Burst","Yahoo Display","YouTube Music Scale Brand",
            "Bing SEM - Music"];

        localStorage.setItem("platformNames", JSON.stringify(platformNames));
    }


    // add campaigns and store
    $('#submitButtonCampaign').on('click',function() {
        var campaignInput = $('#input-campaign').val().trim();
        var campaignInputArray = campaignInput.split('\n');
        for (var n=0; n < campaignInputArray.length; n++) {
            campaignNames.push(campaignInputArray[n]);
        }

        // set campaignNames in localstorage as a string (updates it). Then repulls them and sets back to campaignNames
        localStorage.setItem("campaignNames", JSON.stringify(campaignNames));
        campaignNames = JSON.parse(localStorage.getItem("campaignNames"));
        console.log("new campaignNames",campaignNames);

        $('#input-campaign').val('');
    });

    // add platforms and store
    $('#submitButtonPlatform').on('click',function() {
        var platformInput = $('#input-platform').val().trim();
        var platformInputArray = platformInput.split('\n');
        for (var n=0; n < platformInputArray.length; n++) {
            platformNames.push(platformInputArray[n]);
        }

        // set platformNames in localstorage as a string (updates it). Then repulls them and sets back to platformNames
        localStorage.setItem("platformNames", JSON.stringify(platformNames));
        platformNames = JSON.parse(localStorage.getItem("platformNames"));
        console.log("new platformNames",platformNames);

        $('#input-platform').val('');
    });


    $("#submitButton").on("click",function() {
        $("#output").empty();
        var inputText = $("#input").val();

        // new method
        var inputTextArrayByLine = inputText.split(/\n/);

        var outputArray = [];

        // show campaigns for QA
        var outputCampaignArray = [];
        var outputCampaignArrayUnique = [];

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

                    // show campaigns for QA
                    outputCampaignArray.push(fixedCampaign);
                    console.log(outputCampaignArray);
                    
                }
            }

            function onlyUnique(value, index, self) { 
                return self.indexOf(value) === index;
            }
            outputCampaignArrayUnique = outputCampaignArray.filter( onlyUnique );
            $("#outputCampaigns").html("<p><strong>" + outputCampaignArrayUnique.length + " campaigns</strong></p>" + "<p>" + outputCampaignArrayUnique.join("\n") + "</p>");


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

        // UPDATE: tables do not format nicely w/ Excel. Not sure if only databases do.
        // NEXT STEPS: find another way to display the data so it's easier to c/p into Excel



    }); // end submit button click

    
});






