# IPyApp


This package currently serves as a proof of concept for bundling IPython notebook into a standalone executable application.

There are basically two components to bundling this. The first is to take Python and IPython and any other python libraries, and bundle them into a platform executable.

Then wrap this executable in a [node-webkit](https://github.com/rogerwang/node-webkit) app to provide the web UI to the notebook server.

Current this POC is limited to Mac OS using [Py2App](https://pypi.python.org/pypi/py2app/).

However node-webkit is cross platform, so as long as an executable can be created (ie py2exe), then this general approach should be cross platform.

Another platform specific issue to figure out, is where the default notebook directory should be. Currently in the POC, it creates ~/Library/ipyapp-notebooks/.

## How to create the bundle

A built version - with just IPython can be [downloaded from here](http://ptone.com/temp/IPyApp.zip).

First, create a virtualenv and install IPython, py2app and any packages you want included.

Then cd into the py2app directory and build the executable

	rm -r build dist; python setup.py py2app --packages IPython
	
Include any additional --packages

This will create a nb.app executable in the dist folder. Copy this into the app.nw folder.

Next download the [node-webkit binary](https://github.com/rogerwang/node-webkit#downloads)

Right click on the node-webkit.app binary that you downloaded and choose "Show Package Contents"

Copy the provided Info.plist file into the Contents folder of the package, and copy the app.nw folder into the Contents/Resources folder of the package.

You should now be able to launch the app by double clicking.

The layout of the app should look something like:



	IPyApp.app
	└── Contents
	    ├── Frameworks
	    │   ├── crash_inspector
	    │   ├── node-webkit\ Framework.framework
	    │   │   ├── Libraries
	    │   │   ├── Resources
	    │   │   ├── node-webkit\ Framework
	    │   │   ├── node-webkit\ Framework.TOC
	    │   │   └── node-webkit\ Framework.tmp
	    │   ├── node-webkit\ Helper\ EH.app
	    │   │   └── Contents
	    │   ├── node-webkit\ Helper\ NP.app
	    │   │   └── Contents
	    │   └── node-webkit\ Helper.app
	    │       └── Contents
	    ├── Info.plist
	    ├── MacOS
	    │   └── node-webkit
	    ├── PkgInfo
	    └── Resources
	        ├── app.nw
	        │   ├── app.icns
	        │   ├── IPythonConsole.png
	        │   ├── nb.app
	        │   ├── node_modules
	        │   ├── package.json
	        │   ├── start.html
	        │   └── test.js
	        └── nw.icns
	


### Similar projects:

* https://github.com/mangecoeur/ipython-desktop - A similar project that uses node-webkit, but does not bundle the python environment, but provides an alternative to opening in the browser.
* https://github.com/liyanage/ipython-notebook - A project to embed IPython notebook into a native Mac App using OS X only web ui views



