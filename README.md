<a name="readme-top"></a>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/yannklein/ar_graffiti_rails">
    <img width="200" alt="image" src="https://github.com/yannklein/ar_graffiti_rails/assets/26819547/5edddb38-a9b2-4ce1-8b51-5e5514da0a46">
  </a>

  <h3 align="center">AR graffiti</h3>

  <p align="center">
    A Web AR app that let multiple users across the world graf the same virtual wall.
    <br />
    <br />
    <a href="#demo">Demo</a>
    .
    <a href="https://github.com/yannklein/ar_graffiti_rails/issues">Report Bug</a>
    ·
    <a href="https://github.com/yannklein/ar_graffiti_rails/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#demo">Demo</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

The project is a Rails app using ActionCable (websocket) to unabel muliptle user to interact in real-time. On the frontend side, it is powered with ThreeJS and ARJS to produce Augmented Reality grafs on the top of a QR code.  The QR code is used as a link to the web app as well as an AR marker.
<br><br>
Technical highlights of the project:
1. Rails fullstack application
2. ActionCable powered websocket for live user interactions
3. ThreeJS and ARJS on the frontend side

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With
* [![rubyonrails][rubyonrails]][rubyonrails-url]
* [![javascript][javascript]][javascript-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Demo

[ar-graffiti.webm](https://github.com/yannklein/ar_graffiti_rails/assets/26819547/0dd77f6b-dcad-4452-b224-5fe2b7dacf6e)


<!-- GETTING STARTED -->

### Prerequisites

This project needs a environment with ruby and `bundler` installed.

### Installation

1. Install the backend and frontend packages:
   ```sh
   bundle install
   yarn install
   ```
2. Migrate the db, populate it and run the server:
   ```sh
   rails db:migrate db:seed
   rails s
   ``` 

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

See the video for an overview of the app content: <a href="#demo">Demo</a>.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[Python]: https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=FFE466
[Python-url]: https://www.python.org
[ffmpeg]: https://img.shields.io/badge/ffmpeg-007808?style=for-the-badge&logo=ffmpeg&logoColor=black
[ffmpeg-url]: https://ffmpeg.org
[chrome]: https://img.shields.io/badge/Chrome%20Extension-lightgray?style=for-the-badge&logo=googlechrome&logoColor=FC521F
[chrome-url]: https://chromewebstore.google.com
[Flask]: https://img.shields.io/badge/flask-black?style=for-the-badge&logo=flask&logoColor=white
[Flask-url]: https://flask.palletsprojects.com/en/3.0.x/
[googletranslate]: https://img.shields.io/badge/googletranslate-4285F4?style=for-the-badge&logo=googletranslate&logoColor=white
[googletranslate-url]: https://cloud.google.com/translate
[openai]: https://img.shields.io/badge/WhisperAI-4285F4?style=for-the-badge&logo=openai&logoColor=white
[openai-url]: https://openai.com/research/whisper
[rubyonrails]: https://img.shields.io/badge/Ruby%20on%20Rails-D30001?style=for-the-badge&logo=rubyonrails&logoColor=black
[rubyonrails-url]: https://rubyonrails.org/
[graphql]: https://img.shields.io/badge/graphql-F0F3F4?style=for-the-badge&logo=graphql&logoColor=E10098
[graphql-url]: https://graphql.org/
[apollographql]: https://img.shields.io/badge/Vue%20Apollo-FEEADB?style=for-the-badge&logo=apollographql&logoColor=311C87
[apollographql-url]: https://apollographql.org/
[javascript]: https://img.shields.io/badge/Ruby%20on%20Rails-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[javascript-url]: [https://rubyonrails.org/](https://developer.mozilla.org/en-US/docs/Web/JavaScript)https://developer.mozilla.org/en-US/docs/Web/JavaScript
