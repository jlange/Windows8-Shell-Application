/************************************************************************
*
* Main application file. 
*
* You should not have to modify this file much. Mostly just adding 
* events to the event queue and changing your initial start view. 
*
************************************************************************/

define([
        'jquery',
        'underscore',
        'backbone',
        'page_views/SampleView'
	], function($, _, Backbone, SampleView){

	    //VERY IMPORTANT!!!!!!!! 
        //This allows AJAX to work and communicate with the couch server.
	    jQuery.support.cors = true;

	 /*
	 * Name: ShellApplicationView
	 * Type: Application View
	 * This view is the wrapper for the Application Switcher.  It is the 
	 * controller that tell takes user events and uses those to drive the 
	 * display of the different "Page View" modules.
	 */
	var ApplicationView = Backbone.View.extend({

 

		// The element that contains the application switcher.
		$el: $('body'),

		// We are not using the backbone built in events because we need 
		// to implement special logic that determines wether we are click 
		// or touch driven.
		// events: {},

		// Every view is passed a list of options.  One of these options 
		// is the PubSub object (eventQueue).  This is used to get and send 
	    // messages between the different modules.	

	    // This includes all of the messaging events events needed for
	    // this application. You will most likely need to add more to this 
	    // list. In order for your pages to communicate, the messages need 
	    // to be registered here.

	    // Please try to make the message descriptive and similar to other
	    // messages that have the same function. (i.e. functions that show
        // things should start out with SHOW_ )
		event_queue: {
			"msg": _.extend({}, Backbone.Events), 
			"APPLICATION_READY" 		: "APPLICATION_READY",  
			"SHOW_APPLICATION" 			: "SHOW_APPLICATION",  
		},

		// The initialize function is essentially the constructor that gets 
		// called for a backbone object.  This gets called when the object is 
		// initialized using "new".  The initialize does not necessarily create
		// what is needed to display the page.  The render function is 
		// responsible for that.  The initialization sets up the event 
		// collection and object data that needs to be loaded.  In the case of
		// the "Application View" we call the render at the end of the 
		// initialize because we expect by default the application switcher 
		// will be displayed.
		initialize: function () {

            //We want this application view to respond when an APPLICATION_READY message is published.
			this.event_queue.msg.bind(this.event_queue.APPLICATION_READY, this.applicationReady, this);

			// Initialize application level components
			
		    // In our normal application this message would be triggered
		    // after a user successfully logged in and received an
		    // decryption key from the database. Calling it here for 
            // simplicity.
			this.event_queue.msg.trigger(this.event_queue.APPLICATION_READY);


		},

		applicationInitialized: false,
		
		applicationReady: function(message){

			if(this.applicationIntialized) {
				this.render();
				return;
			}

			this.applicationIntialized = true;
			
		    // Initialize all the page views this application has
			this.sample_view = new SampleView({'event_queue': this.event_queue});
			this.render();
		},

		// The render function will actually display the page.  Displaying a page 
		// usually means initializing "Sub View" modules or building html using 
		// templates.  We want to keep html out of the javascript as much as possible
		// so avoid building the html by appending strings to the element.
		render: function() {
			this.event_queue.msg.trigger(this.event_queue.SHOW_APPLICATION, {"application":"sample-page"});
		},
	});

	return ApplicationView;
});
