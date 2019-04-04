
// console.log("Lieutenant, javascript is linked");

$(document).ready(function() {

    // If localstorage has campaignNames, then use that list. If not, use the hardcoded list.
    if (localStorage.getItem("campaignNames")) {
      campaignNames = JSON.parse(localStorage.getItem("campaignNames"));
    } else {
      campaignNames = campaignNameArray; // populated from ./data.js
      localStorage.setItem("campaignNames", JSON.stringify(campaignNames));
    }

    // If localstorage has campaignNames, then use that list. If not, use the hardcoded list.
    if (localStorage.getItem("platformNames")) {
      platformNames = JSON.parse(localStorage.getItem("platformNames"));
    } else {
      platformNames = platformNameArray; // populated from ./data.js
      localStorage.setItem("platformNames", JSON.stringify(platformNames));
    }

    // add campaigns and store to local storage
    $('#submitButtonCampaign').on('click', function() {
      var campaignInput = $('#input-campaign').val().trim();
      var campaignInputArray = campaignInput.split('\n');
      for (var n=0; n < campaignInputArray.length; n++) {
        campaignNames.push(campaignInputArray[n]);
      }

      // set campaignNames in localstorage as a string (updates it). Then repulls them and sets back to campaignNames
      localStorage.setItem("campaignNames", JSON.stringify(campaignNames));
      campaignNames = JSON.parse(localStorage.getItem("campaignNames"));

      $('#input-campaign').val('');
    });

    // add platforms and store to local storage
    $('#submitButtonPlatform').on('click',function() {
      var platformInput = $('#input-platform').val().trim();
      var platformInputArray = platformInput.split('\n');
      for (var n=0; n < platformInputArray.length; n++) {
          platformNames.push(platformInputArray[n]);
      }

      // set platformNames in localstorage as a string (updates it). Then repulls them and sets back to platformNames
      localStorage.setItem("platformNames", JSON.stringify(platformNames));
      platformNames = JSON.parse(localStorage.getItem("platformNames"));

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

            // show campaigns for QA
            outputCampaignArray.push(fixedCampaign);
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
        }
      }

      // print to the page
      // var outputArrayDisplay = outputArray.join("\n");
      // $("#output").text(outputArrayDisplay);
      for (var n=0; n < outputArray.length; n++) {
        var $outputEntry = $("<div>");
        $outputEntry.text(outputArray[n]);
        $outputEntry.addClass("output-field");
        $("#output").append($outputEntry);
      }


      // TODO:
      // put into a table
      // use the platform to separate the fields
      // get index of campaign names
      // use those indexes to say +1 +2 go into the tables
      // loop - if +6 (i.e. notes) === platform, then skip

      // UPDATE: tables do not format nicely w/ Excel. Not sure if only databases do.
      // NEXT STEPS: find another way to display the data so it's easier to c/p into Excel

  }); // end submit button click 
});

