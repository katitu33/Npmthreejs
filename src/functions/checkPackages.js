const axios = require("axios");

const {API, username} = process.env;

const handler = async event => {

    try {
        console.log(`DEBUG: packages: ${JSON.stringify(event.body)}`);

        const {data: report} = await axios(
            {
                url: 'https://ossindex.sonatype.org/api/v3/component-report',
                method: 'POST',
                auth: {
                    username: username,
                    password: API
                },
                data: {
                    "coordinates": JSON.parse(event.body).packageNames.map(pkg => {
                        return `pkg:npm/${pkg}@latest`
                    })
                }
            }
        );

        const vulns = report.reduce((prev, curr) => {
            if (curr.vulnerabilities.length === 0) {
                return prev;
            }

            return [
                ...prev,
                {
                    pkg: curr.coordinates.replace('pkg:npm/', '').replace('@latest', ''),
                    pkgDescription: curr.description,
                    vulns: curr.vulnerabilities
                }
            ]
        }, [])

        return {
            statusCode: 200,
            body: JSON.stringify(vulns)
        };
    } catch (e) {
        console.log(e);
        return {
            statusCode: 500
        };
    }

};

module.exports = {handler}
