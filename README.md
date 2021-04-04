# CP3351 React Native Project Work on Smart FitIot

## Contents
* [React Native UI Lib](#react-native-ui-lib)
* [Carlos Tasks](#carlos-tasks)
* [Zainab Tasks](#zainab-tasks)
* [Omar Tasks](#omar-tasks)
## React Native UI Lib
Run all the following commands for this library from wix https://wix.github.io/react-native-ui-lib/
```
npm install react-native-ui-lib
npm i react-native-gesture-handler
npm i react-native-reanimated
npm i @react-native-community/blur
npm i @react-native-community/datetimepicker
npm i @react-native-community/netinfo
npm i @react-native-picker/picker
npm i @react-native-community/picker
npm i @expo/vector-icons@12.0.3 (for icons)
```
### Main Components Used
* Cards, Cards.Section, Cards.Image
* List, ListItem, ListItem.Part
* Drawer for Navigation (native component)
* Tabbar and Tabs
* Dialog
* Expandable Section
* Carousel
## Carlos Tasks
### FAQs
- [X] Finished ✅
* customer gets a form to ask a question. Support can see pending questions and answer them.
* All support can remove or edit any question and they can choose to publish it or leave it as a draft.
### Ads
- [X] Finished ✅
* Ads show up on homepage for customers and public.
* Ads can have images, a set time to appear, and a url to the sensor page. Ads are added by marketing.
### UserTrackings
- [X] Finished ✅
* Track aggregate user data over periods of time to show on graphs
* Each time a user logins or registers or logs out, a new track is recorded. 
* The time is given, and a type name is given so it can be picked from a list of specific reports.
* each buy also sends a track
### Customer Reviews
- [X] Finished ✅
* Customer can leave review after installation is done. Also after support role resolves complaint
### Notifications
- [x] Finished ✅
* A new report comes in, or a sensor gets a critical reading. 
* Each user can see new notifications coming in inside the app regardless of what tab they're in. 
* A new ad also gives customers a notification
* Also if a customer wins a reward.
* Also, on service reaching a location.
## Zainab Tasks
### Rewards & customer rewards
- [x] Finished ✅
* Each user will have points. Every purchase earns them more.
* As soon as points reach a certain amount the user becomes elligble for a reward.
* The customer can redeem the reward whenever they wish.
* A reward can be a discount.
* An admin can issue a reward regardless of the above.
* Discount codes are redeeming instructions.
* Redeeming a reward links the ID of the customer to the reward.
### Favorites
- [x] Finished ✅
* A customer can mark a category as a favorite.
* A customer can see a list of their favorite in a separate tab.
* For the public, total favorites can be displayed for a category, as well as most favorited.
### Safety Instructions
- [x] Finished ✅
* Service can write instructions step by step safety instructions for the usage of sensors.
* Every instruction will have an image.
* Support will be able to do all CRUD.
* The safety instructions could be shown with a button under each category saying "view safety instructions" for this category
### Manufacturers
- [x] Finished ✅
* Admin can create manufacturers with CRUD 
* Admin can assign manufacturers to a category
* When customers will purchase sensors, they can choose which manufacturer they want with high quality, low price etc. These manufacturers can be displayed on the public home page.
### Fitness Tips
- [x] Finished ✅
* Customers can post some tips for the public and other customers. Support must approve these tips.
* Once approved will be shown to other people
* ~Again may be the other people can post their likes for these tips
### Hiring
- [x] Finished ✅
* Customer submits an application for (service, support and marketing roles) stating his skills and abilities.
* The admin sees all these applications and reviews them and approves/rejects.
* Once approved, the customer's role will be updated.
* If rejected, the application will be marked as rejected. 
## Omar Tasks
### Mapping 
- [ ] Finished ❌
* Each user can use a map to pick their address information.
* Each center will have a pin displayed for their location when display installation fees for the user.
* The map will also calculate and display the service radius around each pinned point.
### Support Centers
- [ ] Finished ❌
* each center will have gps coords, a name, and many users, as well as be referenced by each installation.
* each center will have a radius of operation and a technician count
* A technician count could be utilized by the system or the admin
	to assign new technician users automatically to centers understaffed than others.
### Installations
- [ ] Finished ❌
* Each installation and removal can be requested by a user after buying a sensor.
* Each installation and removal request is automatically assigned to the center  closest to the user requesting. 
* Each request will have an estimated fee, based on gas money from distance, and date of request.
### Reports
- [ ] Finished ❌
* Each user can request a report from a sensor of theirs, as well as a time period. 
* A report will then be generated by reading sensor reading from that time.
* Admins can also request a report on app usage. That report will combine aggregate data from usertrackings, along with a period of time to display in a graph.
