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