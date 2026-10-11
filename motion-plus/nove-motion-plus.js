/* Compatibility entry point. Editorial v2 in design.js owns all entrances.
   Keep this existing Webflow script reference safe without a second RAF loop. */
(()=>{'use strict';
 if(window.NoveMotionPlus)return;
 window.NoveMotionPlus={version:'2.0.0-local',state:'integrated',get director(){return window.NoveMotionDirector||null;}};
})();
