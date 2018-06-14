var database = firebase.database()
var companiesRef = database.ref('/companies/repair-watch/0')
companiesRef.on('value', companies=>{
    const myStore = companies.val()
    console.log(myStore)
    document.querySelector('.store-name').textContent = myStore.name
    document.querySelector('.store-info').textContent = myStore.description
    document.querySelector('.reputations').textContent = myStore.reputs.map(r=>r.repute).join('\n')
    
})