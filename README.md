<p align="center">
  <a href="https://nexus-zblj.onrender.com" target="_blank" ><img class="hello" src="frontend/public/assets/images/seeds/logo-canvas.png" width="400" alt="logo" /></a>
</p>
<p align="center">
  <a href="https://nexus-zblj.onrender.com" target="_blank"><span style="font-weight: bold; color: #0a66c2">NexUs&trade;</span > <span style="color: white">: Connect with Yourself</span></a>
</p>

# Table of Contents
* [Background and Overview](#background-and-overview)
* [MVP Features](#mvp-features)
  * [Itinerary Curation: CRUD](#itinerary-curation-create-read-update-destroy)
* [Future Functionalities](#future-functionalities)
* [The Developer](#about-me)


# Background and Overview

Welcome to NexUs, an inter-universal professional networking social-media application based on the popular website LinkedIn. Connect with others AND yourself from 

* Languages: JavaScript, HTML5, CSS3
* Frontend: React-Redux
* Backend: Ruby on Rails
* Database: PostgresQL
* Hosting: Render

# MVP Features

## Itinerary Curation: <span style="font-size: small;">`CREATE` `READ` `UPDATE` `DESTROY`</span>

Right from the splash, <span style="color: #fccd89;">**itinerator&trade;**</span> users start their personalized journey. 

![splash](frontend/src/assets/gif1-splash.gif)

Users can select an unlimited amount of activites, name the itinerary, and save it.

![save](frontend/src/assets/gif2-save.gif)

Users can update/destroy their saved itinerary immediately, or from the splash page.

![update](frontend/src/assets/gif3-update.gif)

## Google Maps API

<span style="color: #fccd89;">**itinerator&trade;**</span> utilizes Google Maps API to explore an endless amount of options based on real-time data provided by Google Maps on an interactive and intuitive map interface. Activity recommendations are generated through a combination of 4 methods:

* #### Generation by Preferred Type

Upon clicking a preferred type icon, 3 new activities will be suggested. If <span style="color: #fccd89;">**itinerator&trade;**</span> cannot find 3 suitable activities of preferred type within a 500m radius, it will continue to increment its search radius by 500m until it does before displaying them to the user.

![preferred-type](frontend/src/assets/gif4-preferred-type.gif)

* #### Generation by Previous Type

While creating an itinerary, upon selecting a generated suggestion, the map centers over that selected activity and generates 3 new suggestions based on that activity's type. Of course, users can choose their own type if they prefer.

* #### Generation by Randomized Type

While updating an itinerary, upon selecting a generated activity suggestion, the map centers around that selected activity and performs a nearbySearch, generating 3 new suggestions of a randomized type.

![randomized-type](frontend/src/assets/gif5-randomized-type.gif)

* #### Generation by Map Interaction

Upon dragging the map to a new location, <span style="color: #fccd89;">**itinerator&trade;**</span> dynamically performs a new search, generating 3 new activities.

![map-interaction](frontend/src/assets/gif6-map-interaction.gif)

## Community Interaction (Like & Comment): <span style="font-size: small;">`CREATE` `READ` `UPDATE` `DESTROY`</span>

Upon saving a personalized itinerary, other users will be able to view, like, and comment on the itinerary. These interactive features facilitate meaningful interactions within the community, fostering a sense of connection among <span style="color: #fccd89;">**itinerator&trade;**</span> users.

![interaction](frontend/src/assets/gif7-interaction.gif)

## Future Functionalities

#### Expanded Search Capability
* Users will be able to utilize a search bar during the itinerary creation process to search by any desired keyword.
* Users will have the option to view the next 3 activities if they did not like any of the first set of suggestions.

## About Me

<div>
<img src="frontend/src/assets/itineratorPlaneLow.png" alt="Custom Bullet" width="30" style="vertical-align: middle; margin-right: 10px;"/> 
    Flex Lead: <a target="_blank" href="https://github.com/bchoi28">Brandon Choi</a>
</div>


## Thanks for Reading!

<span style="color: #fccd89;">**itinerator&trade;**</span> was brought to fruition from a 4-day sprint. We hope you enjoy our app, have fun, and safe travels. Bon voyage! 

<br>

<p align="center">
  <img src="frontend/src/assets/itineratorLogoMain.png" alt="itinerator logo"
  width="300" />
</p>

# NexUs - Intergalactic Professional Networking

Welcome to NexUs, a LinkedIn clone designed for those who wish to take their professional networking intergalactic. This full-stack project combines Ruby on Rails on the backend with React and Redux on the frontend to provide a comprehensive networking platform.

## Features
- User registration and authentication
- User profiles with customizable information
- Posts for sharing professional updates and insights
- Like functionality for engaging with posts and comments
- File uploads for adding images to posts
- Intuitive user interface for seamless navigation and interaction
- Profile search bar with autofill functionality

## Technologies Used
- Ruby on Rails: Backend framework for building robust APIs and managing data
- React: JavaScript library for building interactive user interfaces
- Redux: State management library for managing application state
- PostgreSQL: Relational database for storing application data
- CSS: Styling and design of the user interface
- AWS S3: Cloud storage for uploading and serving user images

