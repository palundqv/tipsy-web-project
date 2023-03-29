# TIPSY APP 
### Group 33 DH2642 HT21

# Description

This is Tipsy! A website where you can get tips and get tipsy. Here you can find new favourite drinks and keep track of old ones! The fundamental idea of the project is to, in several ways, ease the process of finding suitable drinks and easing the planning of drink nights. The user is able to store their favorite drink, save a list of drink ingredients they have at home, and even create own drinks. 


# Setup

## Add config files
 
    /api/apiConfig.js
    /firebaseFolder/firebaseConfig.js

## Install dependencies

    npm install

## Run project

    npm run dev

## Build project

    npm run build




# Project file structure

```
tipsyapp
│
└─── src
    └─── js
    │    └─── api
    │    │    └─── [apiConfig.js]
    │    │    └─── apiLogic.js: additional logic required for the api calls
    │    │    └─── Source.js: contains the functions doing the actual api calls
    │    │
    │    └─── applicationState
    │    │    └─── Model.js: logic for functionality of app
    │    │    └─── promiseNoData.js: for conditional rendering
    │    │    └─── UseModel.js: contains custom hook
    │    │    └─── usePromise.js: custom hook for promises
    │    │
    │    └─── authentication
    │    │    └─── authenticationContext.js: handling authentication processes
    │    │
    │    └─── firebaseFolder
    │    │    └─── [firebaseConfig.js]
    │    │    └─── fireB.js: collects information from FirebaseConfig
    │    │    └─── firebaseModel.js: persistence implementation
    │    │
    │    └─── pictures
    │    │    └─── [images]
    │    │
    │    └─── presenters
    │    │    └─── accountPresenter.js: returns AccountView and routes the three different account tabs
    │    │    └─── customDrinkpresenter.js: returns customDrinkView and sends data from view to model
    │    │    └─── detailsPresenter.js: returns detailsView. We use a promiseNoData because currentDrinkDetails is a promise
    │    │    └─── faqPresenter.js: returns faqView
    │    │    └─── listPresenter.js: returns listView
    │    │    └─── loginPresenter.js: returns loginView
    │    │    └─── mainpagePresenter.js: returns headerView and resultsView. Resultsview uses promiseNoData while API promise is pending
    │    │    └─── signupPresenter.js: returns signupView
    │    │    └─── topBarPresenter.js: returns topBarView
    │    │    └─── userIngredientPresenter.js: returns userIngredientsView
    │    │
    │    └─── views
    │         └─── accoutView.js: user profile: favourited and custom drinks, settings for account
    │         └─── customDrinkView.js: let’s the user create their own drink that will be saved on their own account
    │         └─── detailsView.js: shows the details of a selected drink. Ingredients and instructions, adding drink to various lists.
    │         └─── faqView.js: how to use the website
    │         └─── headerView.js: header that is showed on the front page, where you also can search for drinks
    │         └─── listView.js: shopping list displaying selected drinks and ingredients needed for these drinks, based on the user's ingredients at home
    │         └─── loginView.js: logging in to account
    │         └─── popup.js: pop up view showing up on different other views
    │         └─── resultView.js: shows the searched drinks on the front page. If nothing it searched, it will default to showing all the drinks in the API.
    │         └─── signUpView.js: creating account
    │         └─── topBarview.js: this is the top navigator bar that is seen in every view. Clicking on an alternative redirects to another page
    │         └─── userIngredientsView.js: user adds ingredients they have at home so they will know which ingredients they lack for recipes
    │
    │    
    └─── App.css: app css
    │
    └─── App.js routing etc
    │
    └─── index.css global css styles
    │
    └─── index.js initiates model

```


## Further improvements

If more time were at hand more user tests and design iterations would have been conducted to further improve the app. 

Some improvements are listed here:

- Adding a disovery page to help user discover new drinks, increasing effectiveness of app
- Optimizing app for quicker loading
- Testing implementations of searches based on user ingredients
- Improving UI consistency further

[see Usability test 2 for additional improvements considered]


