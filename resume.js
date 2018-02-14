// /////////////////////////////////// //
// Bonus points, thanks for looking :) //
// /////////////////////////////////// //

function openRawFile(drilldown)
{
    appInsights.trackEvent("drilldown", { page = drilldown });
    window.open("/resume/" + drilldown + "?commit=<!-- COMMITHERE -->", "_blank");
}