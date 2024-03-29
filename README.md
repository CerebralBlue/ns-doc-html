# NeuralSeek Documentation pages

This repository is hosting a github page in [docs](./docs) directory, on the `main` branch. 
The URL for the published web page is [https://cerebralblue.github.io/ns-doc-html/](https://cerebralblue.github.io/ns-doc-html/). 
There is another repo `knowledge` from which under `/neuralseek/doc` the markdown will be converted into static html and uploaded here.

Following is how the publishing step works

1. Documentation changes are pushed into, and previewed in, the `main` branch of `knowledge` repo.
2. Running the 'publish' action on the `knowledge` repo will run our documentation builder and push the resulting html to this repo.
3. Any pushes to this repo will trigger the static.yml action, which pushes our site to github pages.
