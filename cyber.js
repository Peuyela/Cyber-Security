//game code
const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')


let state = {} //this is for items so basially state is if you have item or not/ state is if your state of being holds this 


function startGame() {
    state = {}
    showTextNode(1)
}


//function that allows us to display what option ur on
function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }


    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
//node is html in website
}


function showOption(option) {
    return option.requiredState == null || option.requiredState(state) /*Checks if i have a require state object. if it is null, as in no required state then return true. or if you do have a required state then it just means that its true and if both are true it shows option*/
}


//function that happens everytime you select an option which will take whatever option u select
function selectOption(option) {
    const nextTextNodeId = option.nextText /*this */
    if (nextTextNodeId <= 0) {
        return startGame() /*This basically resets the game WILL CHANGE LATER */
    }
    state = Object.assign(state, option.setState) /* is it's going to take our state that we have currently it's going to add everything from options set state to it and override anything that's already there so if blue GU is true here but it's false in our option set state it's going to set it to false in our state and this is going to return a brand-new object which we're going to set to our current state then after all that is done we just want to show the text node for our next text node ID */ 
    showTextNode(nextTextNodeId)

}



const textNodes = [
    {
        id: 1, /*first interaction?*/
        text: 'Wake up',
        options: [
            {
                text: 'Wake up',
                setState: {packageNo: true},
                nextText:2
            },
            {
                text: 'Go back to sleep',
                nextText: 2.5
            }
        ]
    },
    {
        id: 2,
        text: ' What should I do?',
        options: [
            {
                text: 'Check the phone',
                nextText:3
            },
            {
                text: 'Turn on the computer',
                nextText: 4
            },
            {
                text: 'Someone was knocking on the door',
                requiredState: (currentState) => currentState.packageNo,
                setState: { packageNo: false, packageYes: true },
                nextText: 5
            },
            {
                text: 'install security cameras',
                requiredState: (currentState) => currentState.camera,
                setState: { camera: false, security: true },
                nextText: 2
            }
            
        ]
    },
    {
        id: 2.5,
        text: '... ',
        options: [
            {
                text: 'Wake up',
                setState: {packageNo: true},
                nextText:2
            }
        ]
    },
    {
        id: 5,
        text: 'There is a package outside. It is the security cameras I ordered a few days ago.',
        options: [
            {
                text: 'Install the security cameras around the house.',
                requiredState: (currentState) => currentState.packageYes,
                setState: {packageYes: false, security: true},
                nextText: 2
            },
            {
                text: 'Go back',
                requiredState: (currentState) => currentState.packageYes,
                setState: {packageYes: false, camera: true},
                nextText: 2
            }
        ]
    },
    {
        id: 3,
        text: 'Checking phone.',
        options: [

            {
                text: 'Check security cameras',
                requiredState: (currentState) => currentState.security,

                nextText: 6
            },
            {
                text: 'Go back',
                nextText: 2
            }
        ]
    },
    {
        id: 4,
        text: 'Checking computer',
        options: [
            {
                text: 'Check security cameras',
                requiredState: (currentState) => currentState.security,
                nextText: 6
            },
            {
                text: 'Go back',
                nextText: 2
            }
        ]
    },
    {
        id: 6,
        text: 'It seems to be working. What do I do now?',
        options: [
            {
                text: 'Play games',
                requiredState: (currentState) => currentState.invalid,
                nextText: 7
            },
            {
                text: 'Go shop online',
                requiredState: (currentState) => currentState.invalid,
                nextText: 7
            },
            {
                text: 'New message on Chat',
                nextText: 7
            },
            {
                text: 'Go back',
                requiredState: (currentState) => currentState.invalid,
                nextText: 7
            }
        ]
    },
    {
        id: 7,
        text: 'There is a message from your only friend: "Hi user what is up?" ',
        options: [
            {
                text: 'the sky',
                requiredState: (currentState) => currentState.invalid,
                nextText: 7
            },
            {
                text: 'nothing much, what about you?',
                requiredState: (currentState) => currentState.invalid,
                nextText: 7
            },
            {
                text: 'I just got the cameras i bought a few days ago',
                nextText: 8
            },
            {
                text: 'Leave him at read',
                requiredState: (currentState) => currentState.invalid,
                nextText: 7
            }
        ]
    },
    {
        id: 8,
        text: '"wow what a waste of money, i thought you were going to save up"',
        options: [
            {
                text: 'continue talking',
                nextText: 9
            }
        ]
    },
    {
        id: 9,
        text: 'time skip of a week bcs idk what to put here yet note to future self for feature hp bar of user is basically sanity bar which can help end game faster bcs idk user die from fear',
        options: [
            {
                text: '...',
                nextText: 10
            }
        ]
    },
    {
        id: 10,
        text: 'Recently I have the nagging feeling that someone is watching me...',
        options: [
            {
                text: '...',
                nextText: 11
            }
        ]
    },
    {
        id: 11,
        text: 'friend keeps saying that I am paranoid, but I swear.. someone is there! I am not crazy. I am not! The cameras did not show anyone... ',
        options: [
            {
                text: '...',
                nextText: 12
            }
        ]
    },
    {
        id: 12,
        text: 'Maybe I should get some air...',
        options: [
            {
                text: 'Take a walk outside',
                nextText: 13
            },
            {
                text: 'Check cameras',
                requiredState: (currentState) => currentState.security,
                nextText: 14
            },
            {
                text: 'Look in the closet',
                nextText: 14
            },
            {
                text: 'Check under the bed',
                nextText: 14
            }
        ]
    },
    {
        id: 13,
        text: 'I feel safe.',
        options: [
            {
                text: 'It was just in my mind. I should return home.',
                nextText: 15
            }
        ]
    },
    {
        id: 14,
        text: 'Nothing is there',
        options: [
            {
                text: 'Take a walk outside',
                nextText: 13
            }
        ]
    },
    {
        id: 15,
        text: 'I return home',
        options: [
            {
                text: 'New message on Chat. It is from friend',
                nextText: 16
            },
        ]
    },
    {
        id: 16,
        text: 'I return home',
        options: [
            {
                text: 'New message on Chat. It is from friend',
                nextText: 17
            },
        ]
    },
    {
        id: 17,
        text: 'friend: "Hey is this you? this is a emergency!!!" [link]',
        options: [
            {
                text: 'Click on the link',
                nextText: 18
            },
            {
                text: '"What are you on about?"',
                nextText: 19
            },
        ]
    },
    {
        id: 18,
        text: 'Just what... what is this?',
        options: [
            {
                text: '...',
                nextText: 20
            },
        ]
    },



    
    {
        id: 19,
        text: '"NO TIME! CLICK ON THE LINK!',
        options: [
            {
                text: 'Click on the link',
                nextText: 18
            },
        ]
    },
    {
        id: 20,
        text: 'In the screen, reflects me and I can not help but fear.',
        options: [
            {
                text: '...',
                nextText: 21
            }
        ]
    },
    {
        id: 21,
        text: 'Only ending for now: If only you had the option to set a password to your cameras, which wasnt added yet U-U. to not end up like this,  set passwords and the two step verification thing. stay cyber secure.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    }
]


startGame()
