## Puppeteer Web Scraping Example

This is an example of web scraping using Puppeteer, a Node.js library for automating browser interactions. The script extracts data-id attributes from a webpage and saves them to a text file.

### Prerequisites

- Node.js 18.x: Ensure you have Node.js version 18 or higher installed on your machine. You can download and install it from the [official Node.js website](https://nodejs.org/).

### Installation

1. **Clone the Repository**: Clone this repository to your local machine using Git:

    ```bash
    git clone https://github.com/thiraphat-ps-dev/RobotID-Extractor.git
    ```

2. **Install Dependencies**: Navigate to the project directory and install dependencies using Yarn:

    ```bash
    yarn install
    ```

### Usage

1. **Start the Script**: Run the script using Node.js:

    ```bash
    yarn start
    ```

2. **View Results**: The script will launch Puppeteer, navigate to the specified URL, and extract data-id attributes. The extracted data-ids will be saved to a file named `data-id.txt` in the project directory.

### Dependencies

- Puppeteer
- fs (Node.js core module for file system operations)

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
