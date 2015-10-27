# seed for AngularJS app

This project is an application skeleton for a typical [AngularJS](http://angularjs.org/) web app.
You can use it to quickly bootstrap your angular webapp projects and dev environment for these
projects.

## Getting Started

To get you started you can simply clone the repository and install the dependencies:

### Prerequisites

We also use a number of node.js tools to initialize and test pxladmin-redesign. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

```
npm install
```
```
bower install
```

You should find that you have two new folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files


### Run the Application

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/app`.


## Directory Layout

    app/                --> all of the files to be used in production
      css/              --> css files
        app.css         --> default stylesheet
      img/              --> image files
      index.html        --> app layout file (the main html template file of the app)
      js/               --> javascript files
        app.js          --> application
        controllers.js  --> application controllers
        directives.js   --> application directives
        filters.js      --> custom angular filters
        services.js     --> custom angular services
      partials/             --> angular view partials (partial html templates)
        dasbboard/          --> dashboard views
        home/               --> home views

Representations: 

saveData: {
  owner: owner._id,
  objectType: list.id,
  apiName: merge.id,
  label: merge.label,
  picklist: [
    {
      name: value name,
      html: campaign tag,
      imgsrc: campaign image,
      camp: campaign name
    }
  ]
}