const axios = require("axios");

const RAW_URL_START = 'https://raw.githubusercontent.com';
const GITHUB_COM = 'github.com'
const HTTPS_GITHUB_COM = `https://${GITHUB_COM}`
const HTTP_GITHUB_COM = `http://${GITHUB_COM}`
const { URL } = process.env

const handler = async event => {
    try {
        const repoUrl = JSON.parse(event.body).repo;

        console.log(`DEBUG: unprocessed url: ${repoUrl}`);

        if (repoUrl === '') {
            console.log(`ERROR: repoUrl empty`);
            return {
                statusCode: 400,
                body: JSON.stringify({error: 'repoUrl empty'})
            }
        }

        if (!repoUrl.includes(GITHUB_COM)) {
            console.log(`ERROR: Only GitHub repos are supported`);
            return {
                statusCode: 400,
                body: JSON.stringify({error: 'Only GitHub repos are supported'})
            }
        }

        let rawPackageUrl = repoUrl;

        if (rawPackageUrl.startsWith('github.com')) {
            rawPackageUrl = rawPackageUrl.replace(GITHUB_COM, RAW_URL_START);
        } else if (rawPackageUrl.startsWith(HTTPS_GITHUB_COM) || rawPackageUrl.startsWith(HTTPS_GITHUB_COM)) {
            rawPackageUrl = rawPackageUrl
                .replace(HTTPS_GITHUB_COM, RAW_URL_START)
                .replace(HTTP_GITHUB_COM, RAW_URL_START);
        } else {
            console.log(`ERROR: Repo url format not supported`);
            return {
                statusCode: 400,
                body: JSON.stringify({error: 'Repo url format not supported'})
            }
        }

        rawPackageUrl = rawPackageUrl.concat('/master/package.json');
        console.log(`DEBUG: Package json url: ${rawPackageUrl}`);

        const { data: packageJson } = await axios({
            method: 'GET',
            url: rawPackageUrl
        });

        const packageNames = Array.from(new Set([
            ...Object.keys(packageJson.dependencies || {}),
            ...Object.keys(packageJson.devDependencies || {}),
        ])).filter(pkg => !pkg.includes('@'));

        if (packageNames.length === 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({error: 'Project does not have any dependencies or devDependencies'})
            };
        }

        console.log(`DEBUG: packageNames: ${JSON.stringify(packageNames)}`);

        const vulns = await axios({
            url: `${URL}/.netlify/functions/checkPackages`,
            method: 'POST',
            data: {
                packageNames
            }
        });

        return {
            statusCode: 200,
            body: JSON.stringify(vulns.data)
        };
    } catch (e) {
        console.log(e)
        return {
            statusCode: 500
        };
    }

};

module.exports = {handler}
