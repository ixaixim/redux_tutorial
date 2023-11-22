# Redux Full Course for Beginners

These notes are my personal reference for a beginner's course on Redux, a state management library for JavaScript applications.

![redux logo](redux.png)

## Table of Contents

- Chapter 1: Redux Toolkit Intro
- Chapter 2: App Structure & Data Flow
- Chapter 3: Async Logic & Thunks
- Chapter 4: Blog Project
- Chapter 5: Performance Optimizations
- Chapter 6: RTK Query Intro Project
- Chapter 7: Advanced Redux & RTK Query

---

## Chapter Descriptions

- **Chapter 1: Redux Toolkit Intro**
  - Introducing the Redux Toolkit, its advantages, and how it simplifies Redux development.

- **Chapter 2: App Structure & Data Flow**
  - Discussing the structure of Redux applications and the flow of data within them.

- **Chapter 3: Async Logic & Thunks**
  - Exploring asynchronous logic in Redux and the use of thunks for handling side effects.

- **Chapter 4: Blog Project**
  - A practical project to apply Redux concepts in building a blog application.

- **Chapter 5: Performance Optimizations**
  - Techniques and strategies for optimizing the performance of Redux applications.

- **Chapter 6: RTK Query Intro Project**
  - Introduction to RTK Query with a hands-on project to understand its usage and benefits.

- **Chapter 7: Advanced Redux & RTK Query**
  - Diving deeper into advanced topics in Redux and exploring more features of RTK Query.

--- 

## Saving Space

When working with React on your local machine, keeping all the necessary libraries and dependencies can take up a lot of space. To help manage this, you can uninstall all packages from each chapter by running the `uninstall_packages.sh` script in Bash.

This script will use `npm uninstall` to remove all the packages listed in the `package.json` file for each chapter, freeing up space on your machine. To run the script, navigate to the root directory of the project in your terminal and enter the command:

```markdown
bash uninstall_packages.sh
```

This will execute the `uninstall_packages.sh` script, which will remove all the packages listed in the `package.json` file for each chapter.

If you need to reinstall the packages later, you will need to run `npm install` in each chapter to reinstall the necessary dependencies. For example, to reinstall the packages for Chapter 1, navigate to the Chapter 1 directory in your terminal and enter the commands:

```markdown
cd chapter_1
npm install
```

This will install the necessary dependencies for Chapter 1.

Note that the `uninstall_packages.sh` script will permanently remove the packages for each chapter, so make sure to back up any important files before running the script. Additionally, if you have made any changes to the `package.json` file, make sure to save those changes before running the script to avoid losing any work.

## How to create a JSON server to act as a backend.

You can use `npx` to create a JSON server that can act as a backend for your application. The `json-server` package provides a simple way to create a RESTful API using a JSON file as the data source.

To create a JSON server using `npx`, follow these steps:

1. Create a `db.json` file in a `data` directory in your project. This file will contain the data that the JSON server will serve as an API.

2. Open your terminal and navigate to the root directory of your project.

3. Run the following command:

```markdown
npx json-server -p 3500 -w data/db.json
```

### Credits

This course is based on the tutorial by [Dave Gray](https://www.youtube.com/channel/UCY38RvRIxYODO4penyxUwTg). You can watch the full tutorial on [YouTube](https://www.youtube.com/watch?v=NqzdVN2tyvQ&t=9250s&ab_channel=DaveGray).

---
