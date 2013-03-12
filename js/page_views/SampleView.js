define([
        'jquery',
        'underscore',
        'backbone',
        'text!templates/SampleViewTemplate.html',
        'sub_views/SampleSubView'
], function ($, _, Backbone, sample_temp, SampleSubView) {
/**************************************************************************
* Name: SamplView
* Type: Page View
* Author: Jon Lange
*
* This view demonstrates a popup. Which can
* have the same functionality as any other view.
***************************************************************************/
    var SampleView = Backbone.View.extend({

        page_name: 'sample-page',

        $el: $('#sample-wrapper'),

        initialize: function (options) {

            this.event_queue = options.event_queue;

            this.event_queue.msg.bind(this.event_queue.SHOW_APPLICATION, this.showMe, this);

            this.render();

            // initialize any subviews for this module.
            // pass a reference to where we want this subview to render, as well as 
            // a reference to the event_queue object for message passing.
            this.sample_subview = new SampleSubView({ el: $('#sample-subview-container'), event_queue: this.event_queue });

        },

        template: _.template(sample_temp),

        render: function () {

            this.$el.empty();

            // data can be passes in to templates in the form of a JSON object. Here is a quick example. 
            // An example of how to insert this data into the template file can be found in the file
            // SampleViewTemplate.html in the templates directory.
            var options = { title: "Hello World", author: "Jon", company_name: "Resting Robot", company_url: "http://www.restingrobot.com" };
            
            this.$el.append(this.template(options));

        },

        showMe: function (message) {
            if ((message == null) || (message.application == null)) {
                return;
            }

            if (message.application == this.page_name) {
                window.scrollTo(0, 0);
                this.$el[0].style.display = 'block';

               //add any initial display logic here.

            } else {
                this.$el[0].style.display = 'none';
            }
        },

    });
    return SampleView;
});
