async function getCurrentTabUrl(): Promise<string | undefined> {
  //[tab] is the equivalent of tabs[0] in the query result.
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true});
  return tab?.url;
}

const readButtonQuery = document.querySelector("#read-tab");
const outputQuery = document.querySelector("#output");

if (!(readButtonQuery instanceof HTMLButtonElement) || !(outputQuery instanceof HTMLElement)) {
  throw new Error("Popup markup must include a button#read-tab and an element#output.");
}

const readButton = readButtonQuery;
const output = outputQuery;

function showOutput(message: string): void {
  output.textContent = message;
}

async function handleReadCurrentTab(): Promise<void> {
  readButton.disabled = true;
  try {
    const url = await getCurrentTabUrl();
    showOutput(url === undefined ? "No URL was returned for the active tab." : url);
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown error.";
    showOutput(`Could not read the current tab. ${detail}`);
  } finally {
    readButton.disabled = false;
  }
}

readButton.addEventListener("click", () => {
  void handleReadCurrentTab();
});
