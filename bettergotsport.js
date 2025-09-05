// ==UserScript==
// @name         bettergotsport
// @namespace    http://tampermonkey.net/
// @version      2025-09-03
// @description  make gotsport easier
// @author       You
// @match        https://system.gotsport.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gotsport.com
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';

    unsafeWindow.initStackedModal = function() {
        try{
            if ($ === undefined) return;
        } catch (e) {
            return;
        }

        const stack = [];

        console.log("init StackedModal");

        let clickBound = false;
        //const $=jQuery;


        $(document).on('show.bs.modal', '#global-modal', function(event) {
            console.log("bs modal showing, clickBound is", clickBound);
            if (clickBound) return;
            const clickBindingTarget = [
                '#roster-player-table tr[id^="player"] a[href^="/users/"]',
                '#roster-players-table tr[id^="player"] a[href^="/users/"]',
                '#roster-coach-table tr[id^="coach"] a[href^="/users/"]',
                '#roster-coaches-table tr[id^="coach"] a[href^="/users/"]',
                '#roster-manager-table tr[id^="manager"] a[href^="/users/"]',
                '#roster-managers-table tr[id^="manager"] a[href^="/users/"]',
                '#team-regs-table a[href^="/team_registrations/"]',
            ];
            const clickHandler = function() {
                console.log("[stack]stack modal when showing roster ");
                stack.push($("#global-modal").html());
            };
            clickBindingTarget.forEach(selector=>$('#global-modal').on('click', selector, clickHandler));
            clickBound = true;
        });

        $(document).on('hide.bs.modal', '#global-modal', function(event) {
            console.log("bs modal hiding");
            if (stack.length > 0) {
                event.preventDefault();
                console.log("[stack]show stacked modal");
                const lastModalHTML = stack.pop();
                $("#global-modal").html(lastModalHTML);
                // window.initTooltip();
            } else {
                console.log("closing modal");
            };
        });
    };

    window.setTimeout(()=>{
        unsafeWindow.initStackedModal();
    }, 3000);
})();