let savedSelection;
let formatStatus = {};

function saveSelection() {
    let selection = window.getSelection();
    savedSelection = selection.getRangeAt(0);
}

function toggleFormat(command) {
    let noteText = document.getElementById('noteText');
    noteText.focus();
    document.execCommand(command, false, null);
    updateButtonAppearance(command);
}

function toggleList(command) {
    let noteText = document.getElementById('noteText');
    noteText.focus();
    document.execCommand(command, false, null);

    // Update formatStatus for list-related commands
    formatStatus['insertUnorderedList'] = document.queryCommandState('insertUnorderedList');
    formatStatus['insertOrderedList'] = document.queryCommandState('insertOrderedList');

    updateButtonAppearance(command);
}

function toggleHeading(heading) {
    let noteText = document.getElementById('noteText');
    noteText.focus();

    let range = savedSelection;
    let existingHeading = getClosestParentElement(range.commonAncestorContainer, heading);

    if (existingHeading) {
        // If the closest parent is already a heading of the same type, convert it to a paragraph
        let p = document.createElement('p');
        p.innerHTML = existingHeading.innerHTML;
        existingHeading.parentNode.replaceChild(p, existingHeading);
        formatStatus[heading.toLowerCase()] = false; // Set format status to false for the heading
    } else {
        // Otherwise, create a new heading
        document.execCommand('formatBlock', false, heading);
        formatStatus[heading.toLowerCase()] = true; // Set format status to true for the heading
    }

    updateButtonAppearance(heading.toLowerCase());
}

function disableHeaders() {
    let noteText = document.getElementById('noteText');
    noteText.focus();
    document.execCommand('formatBlock', false, 'p'); // Set the format to 'p' for paragraph
    formatStatus['h1'] = false;
    formatStatus['h2'] = false;
    formatStatus['h3'] = false;
    updateButtonAppearance('h1');
    updateButtonAppearance('h2');
    updateButtonAppearance('h3');
}

function getClosestParentElement(element, tagName) {
    while (element && element.tagName !== tagName.toUpperCase()) {
        element = element.parentNode;
    }
    return element;
}

function updateButtonAppearance(command) {
    let button = document.getElementById(command + 'Button');

    // Check if the button element is found
    if (button) {
        formatStatus[command] = !formatStatus[command];

        if (formatStatus[command]) {
            button.classList.add('selected');
        } else {
            button.classList.remove('selected');
        }
    } else {
        console.error(`Button element with id '${command}Button' not found.`);
    }
}

function handleInput() {
  
}
