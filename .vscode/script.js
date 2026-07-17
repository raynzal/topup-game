// Simple JavaScript for interactivity

// Fungsi untuk proses top-up game
function processTopUp(game) {
    // Sanitasi nama game untuk ID HTML (ganti spasi dengan '-', dan 'of' dengan '-of-')
    const sanitizedGame = game.toLowerCase().replace(/ /g, '-').replace('of', 'of');
    const amountSelect = document.getElementById(sanitizedGame + '-amount');
    const useridInput = document.getElementById(sanitizedGame + '-userid');
    
    const amount = amountSelect ? amountSelect.value : '';
    const userid = useridInput ? useridInput.value : '';
    
    if (!userid) {
        alert('Please enter your User ID!');
        return; // Hentikan jika User ID kosong
    }
    
    // Di aplikasi nyata, ini akan kirim data ke server (misalnya via Fetch API)
    // Contoh: fetch('/api/topup', { method: 'POST', body: JSON.stringify({ game, amount, userid }) });
    alert(`Top-up request for ${game}: ${amount} submitted! Check your email for confirmation. (Demo mode)`);
}

// Fungsi untuk toggle form login/register
function toggleForm() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}

// Event listener untuk submit form login (demo)
document.querySelector('.login-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Cegah reload halaman
    const email = document.querySelector('.login-form input[type="email"]').value;
    const password = document.querySelector('.login-form input[type="password"]').value;
    if (email && password) {
        alert('Login successful! Welcome back. (Demo mode - No real authentication)');
    } else {
        alert('Please fill in all fields!');
    }
});

// Event listener untuk submit form register (demo)
document.querySelector('.register-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Cegah reload halaman
    const nickname = document.querySelector('.register-form input[type="text"]').value;
    const email = document.querySelector('.register-form input[type="email"]').value;
    const password = document.querySelector('.register-form input[type="password"]').value;
    if (nickname && email && password) {
        alert(`Registration successful for ${nickname}! Check your email to verify. (Demo mode)`);
    } else {
        alert('Please fill in all fields!');
    }
});

// Smooth scrolling untuk link navigasi (href mulai dengan #)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Inisialisasi: Pastikan script dimuat setelah DOM siap
document.addEventListener('DOMContentLoaded', function() {
    console.log('ZallStore website loaded successfully!');
    // Bisa tambah kode lain di sini, misalnya load data game dari API
});
