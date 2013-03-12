define([
        'jquery',
        'underscore',
        'backbone',
        'text!templates/SampleSubViewTemplate.html'
], function ($, _, Backbone, sub_view_template) {
/*****************************************************************************
* Name: SampleSubView
* Type: Sub View
*
* This view demonstrates using a subview to 
* encapsulate relevant functionality to a view.
******************************************************************************/
    var SampleSubView = Backbone.View.extend({

        is_visible: true,

        // For "Sub View" modules the el is defined in the initialize function.
        // el: $('#'),

        // We are not using the backbone built in events because we need to 
        // implement special logic that determines if we are useing click or touch.
        // events: {},

        // The initialize function is essentially the constructor that gets 
        // called for a backbone object.  This gets called when the object is 
        // initialized using "new".  The initialize does not necessarily create
        // what is needed to display the page.  The render function is 
        // responsible for that.  The initialized sets up the event collection 
        // and object data that needs to be loaded.
        initialize: function (options) {
            // Every "Sub View" module is passed in a parent element to use.  
            // Store this in the standard el variable.
            this.el = options.el;

            // Every view is passed a list of options.  One of these options is 
            // the PubSub object (event_queue).  This is used to get messages
            // meant for this module or send messages to other modules.
            this.event_queue = options.event_queue;

            // bind to a SHOW_APPLICATION event from the event_queue
            this.event_queue.msg.bind(this.event_queue.SHOW_APPLICATION, this.showMe, this);
        },

        // Template we are using to build the sub view.  
        template: _.template(sub_view_template),

        // The render function will actually display the view.  Displaying a view 
        // usually means initializing a "Sub View" modules or building html using 
        // templates.  We want to keep html out of the javascript as much as possible
        // so avoid building the html by appending strings to the element.
        render: function () {

            // For this view the render is clearing out all the current data and 
            // reloading the list.  We are calling the render multiple times in this 
            // example.  I think it would be better to have a refresh function and only
            // call the render one time, but since our data isn't actually changing
            // it's not really necessary.
            $(this.el).empty();

            $(this.el).append(this.template({}));
        },

        // Subviews do not have to be rendered by their parent views. 
        // This allows for more control as to when they show themselves, 
        // as well as automatically hides them when a new view is shown.
        showMe: function (message) {
            if ((message != null) || (message.application = null)) {
                if (message.application == 'sample-page') {
                    this.is_visible = true;
                    this.render();
                } else {
                    this.is_visible = false;
                }
            }
        },
    });

    return SampleSubView;
});
