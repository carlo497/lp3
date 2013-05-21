function getVotingPageUrl() {
  return "http://lp3.polskieradio.pl/glosowanie/";
}
function isVotingPageUrl(url) {
  return url.indexOf(getVotingPageUrl()) == 0;
}
function goToVotingPage() {
  console.log('Going to voting page...');
  chrome.tabs.getAllInWindow(undefined, function(tabs) {
    for (var i = 0, tab; tab = tabs[i]; i++) {
      if (tab.url && isVotingPageUrl(tab.url)) {
        console.log('Found LP3 tab: ' + tab.url + '. ' +
                    'Focusing and refreshing count...');
        chrome.tabs.update(tab.id, {selected: true});
        startRequest({scheduleRequest:false, showLoadingAnimation:false});
        return;
      }
    }
    console.log('Could not find voting tab. Creating one...');
    chrome.tabs.create({url: getVotingPageUrl()});
  });
}
chrome.browserAction.onClicked.addListener(goToVotingPage);