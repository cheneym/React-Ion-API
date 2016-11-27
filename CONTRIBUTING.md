# Contributing

## General Workflow

1. Fork the repo
2. Clone your fork
3. Add upstream remote
  - git add remote upstream <main repo url>
4. Cut a namespaced feature branch from master
  - git checkout -b <branch name>
  - branch names should have the follow formats:
  - bug/...
  - feat/...
  - test/...
  - doc/...
  - refactor/...
5. Make commits to your feature branch. Prefix each commit like so:
  - (feat) Added a new feature
  - (fix) Fixed inconsistent tests [Fixes #0]
  - (refactor) ...
  - (cleanup) ...
  - (test) ...
  - (doc) ...
6. When you've finished with your fix or feature, merge upstream changes into your branch. Resolve conflicts and create merge commit
  - git pull upstream master
  - <resolve merge conflicts (modify files that are mentioned)>
  - git add .
  - git commit

7. Push to your fork origin, then submit a [pull request][] directly to master. Include a description of your changes.
  - git push origin <branch>
  - <submit pull request on github linking your fork repo's branch to main repo's master

8. Your pull request will be reviewed by another maintainer. The point of code
   reviews is to help keep the codebase clean and of high quality and, equally
   as important, to help you grow as a programmer. If your code reviewer
   requests you make a change you don't understand, ask them why.
9. Fix any issues raised by your code reviwer, and push your fixes as a single
   new commit.
10. Once the pull request has been reviewed, it will be merged by another member of the team. Do not merge your own commits.

### Guidelines

1. Uphold the current code standard:
    - Keep your code [DRY][].
    - Apply the [boy scout rule][].
    - Follow [STYLE-GUIDE.md](STYLE-GUIDE.md)
1. Run the [tests][] before submitting a pull request.
1. Tests are very, very important. Submit tests if your pull request contains
   new, testable behavior.
1. Your pull request is comprised of a single ([squashed][]) commit.

## Checklist:

This is just to help you organize your process

- [ ] Did I cut my work branch off of master (don't cut new branches from existing feature brances)?
- [ ] Did I follow the correct naming convention for my branch?
- [ ] Is my branch focused on a single main change?
 - [ ] Do all of my changes directly relate to this change?
- [ ] Did I rebase the upstream master branch after I finished all my
  work?
- [ ] Did I write a clear pull request message detailing what changes I made?
- [ ] Did I get a code review?
 - [ ] Did I make any requested changes from that code review?

If you follow all of these guidelines and make good changes, you should have
no problem getting your changes merged in.


<!-- Links -->
[Git Flow]: http://nvie.com/posts/a-successful-git-branching-model/
[GitHub Flow]: http://scottchacon.com/2011/08/31/github-flow.html
