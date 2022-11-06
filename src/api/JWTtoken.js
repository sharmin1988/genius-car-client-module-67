export const JwtToken = (user) => {
    const currentUser = {
        email: user.email
    }

    fetch('https://genius-car-server-zeta-six.vercel.app/jwt', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(currentUser)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            localStorage.setItem('genius-token', data.token)
        })
}