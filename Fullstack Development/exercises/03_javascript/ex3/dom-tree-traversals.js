const allListItems = document.querySelectorAll('li');
//console.log(allListItems);
allListItems.forEach(li => {
        const descendants = li.getElementsByTagName('li');
        //console.log(descendants);
        if(descendants.length > 0)
        {
            const textContent = li.childNodes[0].nodeValue.trim();
            li.childNodes[0].nodeValue = `${textContent} (${descendants.length})`;
        }
    });