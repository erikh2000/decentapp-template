# Decent App Template

This repo is meant to serve as a template to start other projects with the following qualities:

* Static-content, single-page web app with Vite-built bundles.
* Typescript/React codebase.
* Use local LLMs via WebLLM (post-deployment) or Ollama (during development)
* Common look and feel via widgets and design system from shared libraries.
* Intended to be deployed on decentapps.net. (There are some hard-coded things like web fonts that can be changed.)

The dependencies are minimal: (see package.json)

* sl-react-ui - A widget library for React.
* wouter - Basic URL routing.
* webllm - For web-based LLM inference.
* dev dependencies for Vite/Babel/Typescript (build tooling), Jest (test runner)

There is no monolithic dev-dependency package to install and upgrade in the create-react-app style. You can consider a repo generated from this template as "ejected".

If you don't like the widgets I made in `sl-react-ui`, uninstall that library and delete code until the build builds again. It should take about 15 minutes. And you can begin again with `tailwind` or some other preferred widget/design system. Whatever brings you glory!

Similarly, if you don't want to use `webllm`, uninstall the `webllm` package and delete code until the build builds again. Easy!

I chose `wouter` because it's very simple and minimal. But if you prefer `react-router` or no router at all, it's not hard to yank it out.

This isn't a framework. It's just a reasonable starting point for a certain kind of app that I call a "decent app".

## The "Decent" Sensibilities

Decent apps seek to do right by their users by keeping their data off of the cloud. This template is based on certain "decent" sensibilities:

* Think local - the project template is designed to avoid use of services and give you enough to do things without them.
* Ask before calling services - if you do call services, ask the user for permission and never call services beyond those described.
* Low-dependency - packages should be imported with reluctance as they increase risk of supply chain attacks and other problems. There's an article I wrote about this sensibility called ["Write More, Reuse Less"](https://levelup.gitconnected.com/write-more-reuse-less-fbf8a010c5f4).
* No sneakiness - "Sneaky" means unexpected by the user. An example would be creating a link to a website that sends user data in the querystring.

Decent apps allow users to trust certain kinds of use cases in web apps that they wouldn't otherwise. Some examples:

* Track your medical history and ask an LLM questions about it.
* Record meetings and generate notes for them.
* Keep a travelogue of all the places you've been in your life.
* Talk to an LLM about how much you hate your boss.
* Create web apps that can process company data without worrying about the data leaving a company-issued device.

Users can do these kinds of things without fear of insurance companies, government agencies, marketeers, research harvesters, doxxers, hackers, scammers, and spammers exploiting them.

With decent apps, users need not trust the privacy policy of a company to protect their data, because the company won't even *have* their data. 

## Key Folders and Files

* index.html - top-level index.html that will be deployed to web root.
* src/ - root for all source that is built into the bundle.
  * common/ - Kitchen-sink folder for small utility modules and other source that doesn't merit grouping under a more general concept.
  * init/ - routing, plus location for any source files called as part of initialiation.
  * developer/ - code that is really only meant to run at dev time - testing tools, profiling, backdoors.
  * llm/ - client access and other utilities around LLM. llmUtil.ts has top-level functions for calling an inference provided either by Ollama or WebLLM.
  * persistence/ - utilities around persisting data in IndexedDb in a key/document style with capability of importing/exporting as ZIP.
  * startScreen/ - screen that is only visible in development. In production, navigates immediately to loadScreen.
  * loadScreen/ - screen that loads the chosen LLM model locally and shows progress.
  * homeScreen/ - screen that is arrived at after loading completes. In the template, this screen has no functionality.
* public/ - files and folders that will be web-accessible in the folder that built bundles and index.html are deployed to.
* .github - Continuous deployment script that will deploy on push to a folder on decentapps.net. Requires configuration of secret vars on the Github repo - otherwise deployment will fail benignly when you push. You can delete/edit this script if you don't want to deploy to decentapps.net.

## Source Conventions

This is not a framework - you can depart from the conventions below if you don't like them. I include them as an explanation for the starting files, and you are invited to continue the conventions if you want.

* Screens correspond to URL-based routes. A screen is just a cluster of self-contained UI that renders over the entire client.
* Each screen function uses React hooks for state management and tends to be the top-level of state passing down to sub-components through props.
* The screen function calls an init() function when it mounts which can also instance module-scope variables as additional state.
* Any state that is intended to be shared between screens is persisted using `/src/persistence/pathStore`. There is no need for an in-memory store (e.g. redux) with this approach. And if you persist all data needed to initialize a screen, it effectively creates a saved session that a user can return to on the same device. That saved state is also exportable and importable via ZIP files.
* If a capability is tied to one screen, keep source for it under the corresponding screen folder.
* If a capability is common to multiple screens and has more than one source file, create a new folder under `/src` for it.
* Otherwise, the common capability can go in a source file under `/common`.

## Deploying to DecentApps.net

I'd like to make it easy for people that use this template to deploy apps to decentapps.net, but I'm not quite ready to promote this. There are some LLM-caching advantages to having multiple apps under one domain. If you're interested in collaborating with me on this before it's smooth and effortless, please contact me.

## Licensing

My code and other files in this repository are licensed under the MIT open source license.

But if you see a LICENSE file in a sub-directory of the repository, that license will apply to all files found in that directory.

## Contributing

The project isn't open to contributions at this point. But that could change. Contact me if you'd like to collaborate.

## Contacting

You can reach me on LinkedIn. I'll accept connections if you will just mention "decent apps" or some other shared interest in your connection request.

https://www.linkedin.com/in/erikhermansen/