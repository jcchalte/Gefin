# Gefin
Gefin repository. A journey in TDD, CQRS, Event sourcing and automation in Typescript.

##How to install
* install node v0.10
* install Karma globally (npm install karma -g)
* install Typescript 1.4
	* remove link to old typescript folder in PATH if needed
* (optional) install a virtualization solution in order to have (at least ) IE8, IE9, IE10, IE11, Chrome and firefox browsers able to connect to your local machine
	* VM provided at modern.ie works well for that
* start Karma (karma start)
* join http://localhost:9876 (or http://10.0.2.2:9876 in virtualbox VM) with at least one browser (preferably all of them)
* then build using Jake : jake
	* or use 'jake loose=true' if not all browsers are runnning

##Troubleshootings
### jake keeps telling me that the typescript version is not 1.4.0.0 even if I installed it on my computer
Typescript adds a the Typescript compiler path to the PATH environment. Dependending on how you installed Typescript, you may still have an old reference to an old typescript folder. Please remove all typescript references in your PATH environment (except for v1.4 of course) until the command "tsc -v" returns "1.4.0.0".

## I have installed node v0.11, 0.12, or 0.467 but jake prevents me from building
The solution has been developped and tested with the v0.10 node.js version. If you are sure that your newer version is compatible, or if you just want to try, change the Configuration at the top of the jakefile.ts file