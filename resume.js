function openRawFile(drilldown)
{
    appInsights.trackEvent("drilldown", { page: drilldown, commit: '<!-- COMMITHERE -->' });
    window.open("/resume/" + drilldown + "?commit=<!-- COMMITHERE -->", "_blank"); 
}