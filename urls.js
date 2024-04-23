const fs = require('fs');
const http = require('http');
const https = require('https');
const url = require('url');

const processFile = (urls.txt) => {
    fs.readFile(urls.txt, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file ${filename}: ${err.message}`);
            return;
        }

        const urls = data.split('\n');
        urls.forEach((urlString) => {
            if (urlString.trim()) {
                fetchUrlAndSaveContent(urlString.trim());
            }
        });
    });
};

const fetchUrlAndSaveContent = (urlString) => {
    try {
        const parsedUrl = new URL(urlString);
        const hostname = parsedUrl.hostname;
        const protocol = parsedUrl.protocol;

        const requester = protocol === 'https:' ? https : http;

        requester.get(urlString, (response) => {
            if (response.statusCode < 200 || response.statusCode > 299) {
                console.error(`Failed to fetch ${urlString}: Status Code ${response.statusCode}`);
                return;
            }

            let htmlData = '';
            response.on('data', chunk => htmlData += chunk);
            response.on('end', () => {
                fs.writeFile(hostname, htmlData, 'utf8', (err) => {
                    if (err) {
                        console.error(`Error writing to file ${hostname}: ${err.message}`);
                        return;
                    }
                    console.log(`Saved ${hostname}`);
                });
            });
        }).on('error', (err) => {
            console.error(`Error fetching ${urlString}: ${err.message}`);
        });
    } catch (err) {
        console.error(`Error with URL ${urlString}: ${err.message}`);
    }
};

if (process.argv.length < 3) {
    console.error('Usage: node urls.js FILENAME');
} else {
    const filename = process.argv[2];
    processFile(filename);
}
