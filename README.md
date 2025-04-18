# Decent App

This is a placheholder README.md for Decent App.

What does Decent App do? I have no idea. It will be up to you, the developer of Decent App, to describe it.

There's some dev-specific content below to get you started. I figure you might replace it with content for your users later.

## Running Decent App during Development

1. Change your working directory to the project root (folder this file is in).
2. `npm install`
3. `npm run dev`
4. Browse to http://localhost:3000/ or whatever URL is shown in the output of the previous command.

## Creating an App for Decent Portal

If you'd like to make an app that can be deployed to the Decent Portal.

1. Change your working directory to the project root (folder this file is in).
2. `npm install decent-portal`
3. `npm run portal`

What will this do?

It will create Github action files for deploying, promoting, and rolling back into your project. For these to work, you will need to configure a Github repository with secret variables provided by us. Email launch@decentapps.net for more info.

It will make the <DecentBar> React component importable from the library. You can add this into your screens to show UI that allows navigation through the portal. The component can be configured to only render from decentapps.net if you want to deploy the same app to other websites.

## What You Have Now

The unmodified template installed for Decent App includes these screens:

* A loading screen that will show progress loading model into browser via WebLLM.
* A home screen that lets you send a simple prompt to a local LLM. Arriving to the home screen without an LLM connection will redirect to the loading screen. This redirection will be confirmed with a dialog if you are serving locally. This is to avoid excessive LLM reloading triggered by code changes during development.

The dependencies are minimal: (see package.json)

* webllm - For web-based LLM inference.
* dev dependencies for Vite/Typescript (build tooling), Vitest (test runner)

There is no monolithic dev-dependency package to install and upgrade. You are in charge of updating and revising your dependencies in the way you like.

## What Happened to Ollama Support? (2.0 Update)

I'm trying to streamline the code by removing Ollama support. There is a concept of a Custom LLM that I've implemented in [Hone](https://github.com/erikh2000/hone) and may bring to create-decent-app in a later release. This would allow using Ollama and other LLM servers/services. Let me know if you have an interest.

## What Happened to Wouter/URL-Based Routes? (2.0 Update)

Again, streamlining. I try to remove dependencies where I can. Much as I like Wouter, I think most devs won't need it. There are only two screens in the generated project, and one of them (the loading screen) isn't useful to be accessed from a URL. If you do want a router, feel free to install Wouter (recommended!) or your favorite library.

## Removing and Changing Unwanted Things

The template isn't a framework. It's just a reasonable starting point for a certain kind of web app. You should be able to make changes to match your preferences fairly easily. Rather than presenting you with a bunch of configuration options that manipulate a black box, you can just delete or rewrite code more directly.

Following this sensibility, things like the LLM wrapper, widgets, and persistence functionality are in-lined into the project rather than kept as dependencies in packages.
This practice is sometimes called "vendoring". The basic rationale is that sometimes it's a better to spend time understanding and writing code rather than maintaining the sprawl of a thousand or more packages. These decisions have tradeoffs, but I prefer to set the balance towards low-dependency development.

## PWA Support

You'll see a little bit of extra code for PWA support - the service worker registration and a manifest.json file. If this is unwelcome complexity, feel free to delete it. But it does give you and your users an ability to install the web app locally as an app that can run fully offline.

## Changing LLM Models

You can set the MODEL constant at the top of `/src/llm/webLlmUtil.ts` to be what you want. There is a default set there that is a "medium" choice based on balancing between capabilities and what people can run. On the Decent Portal, there's value in having a default model so that users can hop between different apps without needing to change models as often.

## Key Folders and Files

* index.html - top-level index.html that will be deployed to web root.
* src/ - root for all source that is built into the bundle.
  * common/ - Kitchen-sink folder for small utility modules and other source that doesn't merit grouping under a more general concept.
  * init/ - location for any source files called as part of initialiation.
  * developer/ - code that is really only meant to run at dev time - testing tools, profiling, backdoors.
  * llm/ - client access and other utilities around LLM. llmUtil.ts has top-level functions for calling an inference interface provided either by Ollama or WebLLM.
  * persistence/ - utilities around persisting data in IndexedDb in a key/document style with capability of importing/exporting documents as files.
  * loadScreen/ - screen that loads the chosen LLM model locally and shows progress.
  * homeScreen/ - screen that is arrived at after loading completes. In the template, this screen has a basic LLM chat interface that can be replaced.
* public/ - files and folders that will be web-accessible in the folder that built bundles and index.html are deployed to.

## Source Conventions

You can depart from the conventions below if you don't like them. I include them as an explanation for the starting files, and you are invited to continue the conventions if you want.

* A "screen" is just a cluster of self-contained UI that renders over the entire client rect.
* Each screen function uses React hooks for state management and tends to be the top-level of state passing down to sub-components through props.
* The screen function calls an `init()` function when it mounts which can also instance module-scope variables as additional state.
* Any state that is intended to be shared between screens is persisted using `/src/persistence/pathStore`. There is no need for an in-memory store (e.g. Redux) with this approach. And if you persist all data needed to initialize a screen, it effectively creates a saved session that a user can return to on the same device. That saved state is also exportable and importable (useful for backing up or transferring data between devices).
* If functionality is tied to one screen, keep source for it under the corresponding screen folder.
* If functionality is common to multiple screens and has more than one source file, create a new folder under `/src` for it.
* Otherwise, common functionality can go in a source file under `/common`.

## Licensing

My code and other files in this repository are licensed under the MIT open source license.

The fonts used by the template are hosted from decentapps.net rather than included in this repo. Their licensing is separate, but will be something compatible with open source, e.g., OFS SFIL. If you want to self-host the fonts rather load them from decentapps.net, the easiest thing might be to just find the same fonts from other sources and verify the licensing for your use. 

If you want to check the licensing I used for a hosted font, you can replace the filename of the URL that loads a WOFF or WOFF2 file with "LICENSE". So for example, the font served from "https://decentapps.net/fonts/hobby-of-night/hobby-of-night-webfont.woff2" was licensed to me according to terms found at "https://decentapps.net/fonts/hobby-of-night/LICENSE".

## Contributing

The project isn't open to contributions at this point. But that could change. Contact me if you'd like to collaborate.

## Contacting

You can reach me via my [LinkedIn profile](https://www.linkedin.com/in/erikhermansen/). I'll accept connections if you will just mention "decent apps" or some other shared interest in your connection request.

-Erik Hermansen