function openRawFile(drilldown)
{
    appInsights.trackEvent("drilldown", { page: drilldown, commit: '<!-- COMMITHERE -->' });
    window.open("/resume/" + drilldown + "?commit=<!-- COMMITHERE -->", "_blank"); 
}

function openGitHubCommit()
{
    appInsights.trackEvent("githubcommit", { commit: '<!-- COMMITHERE -->' });
    window.open("https://github.com/ZakSir/HireMe/commit/<!-- COMMITHERE -->", "_blank");
}

function openRawGitHubFile(fileName)
{
    appInsights.trackEvent("githubraw", {commit: '<!-- COMMITHERE -->', fileName: fileName});
    window.open("https://raw.githubusercontent.com/ZakSir/HireMe/<!-- COMMITHERE -->/" + fileName);
}

console.log("Working against commit <!-- COMMITHERE -->");

var rawdata = '<!-- JSONINJSHERE -->';
var data = JSON.parse(rawdata);
data.candidate.emailhref = "mailto:" + data.candidate.email;
data.visiblePage = ko.observable(1);
data.dateDisplay = ko.observable(0);

data.showJson = function() {
    data.visiblePage(0);
}

data.showHtml = function() {
    data.visiblePage(1);
}

data.toggleDateDisplay = function() { 
    data.dateDisplay(++(data.dateDisplay()) % 2);
}

var i;
for(i=0;i<data.proficiencies.length; i++)
{
    data.proficiencies[i].firstSkill = data.proficiencies[i].skillName[0];
}

for(i=0;i<data.experience.length; i++)
{
    // setup contractor stuff
    data.experience[i].contractorToVisible = ko.computed(function() {
        var result =  (typeof data.experience[i].contractorTo != 'undefined');

        return result;
    }, data);
    
    // contractor text
    data.experience[i].contractorToText = ko.computed(function() {
        if(typeof data.experience[i].contractorTo === 'undefined')
        {
            return "";
        }
        else{
            return data.experience[i].contractorTo;
        }
    }, data);

    // static property
    
    var startDateInMonths;
    var endDateInMonths;
    
    startDateInMonths= (data.experience[i].startDate.year * 12) + data.experience[i].startDate.months;

    if(data.experience[i].endDate === null) {
        var dtnow = Date.now();
        endDateInMonths = (dtnow.getFullYear() * 12) + dtnow.getMonth();
    } else {
        endDateInMonths = (data.experience[i].endDate.year * 12) + data.experience[i].endDate.months;
    }

    var years = Math.floor(startDateInMonths / 12);
    var months = endDateInMonths % 12;

    var timeSpanString;

    if(years > 0)
    {
        timeSpanString = years.toString() + " years " + months.toString() + "months";
    }
    else
    {
        timeSpanString = months.toString() + " months";
    }

    if(data.experience[i].endDate === null) {
        timeSpanString = timeSpanString + " (current position)";
    }

    data.experience[i].dateRangeDisplay = timeSpanString;
}

ko.applyBindings(data); 