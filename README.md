## DevJourney

## DevJourney

DevJourney is a full-stack portfolio management system designed to help developers build and manage a professional online presence. Showcase your skills, projects, experience, and personal journey with a clean, modern, and recruiter-friendly profile.

Built with simplicity and extensibility in mind, DevJourney is an ideal tool for developers who want to create a solid personal brand or present an impressive portfolio during job applications.

### Features

  - **Secure Authentication:** Powered by Laravel Jetstream and Sanctum for robust and secure user login.
  - **Manage Skills:** Easily add, update, and delete skills, each with a customizable proficiency level.
  - **Manage Projects:** Publish your projects with a title, detailed description, tech stack, and relevant links.
  - **Career Timeline:** Create a professional career history with entries for positions, companies, and dates.
  - **Auto-Generated Public Profile:** A public-facing profile is automatically created (e.g., `/u/your-name`) to present your data in an organized format.
  - **Modern UI:** A sleek, modern user interface built with **Tailwind CSS**.
  - **SPA Experience:** A single-page application experience is delivered through **React** and **Inertia.js**.
  - **Ready for Deployment:** Easily deploy with **Laravel Sail** and **Vite**.

### Technologies

  - **Backend:** Laravel 12
  - **Frontend:** React via Inertia.js
  - **Styling:** Tailwind CSS

### Installation

To get DevJourney up and running on your local machine, follow these simple steps:

1.  Clone the repository:

    ```bash
    git clone git@github.com:fokrule/devJourney.git
    ```

2.  Navigate to the project directory:

    ```bash
    cd devjourney
    ```

3.  Copy the environment file:

    ```bash
    cp .env.example .env
    ```

4.  Launch the application with Sail:

    ```bash
    ./vendor/bin/sail up -d
    ```

5.  Install PHP dependencies:

    ```bash
    ./vendor/bin/sail composer install
    ```

6.  Install Node.js dependencies:

    ```bash
    ./vendor/bin/sail npm install
    ```

7.  Run database migrations:

    ```bash
    ./vendor/bin/sail artisan migrate
    ```

8.  Start the development server:

    ```bash
    ./vendor/bin/sail npm run dev
    ```

    Your application should now be accessible at `http://localhost`.

### License

DevJourney is open-source software licensed under the MIT license.