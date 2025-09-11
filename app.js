document.getElementById('menu-btn').addEventListener('click', function() {
    var desktopMenu = document.getElementById('navbar-mobile');
    desktopMenu.style.display = desktopMenu.style.display === 'flex' ? 'none' : 'flex';
})