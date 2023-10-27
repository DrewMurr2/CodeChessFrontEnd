import { LoginTab } from './login/index.js';
import { SetupTab } from './setup/index.js';
import { InstructionsTab } from './instructions/index.js';
import { GameTab } from './game/index.js';
import { StatsTab } from './stats/index.js';

let tabsContent = [LoginTab, SetupTab, InstructionsTab, GameTab, StatsTab]
export function loadAllTabs() {
    console.log('loaded all tabs')
    for (let tab of tabsContent)
        document.getElementById(tab.id).innerHTML = tab.html

    setTimeout(() => {
        document.querySelectorAll('.tab-link').forEach(button => {
            button.addEventListener('click', (event) => openTab(event, button.getAttribute('data-tab')));
        });
        tabsContent.forEach(tab => tab.load())
    },
        100);

}

function openTab(evt, tabName) {
    // Get all elements with class="tab-content" and hide them
    let tabContent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    // Get all elements with class="tab-link" and remove the class "active"
    let tabLinks = document.getElementsByClassName("tab-link");
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}