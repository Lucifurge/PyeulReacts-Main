document.addEventListener('DOMContentLoaded', () => {
    Swal.fire({
        title: 'Important',
        text: 'Please use a dummy account for the cookie.',
        icon: 'warning',
        confirmButtonText: 'OK'
    });

    const form = document.getElementById('boost-form');
    const cookieInput = document.getElementById('cookie');
    const linkInput = document.getElementById('link');
    const reactionInput = document.getElementById('reaction');
    const loadingDiv = document.getElementById('loading');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const cookie = cookieInput.value.trim();
        const link = linkInput.value.trim();
        const reaction = reactionInput.value;

        if (!cookie || !link || !reaction) {
            Swal.fire({
                title: 'Error!',
                text: 'Please fill in all the fields correctly.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        loadingDiv.classList.remove('hidden');

        try {
            const apiUrl = `https://rplikers-credit-mahiro.onrender.com/api/react?cookie=${encodeURIComponent(cookie)}&link=${encodeURIComponent(link)}&react=${encodeURIComponent(reaction)}`;

            const response = await fetch(apiUrl, {
                method: 'GET',
            });

            const result = await response.json();

            loadingDiv.classList.add('hidden');

            if (result.success) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Successfully boosted the post. Please wait 20 minutes before boosting again. Thank you!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: result.message || 'An error occurred. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            loadingDiv.classList.add('hidden');
            Swal.fire({
                title: 'Error!',
                text: 'Failed to process your request. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            console.error('Error:', error);
        }
    });

    form.addEventListener('reset', () => {
        loadingDiv.classList.add('hidden');
    });
});
