document.addEventListener('DOMContentLoaded', () => {
    //Step 1 : get button id 
    const registerBtn = document.getElementById('registerBtn');
    const loginBtn = document.getElementById('loginBtn');
    const addPaperBtn = document.getElementById('addPaperBtn');
    const editPaperBtn = document.getElementById('EditPaperBtn');
    const PaperwithdrawBtn = document.getElementById('PaperWithDraw');
    const viewPapersBtn = document.getElementById('viewPapersBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const rewierAssignment = document.getElementById('reviewerAssignment');

    const paperRiview  = document.getElementById('paperRiview');  //REVIEW state
    const paperStatus  = document.getElementById('paperStatus'); 
    /*
    const paperRejection  = document.getElementById('paperRejection'); // not ready yet //DECISION state
    const paperFinalSubmission  = document.getElementById('paperFinalSubmission'); // not ready yet // FINAL_SUBMISSION state
    const paperAcceptance  = document.getElementById('paperAcceptance'); // not ready yet //presented state
    */
    //Conference buttons
    const createConference = document.getElementById('createConference');
    const updateConference = document.getElementById('updateConference');
    const searchConferenceBtn = document.getElementById('searchConference');
    const viewConference = document.getElementById('viewConference');
    const deleteConference = document.getElementById('deleteConference'); 
    const changeConferenceStatus = document.getElementById('changeConferenceStatus');

    //Step 2 : get Container id 

    const paperRiviewContainer = document.getElementById('paperRiviewContainer');
    const paperApprovalContainer = document.getElementById('paperApprovalContainer');
    /*
    const paperRejectionContainer = document.getElementById('registerContainer');// not ready yet
    const paperFinalSubmissionContainer = document.getElementById('registerContainer');// not ready yet
    const paperAcceptanceContainer = document.getElementById('registerContainer');// not ready yet
    */
    const editPaperContainer = document.getElementById('editPaperContainer'); //the editPaperContainer is the div id from index.html
    const registerContainer = document.getElementById('registerContainer');
    const loginContainer = document.getElementById('loginContainer');
    const addPaperContainer = document.getElementById('addPaperContainer');
    const papersContainer = document.getElementById('papersContainer');
    const rewierAssignmentContainer = document.getElementById('rewierAssignmentContainer');
    const PaperWithDrawContainer = document.getElementById('PaperWithDrawContainer');
    const paperSearch = document.getElementById('paperSearch');

    const createConferenceContainer = document.getElementById('CreateConferenceDiv');
    const updateConferenceContainer = document.getElementById('conferenceUpdateDiv');
    const searchConferenceContainer = document.getElementById('searchConferenceContainer');
    const viewConferenceContainer = document.getElementById('viewConferenceContainer');
    const deleteConferenceContainer = document.getElementById('deleteConferenceContainer');
    const changeConferenceStatusContainer = document.getElementById('changeConferenceStatusContainer');
    const paperSearchContainer = document.getElementById('paperSearchContainer');

    //Step 3 : get form id 
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const paperForm = document.getElementById('paperForm');
    const editPaperForm = document.getElementById('editPaperForm');//the editPaperForm is the form id from index.html
    const papersList = document.getElementById('papersList');

    const searchConferenceForm = document.getElementById('searchConferenceForm');
    const conferenceFormElementView = document.getElementById('conferenceFormElementView');

    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName'); // Ensure to store username during login
    const userId = localStorage.getItem('userId');

    const searchResultDiv = document.getElementById('searchResult');

    //Step 4: add the container here
    function showContainer(container) {
        registerContainer.classList.remove('active');
        loginContainer.classList.remove('active');
        addPaperContainer.classList.remove('active');
        editPaperContainer.classList.remove('active');
        PaperWithDrawContainer.classList.remove('active');
        createConferenceContainer.classList.remove('active');
        viewConferenceContainer.classList.remove('active');
        updateConferenceContainer.classList.remove('active');
        deleteConferenceContainer.classList.remove('active');
        paperRiviewContainer.classList.remove('active');
        paperApprovalContainer.classList.remove('active');
        papersContainer.classList.remove('active');
        paperSearchContainer.classList.remove('active');
        changeConferenceStatusContainer.classList.remove('active');
        searchConferenceContainer.classList.remove('active');
        rewierAssignmentContainer.classList.remove('active');
        container.classList.add('active');
    }


    //step 5: set event listener
    editPaperBtn.addEventListener('click', () => {
        fetchPapersForDropdown(userRole, userName);
        showContainer(editPaperContainer)
    });

    //--------------------- Paper Search Section Start -----------------// not ready yet

    paperSearch.addEventListener('click', () => {
        showContainer(paperSearchContainer)
    });

      // Handling form submission
      document.getElementById('paperSearchForm').onsubmit = function (event) {
        event.preventDefault();

        // Collect form data
        const formData = new FormData(event.target);
        const paperSearchForm = {
            title: formData.get('paperSearchTitle'),
            author: formData.get('paperSearchAuthor'),
            abstract: formData.get('paperSearchAbstract'),
            role: storedRole
        };

        console.log('paperSearchForm Data:', paperSearchForm);

        // Send data to backend (replace the URL with your actual API endpoint)
        fetch('http://localhost/paper_management_system/api/papers/search_papers.php', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paperSearchForm)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Success:', data);
                /*
                Στις επόμενες γραμμές πρακτικά δημιουργούμε ένα δημανικό "innerHtml" κώδικα 
                Δημιουργώντας ένα νεο div και μέσα σε αυτό επιστρέφουμε τα δεδομένα που πήραμε απο την βάση
                */
                papersListSearch.innerHTML = '';
                data.records.forEach(paper => {
                    const paperDiv = document.createElement('div');
                    paperDiv.classList.add('paper');
                    paperDiv.innerHTML = `
                        <h3>${paper.title}</h3>
                        <p><strong>Author:</strong> ${paper.author}</p>
                        <p><strong>Abstract:</strong> ${paper.abstract}</p>
                        <p><strong>Publication Date:</strong> ${paper.publication_date}</p>
                    `;
                    papersListSearch.appendChild(paperDiv);
                });
                // Handle success (e.g., show a success message, reset form, etc.)
            })
            .catch(error => console.error('Error:', error));
    };

    //--------------------- Paper Search Section End -----------------//


    //--------------------- Paper Review Section Start -----------------//
    paperRiview.addEventListener('click', () => {
        prefillPeaperReview(userRole, userName);
        showContainer(paperRiviewContainer)
    });

function prefillPeaperReview(role, username)
{
    const url = `http://localhost/paper_management_system/api/conferences/fetch_conferencebyuserNameAndState.php?username=${localStorage.getItem('userId')}`;
    console.log(url);
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const dropdown = document.getElementById('conferenceIdForpaperRiview');
            dropdown.innerHTML = ''; // Clear previous options
            if (data.records) {
                data.records.forEach(confrence => {
                    console.log(data.records);
                    const option = document.createElement('option');
                    option.value = confrence.id;
                    option.textContent = confrence.name;
                    dropdown.appendChild(option);
                    dropdown.addEventListener('change', (event) => {
                        //const selectedPaperId = event.target.value;
                        const selectedPaperId = parseInt(event.target.value); // Convert to integer
                        console.log(selectedPaperId);
                        localStorage.setItem('idfromEdit', selectedPaperId);
                        const newrecord = data.records.find(record => record.id === selectedPaperId);
                        console.log("new rec: ", newrecord);

                        if (selectedPaperId) {
                            const dropdown2 = document.getElementById('pc_member_for_paperRiview');
                            dropdown2.innerHTML = ''; // Clear all previous options

                            // Check if pc_member contains a "-" and split if necessary
                            const pcMembers = newrecord.pc_member.includes('-') ? newrecord.pc_member.split('-') : [newrecord.pc_member];

                            pcMembers.forEach(member => {
                                const option2 = document.createElement('option'); // Create an 'option' element
                                option2.value = member.trim(); // Set the value of the option
                                option2.textContent = member.trim(); // Set the display text of the option
                                dropdown2.appendChild(option2); // Add the new option to the dropdown
                            });
                            const dropdown3 = document.getElementById('paper_id_for_paperRiview');
                            dropdown3.innerHTML = ''; // Clear all previous options

                            // Check if paper_id contains a "-" and split if necessary
                            const paperIds = newrecord.paper_id.includes('-') ? newrecord.paper_id.split('-') : [newrecord.paper_id];

                            paperIds.forEach((id, index) => {
                                const option3 = document.createElement('option'); // Create an 'option' element
                                option3.value = id.trim(); // Set the value of the option
                                option3.textContent = index === 0 ? newrecord.papper_title : `Part ${index + 1}`; // Adjust the title for split parts
                                dropdown3.appendChild(option3); // Add the new option to the dropdown
                            });
                        } else {
                            // Clear the form fields if no paper is selected
                            document.getElementById('conferenceIdForReviewerAssignment').value = '';
                            document.getElementById('paper_id_for_reviewer_assignment').value = '';
                            document.getElementById('pc_member_for_reviewer_assignment').value = '';
                        }
                    });
                });
            } else {
                const option = document.createElement('option');
                option.value = '';
                option.textContent = 'No confeences available';
                dropdown.appendChild(option);
            }
        })
        .catch(error => console.error('Error fetching confeences:', error));
}

       // Handling form submission
       document.getElementById('paperRiviewForm').onsubmit = function (event) {
        event.preventDefault();

        // Collect form data
        const formData = new FormData(event.target);
        const paperRiviewForm = {
            id: formData.get('conferenceIdForpaperRiview'),
            paper_id: formData.get('paper_id_for_paperRiview'),
            pc_member_id: formData.get('pc_member_for_paperRiview'),
            review_score: formData.get('review_score'),
            review_justification: formData.get('review_justification')
        };

        console.log('paperRiviewForm Data:', paperRiviewForm);

        // Send data to backend (replace the URL with your actual API endpoint)
        fetch('http://localhost/paper_management_system/api/Review/paperReview.php', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paperRiviewForm)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data.message.value);
                alert('Success:', data.message.value);
                // Handle success (e.g., show a success message, reset form, etc.)
            })
            .catch(error => console.error('Error:', error));
    };


    //--------------------- Paper Review Section End -----------------//

    //--------------------- Paper Aprproval Section Start -----------------//

