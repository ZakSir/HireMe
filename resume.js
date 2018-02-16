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
data.visiblePage = ko.observable(0);



data.showJson = function() {
    data.visiblePage(0);
}

data.showHtml = function() {
    data.visiblePage(1);
}

var i;
for(i=0;i<data.proficiencies.length; i++)
{
    data.proficiencies[i].firstSkill = data.proficiencies[i].skillName[0];
}

for(i=0;i<data.experience.length; i++)
{
    data.experience[i].contractorToVisible = ko.pureComputed(function() {
        var result =  (typeof data.experience[i].contractorTo != 'undefined');

        console.log(result);

        return result;
    }, data);
    
    data.experience[i].contractorToText = ko.pureComputed(function() {
        return data.experience[i].contractorTo !== "" ? data.experience[i].contractorTo : "";
    }, data);
}

ko.applyBindings(data); 