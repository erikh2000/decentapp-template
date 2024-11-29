# Decent App

This is a placheholder README.md for Decent App.

What does Decent App do? I have no idea. It will be up to you, the developer of Decent App, to describe it.

There's some dev-specific content below to get you started. I figure you might replace it with content for your users later.

## Running Decent App during Development

1. Change your working directory to the project root (folder this file is in).
2. `npm install`
3. `npm run dev`
4. Browse to http://localhost:3000/ or whatever URL is shown in the output of the previous command.

## Deploying to DecentApps.net

Please see my comments about doing this in the [`create-decent-app` readme](https://github.com/erikh2000/create-decent-app/blob/main/readme.md). 

## What You Have Now

The unmodified template installed for Decent App includes these screens:

* A start screen that shows up in local-hosted dev environments that requires the click of a button before loading the LLM. This is to avoid hot-reloads causing an immediate full LLM load as you change code.
* A loading screen that will show progress loading either Ollama (optional for development) or WebLLM (production).
* A home screen that lets you send a simple prompt to a local LLM.

The dependencies are minimal: (see package.json)

* wouter - Basic URL routing.
* webllm - For web-based LLM inference.
* dev dependencies for Vite/Babel/Typescript (build tooling), Jest (test runner)

There is no monolithic dev-dependency package to install and upgrade in the `create-react-app` style. You can consider the Decent App project generated from this template as "ejected".

## Removing and Changing Unwanted Things

The template isn't a framework. It's just a reasonable starting point for a certain kind of web app. You should be able to make changes to match your preferences fairly easily. Rather than presenting you with a bunch of configuration options that manipulate a black box, you can just delete or rewrite code more directly.

Following this sensibility, things like the LLM wrapper, widgets, and persistence functionality are in-lined into the project rather than kept as dependencies in packages.
This practice is sometimes called "vendoring". The basic rationale is that sometimes it's a better to spend time understanding and writing code rather than maintaining the sprawl of a thousand or more packages. These decisions have tradeoffs, but I prefer to set the balance towards low-dependency development.

## Using Ollama Instead of WebLLM

I've found that Ollama is better to use during development, because it keeps the LLM available even if you refresh-browser/hot-reload your web app. Ollama is a separate process that runs natively and must be installed. A local web server is able to make `fetch()` calls to a local Ollama server. But when you deploy your web app to a production web host, the web app will no longer be able to call Ollama or any local server (without contriving a specific configuration that users of your web app are unlikely to repeat).

So basically, WebLLM will work for both local development and production hosting. But Ollama is nicer for local development. And WebLLM (not Ollama) will work for production web hosting.

You can find instructions to install Ollama at [ollama.com](https://ollama.com/). Once it is installed and running on the same device as your dev environment, Decent App will connect to it in local dev hosting, but not production hosting. If Decent App doesn't find Ollama, it will use WebLLM.

If you want to run Ollama from a different IP address or port than the defaults, edit the constants found at the top of `/src/llm/ollamaUtil.ts`.

## Changing LLM Models

You can set the MODEL constant at the top of `/src/llm/ollamaUtil.ts` and `/src/llm/webLlmUtil.ts` to be what you want. There are defaults set already that you can leave if you like them.

The Ollama and WebLLM projects largely overlap in the models they provide, but not exactly. For example, at time of writing, WebLLM seems to have dropped some older Llama models that Ollama still supports. For your development, I would try to use the same model in Ollama that you will use for WebLLM. This is admittedly difficult with the different model-mapping/retention approaches of the two projects. A useful strategy could be to use WebLLM for prompt engineering sessions and accept that Ollama might be loading a slightly different model that gives different behavior.

## Key Folders and Files

* index.html - top-level index.html that will be deployed to web root.
* src/ - root for all source that is built into the bundle.
  * common/ - Kitchen-sink folder for small utility modules and other source that doesn't merit grouping under a more general concept.
  * init/ - routing, plus location for any source files called as part of initialiation.
  * developer/ - code that is really only meant to run at dev time - testing tools, profiling, backdoors.
  * llm/ - client access and other utilities around LLM. llmUtil.ts has top-level functions for calling an inference interface provided either by Ollama or WebLLM.
  * persistence/ - utilities around persisting data in IndexedDb in a key/document style with capability of importing/exporting as ZIP.
  * startScreen/ - screen that is only visible in development. In production, navigates immediately to loadScreen.
  * loadScreen/ - screen that loads the chosen LLM model locally and shows progress.
  * homeScreen/ - screen that is arrived at after loading completes. In the template, this screen has no functionality.
* public/ - files and folders that will be web-accessible in the folder that built bundles and index.html are deployed to.
* .github - Continuous deployment script that will deploy on push to a folder on decentapps.net. Requires configuration of secret vars on the Github repo - otherwise deployment will fail benignly when you push. You can delete/edit this script if you don't want to deploy to decentapps.net.

## Source Conventions

You can depart from the conventions below if you don't like them. I include them as an explanation for the starting files, and you are invited to continue the conventions if you want.

* Screens correspond to URL-based routes. A "screen" is just a cluster of self-contained UI that renders over the entire client rect.
* Each screen function uses React hooks for state management and tends to be the top-level of state passing down to sub-components through props.
* The screen function calls an `init()` function when it mounts which can also instance module-scope variables as additional state.
* Any state that is intended to be shared between screens is persisted using `/src/persistence/pathStore`. There is no need for an in-memory store (e.g. redux) with this approach. And if you persist all data needed to initialize a screen, it effectively creates a saved session that a user can return to on the same device. That saved state is also exportable and importable (useful for backing up or transferring data between devices).
* If functionality is tied to one screen, keep source for it under the corresponding screen folder.
* If functionality is common to multiple screens and has more than one source file, create a new folder under `/src` for it.
* Otherwise, common functionality can go in a source file under `/common`.

## Licensing

My code and other files in this repository are licensed under the MIT open source license.

But if you see a LICENSE file in a sub-directory of the repository, that license will apply to all files found in that directory.

## Contributing

The project isn't open to contributions at this point. But that could change. Contact me if you'd like to collaborate.

## Contacting

You can reach me via my [LinkedIn profile](https://www.linkedin.com/in/erikhermansen/). I'll accept connections if you will just mention "decent apps" or some other shared interest in your connection request.