paperStatus.addEventListener('click', () => {
    prefillConferenceForPaperApproval(userRole, userName);
    showContainer(paperApprovalContainer)
});

function prefillConferenceForPaperApproval(role, username)
{
    const url = `http://localhost/paper_management_system/api/conferences/fetch_conferencebyuserNameAndState2.php?username=${localStorage.getItem('userId')}`;
    console.log(url);
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const dropdown = document.getElementById('conferenceIdForpaperApproval');
            dropdown.innerHTML = ''; // Clear previous options
            if (data.records) {
                data.records.forEach(confrence => {
                    console.log(data.records);
                    const option = document.createElement('option');
                    option.value = confrence.id;
                    option.textContent = confrence.name;
                    dropdown.appendChild(option);
                    dropdown.addEventListener('change', (event) => {
                        //const selectedPaperId = event.target.value;
                        const selectedPaperId = parseInt(event.target.value); // Convert to integer
                        console.log(selectedPaperId);
                        localStorage.setItem('idfromEdit', selectedPaperId);
                        const newrecord = data.records.find(record => record.id === selectedPaperId);
                        console.log("new rec: ", newrecord);

                        if (selectedPaperId) {
                            const dropdown2 = document.getElementById('pc_member_for_paperApproval');
                            dropdown2.innerHTML = ''; // Clear all previous options

                            // Check if pc_member contains a "-" and split if necessary
                            const pcMembers = newrecord.pc_member.includes('-') ? newrecord.pc_member.split('-') : [newrecord.pc_member];

                            pcMembers.forEach(member => {
                                const option2 = document.createElement('option'); // Create an 'option' element
                                option2.value = member.trim(); // Set the value of the option
                                option2.textContent = member.trim(); // Set the display text of the option
                                dropdown2.appendChild(option2); // Add the new option to the dropdown
                            });
                            const dropdown3 = document.getElementById('paper_id_for_paperApproval');
                            dropdown3.innerHTML = ''; // Clear all previous options

                            // Check if paper_id contains a "-" and split if necessary
                            const paperIds = newrecord.paper_id.includes('-') ? newrecord.paper_id.split('-') : [newrecord.paper_id];

                            paperIds.forEach((id, index) => {
                                const option3 = document.createElement('option'); // Create an 'option' element
                                option3.value = id.trim(); // Set the value of the option
                                option3.textContent = index === 0 ? newrecord.papper_title : `Part ${index + 1}`; // Adjust the title for split parts
                                dropdown3.appendChild(option3); // Add the new option to the dropdown
                            });
                        } else {
                            // Clear the form fields if no paper is selected
                            document.getElementById('conferenceIdForpaperApproval').value = '';
                            document.getElementById('paper_id_for_paperApproval').value = '';
                            document.getElementById('pc_member_for_paperApproval').value = '';
                        }
                    });
                });
            } else {
                const option = document.createElement('option');
                option.value = '';
                option.textContent = 'No confeences available';
                dropdown.appendChild(option);
            }
        })
        .catch(error => console.error('Error fetching confeences:', error));
}
       // Handling form submission
       document.getElementById('paperApprovalForm').onsubmit = function (event) {
        event.preventDefault();

        // Collect form data
        const formData = new FormData(event.target);
        const paperApprovalForm = {
            id: formData.get('conferenceIdForpaperApproval'),
            paper_id: formData.get('paper_id_for_paperApproval'),
            pc_member_id: formData.get('pc_member_for_paperApproval'),
            setStatus: formData.get('setStatus')
        };

        console.log('paperApprovalForm Data:', paperApprovalForm);

        // Send data to backend (replace the URL with your actual API endpoint)
        fetch('http://localhost/paper_management_system/api/Review/paperStatus.php', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paperApprovalForm)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data.message);
                alert('Success:', data.message);
                // Handle success (e.g., show a success message, reset form, etc.)
            })
            .catch(error => console.error('Error:', error));
    };

    //--------------------- Paper Aprproval Section End -----------------//

    //--------------------- Paper Deletion Section Start -----------------//
    PaperwithdrawBtn.addEventListener('click', () => {
        fetchPapersForDropdown2(userRole, userName);
        showContainer(PaperWithDrawContainer)
    });

    function fetchPapersForDropdown2(role, username) {
        const url = `http://localhost/paper_management_system/api/papers/fetch_papers.php?role=${localStorage.getItem('userRole')}&username=${localStorage.getItem('userName')}`;
        console.log(url);
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const dropdown = document.getElementById('papersDropdown2');
                dropdown.innerHTML = ''; // Clear previous options
                if (data.records) {
                    data.records.forEach(paper => {
                        console.log(data);
                        const option = document.createElement('option');
                        option.value = paper.id;
                        option.textContent = paper.title;
                        dropdown.appendChild(option);
                    });
                } else {
                    const option = document.createElement('option');
                    option.value = '';
                    option.textContent = 'No papers available';
                    dropdown.appendChild(option);
                }
            })
            .catch(error => console.error('Error fetching papers:', error));
    }

       // Handling form submission
       document.getElementById('PaperWithDrawrForm').onsubmit = function (event) {
        event.preventDefault();

        // Collect form data
        const formData = new FormData(event.target);
        const PaperWithDrawrForm = {
            id: formData.get('papersDropdown2')
        };

        console.log('PaperWithDrawrForm Data:', PaperWithDrawrForm);

        // Send data to backend (replace the URL with your actual API endpoint)
        fetch('http://localhost/paper_management_system/api/papers/delete.php', { //not ready yet
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(PaperWithDrawrForm)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Success:', data);
                // Handle success (e.g., show a success message, reset form, etc.)
            })
            .catch(error => console.error('Error:', error));
    };


    //--------------------- Paper Deletion Section End -----------------//

    registerBtn.addEventListener('click', () => showContainer(registerContainer));
    loginBtn.addEventListener('click', () => showContainer(loginContainer));
    addPaperBtn.addEventListener('click', () => showContainer(addPaperContainer));

    viewPapersBtn.addEventListener('click', () => {
        showContainer(papersContainer);
        fetchPapers();
    });

    viewConference.addEventListener('click', () => {
        showContainer(viewConferenceContainer)
        //fetchConferences(userName);
        fetchAllConferences();
    });

    createConference.addEventListener('click', () => {
        fetchPapersFoRConfCreate();
        //fetchUsers();
        fetchPc_chairs();
        fetchPc_members();

        showContainer(createConferenceContainer);

    });

    //--------------------- Conference Deletion Section Start -----------------//

    deleteConference.addEventListener('click', () => {
        prefillConferenceToDeletion();
        showContainer(deleteConferenceContainer);

    });
    function prefillConferenceToDeletion() {
        const url = `http://localhost/paper_management_system/api/conferences/fetch_conferencebyuserName.php?username=${localStorage.getItem('userId')}`;
        console.log(url);
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const dropdown = document.getElementById('conferenceDropdown2');
                dropdown.innerHTML = ''; // Clear previous options
                if (data.records) {
                    data.records.forEach(confrence => {
                        console.log(data.records);
                        const option = document.createElement('option');
                        option.value = confrence.id;
                        option.textContent = confrence.name;
                        dropdown.appendChild(option);
                    });
                } else {
                    const option = document.createElement('option');
                    option.value = '';
                    option.textContent = 'No confeences available';
                    dropdown.appendChild(option);
                }
            })
            .catch(error => console.error('Error fetching confeences:', error));
    }
           // Handling form submission
           document.getElementById('conferenceFormDelete').onsubmit = function (event) {
            event.preventDefault();
    
            // Collect form data
            const formData = new FormData(event.target);
            const conferenceFormDelete = {
                id: formData.get('conferenceDropdown2')
            };
    
            console.log('conferenceFormDelete Data:', conferenceFormDelete);
    
            // Send data to backend (replace the URL with your actual API endpoint)
            fetch('http://localhost/paper_management_system/api/conferences/delete.php', { //not ready yet
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(conferenceFormDelete)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    alert('Success:', data.message);
                    // Handle success (e.g., show a success message, reset form, etc.)
                })
                .catch(error => console.error('Error:', error));
        };

    //--------------------- Conference Deletion Section End -----------------//

    //----------- Start change Conference Status Section------------------//

    changeConferenceStatus.addEventListener('click', () => {
        prefillConferenceToChangeStatus();
        showContainer(changeConferenceStatusContainer);

    });
    function prefillConferenceToChangeStatus() {
        const url = `http://localhost/paper_management_system/api/conferences/fetch_conferencebyuserName.php?username=${localStorage.getItem('userId')}`;
        console.log(url);
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const dropdown = document.getElementById('conferenceIdForChangeConferenceStatus');
                dropdown.innerHTML = ''; // Clear previous options
                if (data.records) {
                    data.records.forEach(confrence => {
                        console.log(data.records);
                        const option = document.createElement('option');
                        option.value = confrence.id;
                        option.textContent = confrence.name;
                        dropdown.appendChild(option);
                        dropdown.addEventListener('change', (event) => {

                            const selectedPaperId = parseInt(event.target.value); // Convert to integer
                            localStorage.setItem('idfromEdit', selectedPaperId);
                            const newrecord = data.records.find(record => record.id === selectedPaperId);

                            if (selectedPaperId) {
                                console.log("newrecord -> ",newrecord);
                                const dropdown2 = document.getElementById('conferenceStatusForChangeConferenceStatus1');
                                dropdown2.innerHTML = ''; // Clear all previous options
                                const staticStatusValues = ['FINAL_SUBMISSION', 'CREATED', 'DECISION' ,'ASSIGNMENT', 'REVIEW' , 'SUBMISSION' ]; 
                                
                                const status = newrecord.status;
                                    const option2 = document.createElement('option'); // Create an 'option' element
                                    option2.value = status.trim(); // Set the value of the option
                                    option2.textContent = status.trim(); // Set the display text of the option
                                    dropdown2.appendChild(option2); // Add the new option to the dropdown
                                    staticStatusValues.forEach(staticStatus => {
                                        const option = document.createElement('option');
                                        option.value = staticStatus;
                                        option.textContent = staticStatus;
                                        dropdown2.appendChild(option);
                                    });
                            } else {
                                // Clear the form fields if no paper is selected
                                document.getElementById('conferenceIdForChangeConferenceStatus').value = '';
                            }

                            
                        //document.getElementById('conferenceStatusForChangeConferenceStatus').value = newrecord.status;
                    });
                    });
                } else {
                    const option = document.createElement('option');
                    option.value = '';
                    option.textContent = 'No confeences available';
                    dropdown.appendChild(option);
                }
            })
            .catch(error => console.error('Error fetching confeences:', error));
    }

    // Handling form submission
    document.getElementById('changeConferenceStatusForm').onsubmit = function (event) {
        event.preventDefault();

        // Collect form data
        const formData = new FormData(event.target);
        const changeConferenceStatusForm = {
            id: formData.get('conferenceIdForChangeConferenceStatus'),
            status: formData.get('conferenceStatusForChangeConferenceStatus1')
        };

        console.log('changeConferenceStatusForm Data:', changeConferenceStatusForm);

        // Send data to backend (replace the URL with your actual API endpoint)
        fetch('http://localhost/paper_management_system/api/Review/changeConferenceStatus.php', { //not ready yet
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(changeConferenceStatusForm)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Handle success (e.g., show a success message, reset form, etc.)
            })
            .catch(error => console.error('Error:', error));
    };

    //----------- End change Conference Status Section------------------//


    //----------- Start Reviewer Assignment Section------------------//
    rewierAssignment.addEventListener('click', () => {
        prefillConference();
        fetchPc_member_for_update_confs();
        fetchPapersFoRConfCreate();
        showContainer(rewierAssignmentContainer);
    });

    // Handling form submission
    document.getElementById('rewierAssignmentForm').onsubmit = function (event) {
        event.preventDefault();
        const pcMemberDropdown = document.getElementById('pc_member_for_reviewer_assignment');
        const selectedPcMember = pcMemberDropdown.options[pcMemberDropdown.selectedIndex].value;
    
        const paperIdDropdown = document.getElementById('paper_id_for_reviewer_assignment');
        const selectedPaperId = paperIdDropdown.options[paperIdDropdown.selectedIndex].value;
        // Collect form data
        const formData = new FormData(event.target);
        const rewierAssignmentForm = {
            id: formData.get('conferenceIdForReviewerAssignment'),
            paper_id: selectedPcMember,
            pc_member: selectedPaperId
        };

        // Additional logging or logic for selected options


        console.log('rewierAssignment Data:', rewierAssignmentForm);

        // Send data to backend (replace the URL with your actual API endpoint)
        fetch('http://localhost/paper_management_system/api/Review/reviewerAssigment.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rewierAssignmentForm)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Handle success (e.g., show a success message, reset form, etc.)
            })
            .catch(error => console.error('Error:', error));
    };

    function prefillConference() {
        const url = `http://localhost/paper_management_system/api/conferences/fetch_conferencebyuserName.php?username=${localStorage.getItem('userId')}`;
        console.log(url);
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const dropdown = document.getElementById('conferenceIdForReviewerAssignment');
                dropdown.innerHTML = ''; // Clear previous options
                if (data.records) {
                    data.records.forEach(confrence => {
                        console.log(data);
                        console.log(data.records);
                        const option = document.createElement('option');
                        option.value = confrence.id;
                        option.textContent = confrence.name;
                        dropdown.appendChild(option);
                    });
                    dropdown.addEventListener('change', (event) => {
                        //const selectedPaperId = event.target.value;
                        const selectedPaperId = parseInt(event.target.value); // Convert to integer
                        console.log(selectedPaperId);
                        localStorage.setItem('idfromEdit', selectedPaperId);
                        const newrecord = data.records.find(record => record.id === selectedPaperId);
                        console.log("new rec: ", newrecord);

                        if (selectedPaperId) {
                            const dropdown2 = document.getElementById('pc_member_for_reviewer_assignment');
                            dropdown2.innerHTML = ''; // Clear all previous options

                            // Check if pc_member contains a "-" and split if necessary
                            const pcMembers = newrecord.pc_member.includes('-') ? newrecord.pc_member.split('-') : [newrecord.pc_member];

                            pcMembers.forEach(member => {
                                const option2 = document.createElement('option'); // Create an 'option' element
                                option2.value = member.trim(); // Set the value of the option
                                option2.textContent = member.trim(); // Set the display text of the option
                                dropdown2.appendChild(option2); // Add the new option to the dropdown
                            });


                            // const option2 = document.createElement('option'); // Create an 'option' element
                            // option2.value = newrecord.pc_member; // Set the value of the option
                            // option2.textContent = newrecord.pc_member; // Set the display text of the option
                            // option2.selected = true;
                            // dropdown2.appendChild(option2); // Add the new option to the dropdown

                            const dropdown3 = document.getElementById('paper_id_for_reviewer_assignment');
                            dropdown3.innerHTML = ''; // Clear all previous options

                            // Check if paper_id contains a "-" and split if necessary
                            const paperIds = newrecord.paper_id.includes('-') ? newrecord.paper_id.split('-') : [newrecord.paper_id];

                            paperIds.forEach((id, index) => {
                                const option3 = document.createElement('option'); // Create an 'option' element
                                option3.value = id.trim(); // Set the value of the option
                                option3.textContent = index === 0 ? newrecord.papper_title : `Part ${index + 1}`; // Adjust the title for split parts
                                dropdown3.appendChild(option3); // Add the new option to the dropdown
                            });

                            // const option3 = document.createElement('option'); // Create an 'option' element
                            // option3.value = newrecord.paper_id; // Set the value of the option
                            // option3.textContent = newrecord.papper_title; // Set the display text of the option
                            // option3.selected = true;
                            // dropdown3.appendChild(option3); // Add the new option to the dropdown
                        } else {
                            // Clear the form fields if no paper is selected
                            document.getElementById('conferenceIdForReviewerAssignment').value = '';
                            document.getElementById('paper_id_for_reviewer_assignment').value = '';
                            document.getElementById('pc_member_for_reviewer_assignment').value = '';
                        }
                    });
                } else {
                    const option = document.createElement('option');
                    option.value = '';
                    option.textContent = 'No confeences available';
                    dropdown.appendChild(option);
                }
            })
            .catch(error => console.error('Error fetching confeences:', error));
    }

    //-----------------End reviewer Assignment Section------------------//

    updateConference.addEventListener('click', () => {
        prefillConferenceUpdate();
        fetchPc_chairs_for_update_conf();
        fetchPc_member_for_update_confs();
        fetchPapersFoRConfCreate();
        showContainer(updateConferenceContainer);
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('userRole');
        localStorage.removeItem('isLoggedIn'); // Ensure to clear the login status as well
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        updateMenuBasedOnRole(null);
        alert('Logged out successfully');
        showContainer(loginContainer);
    });



    function updateMenuBasedOnRole(role, userName, userId) {
        console.log('Role:', role);
        console.log('userName:', userName);
        console.log('userId', userId)
        const menuButtons = document.querySelectorAll('.menu-btn');
        menuButtons.forEach(button => {
            const roles = button.getAttribute('data-role').split(' ');
            //console.log('Button roles:', roles);
            if (roles.includes(String(role)) || roles.includes('all')) {
                button.style.display = 'block';
            }
            else {
                button.style.display = 'none';
            }
        });
    }

    //--------------- create conference Section------------------//

    // Function to fetch papers and populate the dropdown
    function fetchPapersFoRConfCreate() {
        const url = `http://localhost/paper_management_system/api/papers/fetch_papers.php?role=2&username=admin`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const paperDropdown = document.getElementById('conferencePaperId');
                data.records.forEach(paper => {
                    const option = document.createElement('option');
                    option.value = paper.id;
                    option.textContent = paper.title;
                    paperDropdown.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching papers:', error));
    }
    // Function to fetch users and populate PC Chair and PC Member fields
    function fetchUsers() {
        const url = `http://localhost/paper_management_system/api/users/fetch_users.php`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const pcChairDropdown = document.getElementById('conferencePcChair');
                const pcMemberDropdown = document.getElementById('conferencePcMember');

                data.records.forEach(user => {
                    const option = document.createElement('option');
                    option.value = user.id;
                    option.textContent = user.username;

                    // Add option to PC Chair dropdown
                    pcChairDropdown.appendChild(option.cloneNode(true));

                    // Add option to PC Member dropdown
                    pcMemberDropdown.appendChild(option.cloneNode(true));
                });
            })
            .catch(error => console.error('Error fetching users:', error));
    }
    // Function to fetch  PC Chairs
    function fetchPc_chairs() {
        const url = `http://localhost/paper_management_system/api/users/fetch_pc_chairs.php`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const pcChairDropdown = document.getElementById('conferencePcChair');
                data.records.forEach(user => {
                    const option = document.createElement('option');
                    option.value = user.id;
                    option.textContent = user.username;
                    // Add option to PC Chair dropdown
                    pcChairDropdown.appendChild(option.cloneNode(true));
                });
            })
            .catch(error => console.error('Error fetching users:', error));
    }

    // Function to fetch  PC members
    function fetchPc_members() {
        const url = `http://localhost/paper_management_system/api/users/fetch_pc_members.php`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const pcMemberDropdown = document.getElementById('conferencePcMember');
                data.records.forEach(user => {
                    const option = document.createElement('option');
                    option.value = user.id;
                    option.textContent = user.username;
                    // Add option to PC Member dropdown
                    pcMemberDropdown.appendChild(option.cloneNode(true));
                });
            })
            .catch(error => console.error('Error fetching users:', error));
    }
    // Handling form submission
    document.getElementById('CreateConferenceForm').onsubmit = function (event) {
        event.preventDefault();

        // Collect form data
        const formData = new FormData(event.target);
        const conferenceData = {
            name: formData.get('name'),
            description: formData.get('description'),
            pc_chair: formData.getAll('pc_chair[]').join('-'),
            paper_id: formData.getAll('paper_id[]').join('-'),
            pc_member: formData.getAll('pc_member[]').join('-'),
            status: formData.get('status')
        };
        console.log('Conference Data:', conferenceData);

        // Send data to backend (replace the URL with your actual API endpoint)
        fetch('http://localhost/paper_management_system/api/conferences/create.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(conferenceData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Handle success (e.g., show a success message, reset form, etc.)
            })
            .catch(error => console.error('Error:', error));
    };

    // -----------END OF create Conference Section ----//


    //------------ Update conference Section ---------------- //

    function prefillConferenceUpdate() {
        const url = `http://localhost/paper_management_system/api/conferences/fetch_conferencebyuserName.php?username=${localStorage.getItem('userId')}`;
        console.log(url);
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const dropdown = document.getElementById('conferenceDropdown');
                dropdown.innerHTML = ''; // Clear previous options
                if (data.records) {
                    data.records.forEach(confrence => {
                        console.log(data);
                        console.log(data.records);
                        const option = document.createElement('option');
                        option.value = confrence.id;
                        option.textContent = confrence.name;
                        dropdown.appendChild(option);
                    });
                    // Add event listener for dropdown change
                    dropdown.addEventListener('change', (event) => {
                        //const selectedPaperId = event.target.value;
                        const selectedPaperId = parseInt(event.target.value); // Convert to integer
                        console.log(selectedPaperId);
                        localStorage.setItem('idfromEdit', selectedPaperId);
                        const newrecord = data.records.find(record => record.id === selectedPaperId);
                        console.log("new rec: ", newrecord);
                        if (selectedPaperId) {
                            document.getElementById('updateDescription').value = newrecord.description;

                            const dropdown = document.getElementById('updatePc_chair');
                            dropdown.innerHTML = ''; // Clear all previous options
                            const option = document.createElement('option'); // Create an 'option' element
                            option.value = newrecord.pc_chair; // Set the value of the option
                            option.textContent = newrecord.pc_chair; // Set the display text of the option
                            option.selected = true;
                            dropdown.appendChild(option); // Add the new option to the dropdown

                            const dropdown2 = document.getElementById('updatePc_member');
                            dropdown2.innerHTML = ''; // Clear all previous options
                            const option2 = document.createElement('option'); // Create an 'option' element
                            option2.value = newrecord.pc_member; // Set the value of the option
                            option2.textContent = newrecord.pc_member; // Set the display text of the option
                            option2.selected = true;
                            dropdown2.appendChild(option2); // Add the new option to the dropdown

                            const dropdown3 = document.getElementById('updatePaper_id');
                            dropdown3.innerHTML = ''; // Clear all previous options
                            const option3 = document.createElement('option'); // Create an 'option' element
                            option3.value = newrecord.paper_id; // Set the value of the option
                            option3.textContent = newrecord.papper_title; // Set the display text of the option
                            option3.selected = true;
                            dropdown3.appendChild(option3); // Add the new option to the dropdown

                            document.getElementById('updateStatus').value = newrecord.status;
                            document.getElementById('conferenceUpdateName').value = newrecord.name;
                        } else {
                            // Clear the form fields if no paper is selected
                            document.getElementById('updateDescription').value = '';
                            document.getElementById('updatePc_chair').value = '';
                            document.getElementById('updatePaper_id').value = '';
                            document.getElementById('updateStatus').value = '';
                            document.getElementById('updatePc_member').value = '';
                        }
                    });
                } else {
                    const option = document.createElement('option');
                    option.value = '';
                    option.textContent = 'No confeences available';
                    dropdown.appendChild(option);
                }
            })
            .catch(error => console.error('Error fetching confeences:', error));
    }


    // Function to fetch  PC Chairs
    function fetchPc_chairs_for_update_conf() {
        const url = `http://localhost/paper_management_system/api/users/fetch_pc_chairs.php`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const pcChairDropdown = document.getElementById('updatePc_chair');
                data.records.forEach(user => {
                    const option = document.createElement('option');
                    option.value = user.id;
                    option.textContent = user.username;
                    // Add option to PC Chair dropdown
                    pcChairDropdown.appendChild(option.cloneNode(true));
                });
            })
            .catch(error => console.error('Error fetching users:', error));
    }

    // Function to fetch  PC members
    function fetchPc_member_for_update_confs() {
        const url = `http://localhost/paper_management_system/api/users/fetch_pc_members.php`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const pcMemberDropdown = document.getElementById('updatePc_member');
                data.records.forEach(user => {
                    const option = document.createElement('option');
                    option.value = user.id;
                    option.textContent = user.username;
                    // Add option to PC Member dropdown
                    pcMemberDropdown.appendChild(option.cloneNode(true));
                });
            })
            .catch(error => console.error('Error fetching users:', error));
    }


    // Handling form submission
    document.getElementById('updateConferenceForm').onsubmit = function (event) {
        event.preventDefault();

        // Collect form data
        const formData = new FormData(event.target);
        const conferenceDataForUpdate = {
            name: formData.get('conferenceUpdateName'),
            description: formData.get('description'),
            pc_chair: formData.getAll('pc_chair[]').join('-'),
            paper_id: formData.getAll('paper_id[]').join('-'),
            pc_member: formData.getAll('pc_member[]').join('-'),
            status: formData.get('status')
        };

        console.log('Conference Data for update:', conferenceDataForUpdate);

        // Send data to backend (replace the URL with your actual API endpoint)
        fetch('http://localhost/paper_management_system/api/conferences/update.php', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(conferenceDataForUpdate)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Handle success (e.g., show a success message, reset form, etc.)
            })
            .catch(error => console.error('Error:', error));
    };

    // -----------END OF Upadte Conference Section ----//


    //--- Search Conference section ---------------------- //
    function fetchAllConferencesFOrSearchProccess() {
        const url = 'http://localhost/paper_management_system/api/conferences/readAll.php';
        console.log(url);
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const dropdown = document.getElementById('conferenceIdSearch');
                dropdown.innerHTML = ''; // Clear previous options
                if (data.records) {
                    data.records.forEach(confrence => {
                        //console.log(data);
                        console.log(data.records);
                        const option = document.createElement('option');
                        option.value = confrence.id;
                        option.textContent = confrence.name;
                        dropdown.appendChild(option);
                    });
                } else {
                    const option = document.createElement('option');
                    option.value = '';
                    option.textContent = 'No confeences available';
                    dropdown.appendChild(option);
                }
            })
            .catch(error => console.error('Error fetching confeences:', error));
    }
    searchConferenceBtn.addEventListener('click', () => {
        showContainer(searchConferenceContainer);
        fetchAllConferencesFOrSearchProccess();
    });
    // Search Conference Form Submission
    searchConferenceForm.onsubmit = function (event) {
        event.preventDefault();
        const conferenceIdSearch = document.getElementById('conferenceIdSearch').value;
        console.log("conferenceIdSearch: ", conferenceIdSearch);

        // Fetch conference details based on conference ID
        const url = `http://localhost/paper_management_system/api/conferences/fetch_conference_by_id.php?conferenceId=${conferenceIdSearch}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log("data: ", data);
                console.log("data.record: ", data.records[0]);
                if (data && data.records) {
                    const conference = data.records[0];
                    // Display conference details in search result div
                    searchResultDiv.innerHTML = `
                    <h3>Conference Details</h3>
                    <p><strong>ID:</strong> ${conference.id}</p>
                    <p><strong>Name:</strong> ${conference.name}</p>
                    <p><strong>Description:</strong> ${conference.description}</p>
                    <p><strong>PC Chair:</strong> ${conference.pc_chair}</p>
                    <p><strong>PC Members:</strong> ${conference.pc_members}</p>
                    <p><strong>Status:</strong> ${conference.status}</p>
                `;
                } else {
                    // If no conference found, show an error message
                    searchResultDiv.innerHTML = `<p>No conference found with ID ${conferenceId}.</p>`;
                }
            })
            .catch(error => {
                console.error('Error fetching conference details:', error);
                searchResultDiv.innerHTML = `<p>Error fetching conference details. Please try again later.</p>`;
            });
    };

    //=== ENd search conference button -----------------------//

    // Function to fetch papers based on user role and populate the dropdown
    function fetchPapersForDropdown(role, username) {
        const url = `http://localhost/paper_management_system/api/papers/fetch_papers.php?role=${localStorage.getItem('userRole')}&username=${localStorage.getItem('userName')}`;
        console.log(url);
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const dropdown = document.getElementById('papersDropdown');
                dropdown.innerHTML = ''; // Clear previous options
                if (data.records) {
                    data.records.forEach(paper => {
                        console.log(data);
                        const option = document.createElement('option');
                        option.value = paper.id;
                        option.textContent = paper.title;
                        dropdown.appendChild(option);
                    });
                    // Add event listener for dropdown change
                    dropdown.addEventListener('change', (event) => {
                        //const selectedPaperId = event.target.value;
                        const selectedPaperId = parseInt(event.target.value); // Convert to integer
                        console.log(selectedPaperId);
                        localStorage.setItem('idfromEdit', selectedPaperId);
                        const newrecord = data.records.find(record => record.id === selectedPaperId);
                        console.log(newrecord);
                        if (selectedPaperId) {
                            //fetchPaperDetails(selectedPaperId);   
                            //newrecord.id = selectedPaperId;
                            document.getElementById('editTitle').value = newrecord.title;
                            document.getElementById('editAuthor').value = newrecord.author;
                            document.getElementById('editAbstract').value = newrecord.abstract;
                            document.getElementById('editPublicationDate').value = newrecord.publication_date;

                        } else {
                            // Clear the form fields if no paper is selected
                            document.getElementById('editTitle').value = '';
                            document.getElementById('editAuthor').value = '';
                            document.getElementById('editAbstract').value = '';
                            document.getElementById('editPublicationDate').value = '';
                        }
                    });



                } else {
                    const option = document.createElement('option');
                    option.value = '';
                    option.textContent = 'No papers available';
                    dropdown.appendChild(option);
                }
            })
            .catch(error => console.error('Error fetching papers:', error));
    }

    //-------------------------------
    // Function to fetch and display papers
    function fetchPapers() {
        fetch('http://localhost/paper_management_system/api/papers/read.php')
            .then(response => response.json())
            .then(data => {
                papersList.innerHTML = '';
                data.records.forEach(paper => {
                    const paperDiv = document.createElement('div');
                    paperDiv.classList.add('paper');
                    paperDiv.innerHTML = `
                        <h3>${paper.title}</h3>
                        <p><strong>Author:</strong> ${paper.author}</p>
                        <p><strong>Abstract:</strong> ${paper.abstract}</p>
                        <p><strong>Publication Date:</strong> ${paper.publication_date}</p>
                    `;
                    papersList.appendChild(paperDiv);
                });
            })
            .catch(error => console.error('Error fetching papers:', error));
    }

    /*
    // Function to fetch and display Conferences in which pc_chair is the logge in user
    function fetchConferences(userName) {
        fetch(`http://localhost/paper_management_system/api/conferences/read.php?username=${userName}`)
            .then(response => response.json())
            .then(data => {
                conferenceFormElementView.innerHTML = '';
                data.records.forEach(conference => {
                    const conferenceDiv = document.createElement('div');
                    conferenceDiv.classList.add('conference');
                    conferenceDiv.innerHTML = `
                        <h3>${conference.name}</h3>
                        <p><strong>description:</strong> ${conference.description}</p>
                        <p><strong>paper icluded:</strong> ${conference.paper_id}</p>
                        <p><strong>status:</strong> ${conference.status}</p>
                    `;
                    conferenceFormElementView.appendChild(conferenceDiv);
                });
            })
            .catch(error => console.error('Error fetching conferences:', error));
    }
    */
    //Fetch all conferences
    function fetchAllConferences() {
        fetch('http://localhost/paper_management_system/api/conferences/readAll.php')
            .then(response => response.json())
            .then(data => {
                conferenceFormElementView.innerHTML = '';
                data.records.forEach(conference => {
                    const conferenceDiv = document.createElement('div');
                    conferenceDiv.classList.add('conference');
                    conferenceDiv.innerHTML = `
                        <h3>Name:  ${conference.name}</h3>
                        <p><strong>description:</strong> ${conference.description}</p>
                        <p><strong>paper icluded:</strong> ${conference.paper_id}</p>
                        <p><strong>status:</strong> ${conference.status}</p>
                    `;
                    conferenceFormElementView.appendChild(conferenceDiv);
                });
            })
            .catch(error => console.error('Error fetching conferences:', error));
    }

    //Step 6: Handle the event listeners
    // Handle form submission to  update a paper
    editPaperForm.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(editPaperForm);
        const paperData = {
            id: parseInt(localStorage.getItem('idfromEdit')),
            title: formData.get('title'),
            author: formData.get('author'),
            abstract: formData.get('abstract'),
            publication_date: formData.get('publication_date')
        };
        // Fetch papers for dropdown on page load
        console.log(paperData);

        fetch('http://localhost/paper_management_system/api/papers/update.php', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paperData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Paper was updated.') {
                    alert('Paper updated successfully');
                    editPaperForm.reset();
                    fetchPapers();
                } else {
                    alert('Failed to update paper');
                }
            })

            .catch(error => console.error('Error updating paper:', error));
    });

    // Handle form submission to create a new paper
    paperForm.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(paperForm);
        const paperData = {
            title: formData.get('title'),
            author: formData.get('author'),
            abstract: formData.get('abstract'),
            publication_date: formData.get('publication_date')
        };

        fetch('http://localhost/paper_management_system/api/papers/create.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paperData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Paper was created.') {
                    alert('Paper added successfully');
                    paperForm.reset();
                    fetchPapers();
                } else {
                    alert('Failed to add paper');
                }
            })
            .catch(error => console.error('Error adding paper:', error));
    });

    // Handle registration form submission
    registerForm.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(registerForm);
        const registerData = {
            username: formData.get('username'),
            password: formData.get('password'),
            role_id: formData.get('role_id')
        };

        fetch('http://localhost/paper_management_system/api/users/register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'User was created.') {
                    alert('Registration successful');
                    registerForm.reset();
                } else {
                    alert('Registration failed: ' + data.message);
                }
            })
            .catch(error => console.error('Error during registration:', error));
    });

    // Handle login form submission
    loginForm.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(loginForm);
        const loginData = {
            username: formData.get('loginUsername'),
            password: formData.get('loginPassword')
        };

        fetch('http://localhost/paper_management_system/api/users/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Login successful') {
                    alert('Login successful');
                    console.log(data);
                    localStorage.setItem('userRole', String(data.role)); // Store user role
                    localStorage.setItem('isLoggedIn', 'true'); // Store login status
                    localStorage.setItem('userName', String(data.userName))
                    localStorage.setItem('userId', String(data.userId))
                    // console.log(data.userName);
                    updateMenuBasedOnRole(data.role, data.userName, data.userId); // Update menu based on role
                    loginForm.reset();
                    //showContainer(papersContainer); // Redirect to papers view after login
                } else {
                    alert('Login failed: ' + data.message);
                }
            })
            .catch(error => console.error('Error during login:', error));
    });

    // On page load, check if user role is stored and update menu
    const storedRole = localStorage.getItem('userRole');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const storeUserName = localStorage.getItem('userName');
    const storeUserId = localStorage.getItem('userId');
    if (isLoggedIn && storedRole) {
        console.log('Stored role:', storedRole);
        updateMenuBasedOnRole(storedRole, storeUserName, storeUserId);
        showContainer(welcomCOntainer);
    } else {
        showContainer(loginContainer);
    }
});
