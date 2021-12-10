const core = require('@actions/core');
const parser = require('xml-js');
const fs = require('fs');
const request = require('request');
async function run() {
    try {
        const zip = core.getInput('zip');

        const profile = core.getInput('profile');
        const jsonData = JSON.parse(parser.xml2json(profile, { compact: true, spaces: 2 }));
        const zipProfile = jsonData.publishData.publishProfile.find(p => p._attributes.publishMethod == 'ZipDeploy');

        const attrs = zipProfile._attributes;
        const userName = attrs.userName;
        const password = attrs.userPWD;
        const url = `https://${attrs.publishUrl}/api/zipdeploy`;
        const authHeader = `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`;
        fs.createReadStream(zip).pipe(request.put(url, {
            headers: {
                Authorization: authHeader
            }
        }));
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();