document.addEventListener('userDataReady', function(event) {

    const users = JSON.parse(event.detail.jsonText);
    const contactsDiv = document.getElementById('contacts');
    const template = document.getElementById('user-card-template');
    //const template = document.querySelector('#user-card-template');
    //const contactsDiv = document.querySelector('#contacts');

    const docFrag = document.createDocumentFragment();


    users.forEach(user => {
        const userCard = template.content.cloneNode(true); //textContent?
        
        userCard.querySelector('img').src = user.avatar;
        userCard.querySelector('img').alt = `${user.firstName} ${user.lastName}`;
        userCard.querySelector('h1').textContent = `${user.firstName} ${user.lastName}`
        userCard.querySelector('.email').textContent = user.email;
        userCard.querySelector('.phone span').textContent = user.phoneNumber;
        userCard.querySelector('.address p:nth-child(1)').textContent = user.address.streetAddress;
        userCard.querySelector('.address p:nth-child(2)').textContent = `${user.address.zipCode} ${user.address.city}`;
        userCard.querySelector('.address p:nth-child(3)').textContent = user.address.country;
        userCard.querySelector('.homepage a').href = user.homepage;
        userCard.querySelector('.homepage a').textContent = user.homepage;

        docFrag.appendChild(userCard);
    });
    contactsDiv.appendChild(docFrag);
});

fetchUserData();