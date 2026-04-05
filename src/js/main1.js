const logIn=document.querySelector('.btn-sigin');
const signUp=document.querySelector('.regis-button');
const tenant=document.querySelector('.btn-detail');
const saveData=document.querySelectorAll('.btn-save');
const adminTrigger = document.getElementById('adminTrigger');
const logoutMenu = document.getElementById('logoutMenu');
const add=document.querySelector('.btn-market');

//Login
if(logIn){
    logIn.addEventListener('click', function(e){
        e.preventDefault();
        window.location.href='dashboard.html';
    });
}
if(signUp){
    signUp.addEventListener('click', function(e){
        e.preventDefault();
        window.location.href='dashboard.html';
    });
}
//liat tenant
if(tenant){
    tenant.addEventListener('click', function(){
    console.log('wait yaa...')
    window.location.href='tenant.html';
})
}

if (adminTrigger && logoutMenu) {
    adminTrigger.addEventListener('click', function(e) {
        e.stopPropagation(); 
        logoutMenu.classList.toggle('show');
    });
    document.addEventListener('click', function() {
        logoutMenu.classList.remove('show');
    });
}

//save data
if(saveData){
    saveData.forEach(function(link){
        link.addEventListener('click', function(e){
            e.preventDefault();
            window.location.href='setting-market.html';
        })
    })
}

//nambah tenant
if(add){
    add.addEventListener('click', function(){
        window.location.href='seting-document.html';
    })
}











//Navbar
// const navlink=document.querySelectorAll('nav a');
// navlink.forEach(function(link){
//     link.addEventListener('click', function(e){
//         e.preventDefault();
//         navlink.forEach(function(atas){
//              atas.classList.remove('active');
//         });
//        this.classList.add('active')
//     });
// })