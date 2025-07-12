// Custom JavaScript will go here

document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.querySelector('form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const courseType = document.getElementById('course-type').value;

            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, course_type: courseType })
            });

            const result = await response.json();
            alert(result.message);
            if (response.ok) {
                registrationForm.reset();
            }
        });
    }
});
