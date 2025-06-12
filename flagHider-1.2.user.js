// ==UserScript==
// @name         Hide Flag Users on X (formerly Twitter)
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Hides posts from users with specified flag emojis in their name on X
// @author       L00taveli
// @match        https://x.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Array of flag emojis to hide (add or remove as needed)
    const flagsToHide = [
        '🇨🇦', // Canada
        '🇺🇸', // Ukraine
        '🇮🇱'. // Israel
        '🇵🇸', // Palestine
        '🇪🇺', // European Union
        '🏳️‍⚧️', // Transgender Flag
        '🏳️‍🌈', // Pride Flag
        '🇷🇺', // Russian Flag
        // Add more flags here, e.g., '🇫🇷' for France, '🇩🇪' for Germany, etc.
        // '🇬🇧', // United Kingdom
    ];

    // Function to check and hide posts
    function hideFlagUsers() {
        // Select all user names in tweets, quote tweets, and reposts
        const userNames = document.querySelectorAll('span[data-testid="User-Name"], div[data-testid="User-Name"]');

        userNames.forEach(name => {
            // Check if the name contains any of the specified flags
            if (flagsToHide.some(flag => name.textContent.includes(flag))) {
                // Find the closest parent tweet element
                const tweet = name.closest('article');
                if (tweet) {
                    tweet.style.display = 'none';
                    console.log('Hid element from user: ' + name.textContent);
                }
            }
        });
    }

    // Run the function initially
    hideFlagUsers();

    // Create an observer to watch for new content
    const observer = new MutationObserver(hideFlagUsers);

    // Start observing the document for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
