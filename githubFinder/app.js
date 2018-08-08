//Init github
const github = new GitHub;

//Init UI
const ui = new UI;

//search input
const searchUser = document.getElementById('searchUser');

let timeout = null;
//search input event listener
searchUser.addEventListener('keyup', (e) => {
    //Clears timeout, if it has already been set
    clearTimeout(timeout);

    //get input text
    const userText = e.target.value;

    //Create timeout, to prevent search requests from going off too frequently
    timeout = setTimeout(() => {
        if (userText !== '') {

            //Make HTTP call
            github.getUser(userText)
                .then(data => {
                    if (data.profile.message === 'Not Found') {
                        //Show alert
                        ui.showAlert('User not found', 'alert alert-danger')
                    } else {
                        //Show profile
                        ui.showProfile(data.profile);
                        console.log(data)
                        ui.showRepos(data.repos);
                    }
                })

        } else {
            // Clear profile
            ui.clearProfile()
        }
    }, 600)
});