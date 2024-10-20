---
title: "Create and Host Your Website for Free with GitHub Pages: A Step-by-Step Guide"
description: "In this Step-by-Step guide, you'll learn how to make use of GitHub Pages as well as how you can create and host your website for free."
date: 2024-10-20
excerpt_separator: "<!--more-->"
categories:
  - Writing
  
tags:
  - Guide
  - Writing
  - Marketing
  - Money
  - Business
  - Communication

---

Having your website gives you the freedom to publish whatever content you want when you want. And building your website has never been easier than it is today.

However, there are countless options you can choose from: they range from website-like platforms to coding your website from scratch.

But which one to choose?

| ![image](/assets/images/clark-tibbs-do-something-great-unsplash.jpg) |
|:--:|
| *Photo by Clark Tibbs on Unsplash* |

In this step-by-step guide, I want to show you my favorite option (GitHub pages), and how you can use it to build your website and host it for free.

## Why I created my website

I had experience with WordPress and self-hosting (just for learning I tried it out), but I never really became fond of WordPress as it seemed somewhat maintenance intensive.

And I didn’t “need” a website back then.

However, that changed once I started online writing.

The question was: where do I want to publish my articles? There are many options:

- **Platforms**: There are a lot of great platforms to publish your writing online ([Medium](https://medium.com/), [Substack](https://substack.com/), …). And they are great. You don’t need to deal with running and maintaining your website at all. Instead, you can focus on the writing itself. However, your customization options are limited.
- **Website**: A personal website gives you almost limitless options of what you can do and you are in full control of your content. However, that comes at a price: running your website needs time (maintaining, updating, …) and money (domain, hosting, …).

I decided to go hybrid.

I wanted to publish on platforms to (as [Nicolas Cole](https://medium.com/@nicolascole77) suggests) create a following. But I also wanted to learn how to build, host, and run my website.

In October 2023 I created and published [my website](https://matthiaskarner.com/) and signed up at [Medium](https://matthiaskarner.medium.com/).

For my website, I used (and still use) GitHub pages.

## Why GitHub pages?

To understand why GitHub pages is a great, option, let’s briefly dive into the different options to create a website.

### WordPress

More than 43 % of all websites globally use WordPress, as statistics at [W3Tech](https://w3techs.com/technologies/details/cm-wordpress) show.

That’s a lot.

And to be honest I understand why: it is free to use and doesn’t have a steep learning curve. You have different “what you see is what you get” editors and don’t have to code at all.

However, when it comes to hosting WordPress it can become tricky.

If you go the self-host route, you need to have a deep understanding of networking and IT security.

If you, on the other hand, are going the web-hosting route, you have hundreds of options where to host your website - with varying costs and performance. So you need to invest at least a little bit of time in researching a hosting provider that suits your needs.

### Website builders

An alternative that has become popular in recent years are website builders like [Squarespace](https://www.squarespace.com/), [Wix](https://wix.com/), …

They are easier to use than bare-bones WordPress and they come with in-built hosting - so you get the full worry-free package and can concentrate on the looks of your website.

However, they are more pricey than using WordPress in combination with a hosting provider and you have a little fewer options when it comes to customization.

### GitHub pages

GitHub page is a tool where you can publish and host your website - it is the cheapest option as it is completely for free.

If you are not familiar with the world of coding, GitHub might be new for you: [GitHub](https://github.com/) is a (free) online service to publish and version control the software you develop. And it is used by more than 100 million developers worldwide.

GitHub page is an in-built feature that enables you to host a Jekyll-based website for free. It was initially developed to give developers a platform where they can host their software documentation. But it can be much more than that.

This all might seem as if you need to be deep into tech stuff to work with it, but it is much simpler than that.

Examples for GitHub pages websites are:

- https://developer.spotify.com/
- https://www.sketch.com/
- https://matthiaskarner.com/
- https://release.mozilla.org/

## Step-by-Step guide: how to create and host your GitHub pages website

### Create a GitHub Account

In order to use GitHub pages, you first need a GitHub account. If you don’t have one yet, head over to https://github.com/ and create an account for free.

### Choose your route

Creating a website at GitHub pages comes some options you can choose from. You can (1) build your static website from scratch, or (2) use frameworks such as [Jekyll](https://jekyllrb.com/).

I’d definitely recommend the second option and in this guide, I’ll focus on (2).

### Choose a template

The great thing about using Jekyll as your framework is, that you don’t have to build your design from scratch. There exist dozens of handsome templates you can use as your starting point.

You can find them here:

- http://jekyllthemes.org/
- https://jekyll-themes.com/
- https://jamstackthemes.dev/

If you are looking for a well-documented, minimalist design, I can highly recommend [minimal-mistakes](https://mmistakes.github.io/minimal-mistakes/).

### Clone the template

If you’ve decided on the template you want to use, the next step is making use of that.

Let’s assume you chose minimal-mistakes: head over to their GitHub repository and click on fork. I’d recommend [this repository](https://github.com/mmistakes/mm-github-pages-starter). It is a version that is perfectly suited for use as a GitHub pages starter.

| ![image](/assets/images/github-pages-guide/mmistakes_mm-github-pages-starter.png) |
|:--:|
| *Repository. Source: Screenshot from https://github.com/mmistakes/mm-github-pages-starter* |

This will open a new dialogue “Create a new fork” and as a repository name, it’ll suggest *mm-github-pages-starter*.

For GitHub pages to work, you need to rename the repository to *“USERNAME.github.io”* (use your GitHub username instead of USERNAME) and then click on *“create fork”*.

| ![image](/assets/images/github-pages-guide/Fork.png) |
|:--:|
| *Create a fork. Source: Screenshot from https://github.com* |

The source code you’ll need will then be automatically copied into your repository. Now you are just four steps away from your first test run:
1. Navigate to *“Settings”* and open the entry *“Pages”*.
2. Under *"Source"*, select *”Deploy from a branch”*.
3. Under "Branch", use the branch dropdown menu and select a publishing source (this will be the master branch).
4. *Go to “USERNAME.github.io”* to visit your newly created website.

| ![image](/assets/images/github-pages-guide/settings.png) |
|:--:|
| *Change settings. Source: Screenshot from https://github.com* |

### Personalize

Now, your website is up and running.

However, it is still showing the configuration (name, title, …) from the template. So to make the website *yours*, you need to personalize it.

Another great thing about Jekyll is, that you find all the important configurations neatly packed into one file: the “_config.yml”.

| ![image](/assets/images/github-pages-guide/_config.PNG) |
|:--:|
| *Configuration file, upper section. Source: Screenshot from https://github.com* |

Open the configuration file and take a few minutes to walk through the file. It is self-explanatory and you can customize the entries as you like. You should at least update the following entries:

- **title**: This is the title of your website that is shown on the top of each page.
- **description**: This isn’t shown directly on the website (for the theme minimal-mistakes), but is used in the background by search engines. Try to write a brief summary what your website is about.
- **permalink**: This is optional, but I’d recommend that you change it to the following: */:year/:month/:title/*
- **name**: Write your name or alias.
- **avatar**: The template provides a default image. You can change the image to whatever you like. Just upload an image into the folder assets/images and change the link next to avatar accordingly.
- **bio**: The bio is shown below your name. Say whatever you want!
- **links**: This is a larger section and you can customize it a lot. The text next to *“label”* is what is written below your bio. The *“icon”* uses *Font Awesome* icons. There are hundreds of options you can choose from (see [here](https://fontawesome.com/search?q=linked&o=r&m=free)) including icons from platforms such as Instagram, LinkedIn, and many more. To link to your other website, Instagram, or LinkedIn page, put the link next to *“url”*. You can use as many links as you’d like - just follow the template.
- **footer**: This section is similar to the links section and uses the same logic. You can either use the same links as before or use different ones.

| ![image](/assets/images/github-pages-guide/_config2.PNG) |
|:--:|
| *Configuration file, lower section. Source: Screenshot from https://github.com* |

That’s it.

You can configure a lot more (some more recommendations at the end of the guide), but with these essentials your website becomes *yours*.

### Create your content

Now it is about time to create your content.

Within Jekyll, the content is created within the folder “*_posts*”. In the template, you can already find some examples to get started. Essentially a post consists of three essential elements:

- **Filename**: It is handy to keep a certain structure to your content files, like: year-month-day-title.md
- **Header**: The header of the file starts and ends with “---”. Here you provide meta information of your post like title, subtitle, summary, and date. You can also make use of categories and tags to organize your content. It’ll be shown on your website in the particular section.
- **Content**: Below your header, you can write your actual content in markdown format. If you’ve read about “markdown” for the first time: it is a format that is easily human and machine-readable and doesn’t come with a lot of tags and brackets as HTML does. It is, however, handy to write your content in a markdown-editor first and copy it over to the content section of your file once your a finished. As a markdown editor I use notion (I create and manage my blog posts there anyway). Alternatively, I’ve heard that [StackEdit](https://stackedit.io/) is nice - it is a free, browser-based editor.

| ![image](/assets/images/github-pages-guide/post.PNG) |
|:--:|
| *Structure of a post file. Source: Created by the author.* |

### Further recommendations

- **Add a custom domain**: So far your website is completely free. It, however, uses a rather weird domain with “*USERNAME.github.io”*. If you want to, you can change this within your settings at GitHub. And don’t be afraid, this won’t break the bank: you can pick up domains starting from below 1 $ per year.
- **Use Visual Studio and work on your website locally**: A great thing about GitHub is that you can work directly within the browser. What I’d recommend is that you install [Visual Studio Code](https://code.visualstudio.com/) (it’s free) and connect to your repository at GitHub: go to your repository, click *“code”* and copy the shown URL *“https://github.com/…”*. In Visual Studio Code open a new window and click on “Clone Git Repository …” and enter the link you just copied. And … voila: the source code is downloaded and you can work on it locally. To update your website, you need to push it to the remote at GitHub (you’ll need some basic git skills, but you can pick them up in 15 minutes [here](https://www.youtube.com/watch?v=USjZcfj8yxE&t=164s)).

| ![image](/assets/images/github-pages-guide/clone.png) |
|:--:|
| *Clone to Visual Studio Code. Source: Screenshot from Visual Studio Code.* |

- **Google Tracking ID**: It is great to have a website. But are you curious how many visitors you are getting? You can easily track this with a Google tracking ID. Head over to Google Tag Manager and create one. To make use of it you’ll also need to add a small configuration to your “_config.yml” as shown below.

| ![image](/assets/images/github-pages-guide/gtag.png) |
|:--:|
| *Google Tracking ID in _config.yml. Source: Created by the author.* |

---

Thank you for reading! I hope you’ve found my guide useful and are heading out to GitHub to create your websites. If you have any questions, please leave a comment at Medium or LinkedIn!