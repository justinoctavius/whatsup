//-------------------------------Main-----------------------------------------------------------------
async function fetchAndShowGroups() {
    const groups = await fetchGroups();
    if(groups.length > 0){
        const groupsValidated = await validateGroups(groups);
        document.getElementById('groups').innerHTML = ''
        groupsValidated.map(async (group) => {
            await showGroups(group);
        });
    }
};